import { cn } from "@/lib/utils";
import { cva } from "class-variance-authority";
import React from "react";

const backgroundVariants = cva(
  "rounded-full flex items-center justify-center",
  {
    variants: {
      variant: {
        default: "bg-emerald-100",
        success: "bg-emerald-100",
      },
      size: {
        default: "p-2",
        sm: "p-1",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

const iconVariants = cva("", {
  variants: {
    variant: {
      default: "text-emerald-600",
      success: "text-emerald-700",
    },
    size: {
      default: "h-8 w-8",
      sm: "h-4 w-4",
    },
  },
  defaultVariants: {
    variant: "default",
    size: "default",
  },
});

type IconBadgeProps = {
  icon: React.ComponentType<{ className?: string }>;
  variant?: "default" | "success";
  size?: "default" | "sm";
};

export const IconBadge: React.FC<IconBadgeProps> = ({ icon: Icon, variant = "default", size = "default" }) => {
  return (
    <div className={cn(backgroundVariants({ variant, size }))}>
      <Icon className={cn(iconVariants({ variant, size }))} />
    </div>
  );
};