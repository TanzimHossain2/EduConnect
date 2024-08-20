"use server";

import { stripe } from "@/lib/stripe";
import { formatAmountForStripe } from "@/lib/stripe-helpers";
import { headers } from "next/headers";
import { getCourseDetails } from "@/backend/services/courses";
const currency = "usd";

export const createCheckoutSession = async (data: FormData) => {

  const ui_mode = "hosted";
  const origin = headers().get("origin");
  const courseId = data.get("courseId") as string;

  const course = await getCourseDetails(courseId);

  if (!course) {
    throw new Error("Course not found");
  }


  const courseName = course?.title;
  const coursePrice = course?.price;

  const checkoutSession = await stripe.checkout.sessions.create({
    mode: "payment",
    submit_type: "auto",
    line_items: [
      {
        quantity: 1,
        price_data: {
          currency: currency,
          product_data: {
            name: courseName,
          },
          unit_amount: formatAmountForStripe(coursePrice, currency),
        },
      },
    ],
    ...(ui_mode === "hosted" && {
      success_url: `${origin}/enroll-success?session_id={CHECKOUT_SESSION_ID}&courseId=${courseId}`,

      cancel_url: `${origin}/courses`,
    }),
  });

  return {
    client_secret: checkoutSession.client_secret,
    url: checkoutSession.url,
  };
};

export async function createPaymentIntent(data: FormData) {
  const coursePrice = parseFloat(data.get("coursePrice") as string);
  const paymentIntent = await stripe.paymentIntents.create({
    amount: formatAmountForStripe(coursePrice ,currency),

    automatic_payment_methods: { enabled: true },

    currency: currency,
  });

  return { client_secret: paymentIntent.client_secret };
}
