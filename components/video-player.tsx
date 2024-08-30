"use client";
import React from "react";

import { useEffect, useState } from "react";

import ReactPlayer from "react-player/youtube";
import { toast } from "sonner";


export const VideoPlayer = ({url}: {url: string}) => {
  const [hasWindow, setHasWindow] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setHasWindow(true);
    }
  }, []);

  return (
    <div className="relative aspect-video">
     

      {
        hasWindow && (
          <ReactPlayer
            url={url}
            width="100%"
            height="100%"
            playing={false}
            controls
            onError={(error) => {
              console.log("onError", error);
              toast.error("Error loading video");
            }}
          />
        )
      }


    </div>
  );
};