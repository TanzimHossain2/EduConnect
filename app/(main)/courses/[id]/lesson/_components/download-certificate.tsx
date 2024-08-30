"use client";

import { Button } from "@/components/ui/button";
import { useState } from "react";
import { toast } from "sonner";

interface Props {
  courseId: string;
  totalProgress: number;
}

const DownloadCertificate = ({courseId, totalProgress}:Props) => {

  const [loading, setLoading] = useState(false);

  const handleCertificateDownload : React.MouseEventHandler<HTMLButtonElement> = async () => {
    try {

      setLoading(true);
      const res =  await fetch(`/api/certificate?courseId=${courseId}`);
      const blob = await res.blob();
      const url = URL.createObjectURL(blob);

      const a = document.createElement("a");
      a.href = url;
      a.download = "certificate.pdf";
      document.body.appendChild(a);
      a.click();
      a.remove();

      toast.success("Certificate downloaded successfully");
    } catch (err) {
      toast.error( err instanceof Error ? err.message : "Something went wrong");
      
    } finally {
      setLoading(false);
    }
  }


  return (
    <Button className="w-full mt-6"
    disabled={totalProgress < 100}
    onClick={handleCertificateDownload}
    >
      Download Certificate
    </Button>
  )
}

export default DownloadCertificate;