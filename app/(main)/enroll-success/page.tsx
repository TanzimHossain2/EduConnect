import { auth } from "@/auth";
import { getCourseDetails } from "@/backend/services/courses";
import { enrollForCourse } from "@/backend/services/courses/enrollments";
import { getUserByEmail } from "@/backend/services/users";
import { Button } from "@/components/ui/button";
import { EmailInfo } from "@/interface";
import { sendEmails } from "@/lib/email";
import { stripe } from "@/lib/stripe";
import { CircleCheck } from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";
import Stripe from "stripe";

type SuccessParams = {
  searchParams: {
    session_id: string;
    courseId: string;
  };
};

const SuccessPage: React.FC<SuccessParams> = async ({
  searchParams: { session_id, courseId },
}) => {
  if (!session_id) {
    throw new Error(
      "Please provide a valid session id that was returned from the payment gateway"
    );
  }

  const userSession = await auth();

  if (!userSession?.user?.email) {
    redirect("/login");
  }

  const course = await getCourseDetails(courseId);
  const loggedInUser = await getUserByEmail(userSession?.user?.email);

  const checkoutSession = await stripe.checkout.sessions.retrieve(session_id, {
    expand: ["line_items", "payment_intent"],
  });

  const paymentIntent = checkoutSession?.payment_intent;
  const paymentStatus = (paymentIntent as Stripe.PaymentIntent)?.status;

  // customer info
  const customerName = loggedInUser?.firstName + " " + loggedInUser?.lastName;
  const customerEmail = loggedInUser?.email;
  const productName = course?.title;

  // instructor info
  const instructorName =
    course?.instructor?.firstName + " " + course?.instructor?.lastName;
  const instructorEmail = course?.instructor?.email;

  if (paymentStatus === "succeeded") {
    //@ts-ignore
    const enrollmentResponse = await enrollForCourse(courseId,loggedInUser?.id,"stripe");
    
    console.log("Enrollment Response: ", enrollmentResponse);

    //send Emails to instructor and student and  person who enrolled
    const emailsToSend: EmailInfo[] = [
      {
        to: instructorEmail || "",
        subject: `New Enrollment for ${productName}.`,
        message: `Congratulations, ${instructorName}. A new student, ${customerName} has enrolled to your course ${productName} just now. Please check the instructor dashboard and give a high-five to your new student.`,
      },
      {
        to: customerEmail || "",
        subject: `Enrollment Success for ${productName}`,
        message: `Hey ${customerName} You have successfully enrolled for the course ${productName}`,
      },
    ];

    const emailSentResponse = await sendEmails(emailsToSend);

    console.log("Emails sent: ", emailSentResponse);
  }

  return (
    <div className="h-full w-full flex-1 flex flex-col items-center justify-center">
      <div className="flex flex-col items-center gap-6 max-w-[600px] text-center">
        {paymentStatus === "succeeded" && (
          <>
            <CircleCheck className="w-32 h-32 bg-success rounded-full p-0 text-white" />
            <h1 className="text-xl md:text-2xl lg:text-3xl">
              Congratulations, <strong>{customerName}</strong>! Your Enrollment
              was Successful for <strong>{productName}</strong>
            </h1>
          </>
        )}
        <div className="flex items-center gap-3">
          <Button asChild size="sm">
            <Link href="/courses">Browse Courses</Link>
          </Button>
          <Button asChild variant="outline" size="sm">
            <Link href="/think-in-a-redux-way/introduction">Play Course</Link>
          </Button>
        </div>
      </div>
    </div>
  );
};
export default SuccessPage;
