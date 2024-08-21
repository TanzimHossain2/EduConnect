"use client";

import { createCheckoutSession } from "@/app/actions/payments/stripe";
import { Button, buttonVariants } from "@/components/ui/button";
import { useCurrentUser } from "@/hooks/use-current-user";
import { cn } from "@/lib/utils";
import { ArrowRight } from "lucide-react";
import { useRouter } from "next/navigation";


interface Props {
  asLink: boolean;
  courseId: string;
}

const EnrollCourse: React.FC<Props> = ({ asLink, courseId }) => {

  const router = useRouter();
  const user = useCurrentUser();


  const formAction = async (data: FormData) => {

    //  if not logged in, redirect to login page
    if (!user) {
      router.push("/login");
      return;
    }


    //  await createCheckoutSession(data);
    const { url } = await createCheckoutSession(data);
    window.location.assign(url as string);
  };

  return (
    <>
      <form action={formAction}>
        <input type="hidden" name="courseId" value={courseId} />

        {asLink ? (
          <Button
            type="submit"
            variant="ghost"
            className="text-xs text-sky-700 h-7 gap-1"
          >
            Enroll
            <ArrowRight className="w-3" />
          </Button>
        ) : (
          <Button type="submit" className={cn(buttonVariants({ size: "lg" }))}>
            Enroll Now
          </Button>
        )}
      </form>
    </>
  );
};

export default EnrollCourse;
