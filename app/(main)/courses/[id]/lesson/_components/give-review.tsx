"use client";

import { Button } from "@/components/ui/button";
import { useState } from "react";
import { ReviewModal } from "./review-modal";

 const GiveReview = ({courseId,reviewData  }: any) => {
    const [isReviewModalOpen, setIsReviewModalOpen] = useState<boolean>(false);


    return(
        <>
            <Button
                onClick={() => setIsReviewModalOpen(true)}
                variant="outline"
                className="w-full mt-6"
            >
                Give Review
            </Button>
            <ReviewModal courseId={courseId} open={isReviewModalOpen} setOpen={setIsReviewModalOpen} reviewData={reviewData} />
        </>
    )
}

export default GiveReview;