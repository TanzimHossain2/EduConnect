"use server";

import { stripe } from "@/lib/stripe";
import { formatAmountForStripe } from "@/lib/stripe-helpers";
import { headers } from "next/headers";

const currency = "usd";

export const createCheckoutSession = async (data: Object) => {
  const ui_mode = "hosted";
  const origin = headers().get("origin");

  const checkoutSession = await stripe.checkout.sessions.create({
    mode: "payment",
    submit_type: "auto",
    line_items: [
      {
        quantity: 1,
        price_data: {
          currency: currency,
          product_data: {
            name: "Educonnect Course",
          },
          unit_amount: formatAmountForStripe(10.5, currency),
        },
      },
    ],
    ...(ui_mode === "hosted" && {
      success_url: `${origin}/enroll-success?session_id={CHECKOUT_SESSION_ID}&courseId=12445`,

      cancel_url: `${origin}/courses`,
    }),
  });

  return {
    client_secret: checkoutSession.client_secret,
    url: checkoutSession.url,
  };
};

export async function createPaymentIntent(data: any) {
  const paymentIntent = await stripe.paymentIntents.create({
    amount: formatAmountForStripe(10.5,currency),

    automatic_payment_methods: { enabled: true },

    currency: currency,
  });

  return { client_secret: paymentIntent.client_secret };
}
