"use client";

import { createCheckoutSession } from "@/app/actions/payments/stripe";
import { Button, buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ArrowRight } from "lucide-react";

interface Props {
  asLink: boolean;
  courseId: string;
}

const EnrollCourse: React.FC<Props> = ({ asLink, courseId }) => {
  const formAction = async (data: FormData) => {
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
