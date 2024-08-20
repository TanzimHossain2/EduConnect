import { EmailTemplate } from "@/components/email/email-template";
import { EmailInfo } from "@/interface";
import { Resend } from "resend";

const RESEND_API_SECRET = process.env.RESEND_API_SECRET;

const resend = new Resend(RESEND_API_SECRET);

export const sendEmails = async (emailInfo: EmailInfo[]) => {
  if (!emailInfo) return null;

  const response = await Promise.allSettled(
    emailInfo.map(async (data) => {
      if (data.to && data.subject && data.message) {
        const to = data.to;
        const subject = data.subject;
        const message = data.message;
        const sentInfo = await resend.emails.send({
          //   from: "noreply@websynced.com",
          from: "noreply@resend.dev",
          to: to,
          subject: subject,
          react: EmailTemplate({ message }),
        });

        return sentInfo;
      } else {
        const rejectedPromise = Promise.reject("Email info is missing");
        return rejectedPromise;
      }
    })
  );

  return response;
};
