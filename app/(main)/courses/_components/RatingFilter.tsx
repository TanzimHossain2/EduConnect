"use client";

import {
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import { Checkbox } from "@/components/ui/checkbox";
import { useEffect, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

const RATING_OPTIONS = [
  { label: "4 stars & up", value: "4" },
  { label: "3 stars & up", value: "3" },
  { label: "2 stars & up", value: "2" },
  { label: "1 star & up", value: "1" },
];

const RatingFilter = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [selectedRatings, setSelectedRatings] = useState<string[]>(() => {
    // Initialize selected ratings from the URL search params
    const ratingsParam = searchParams.get("rating");
    return ratingsParam ? ratingsParam.split(",") : [];
  });

  useEffect(() => {
    // Update the URL whenever selectedRatings changes
    const params = new URLSearchParams(searchParams.toString());
    if (selectedRatings.length > 0) {
      params.set("rating", selectedRatings.join(","));
    } else {
      params.delete("rating");
    }
    router.push(`${pathname}?${params.toString()}`);
  }, [selectedRatings, router, pathname, searchParams]);

  const handleRatingChange = (value: string) => {
    setSelectedRatings((prev) => {
      if (prev.includes(value)) {
        return prev.filter((rating) => rating !== value);
      } else {
        return [...prev, value];
      }
    });
  };

  return (
    <AccordionItem value="rating">
      <AccordionTrigger className="py-3 text-sm text-gray-400 hover:text-gray-500">
        <span className="font-medium text-gray-900">Rating</span>
      </AccordionTrigger>
      <AccordionContent className="pt-6 animate-none">
        <ul className="space-y-4">
          {RATING_OPTIONS.map((option, optionIdx) => (
            <li key={option.value} className="flex items-center">
              <Checkbox
                id={`rating-${optionIdx}`}
                onCheckedChange={() => handleRatingChange(option.value)}
                checked={selectedRatings.includes(option.value)}
              />
              <label
                htmlFor={`rating-${optionIdx}`}
                className="ml-3 text-sm text-gray-600 cursor-pointer"
              >
                {option.label}
              </label>
            </li>
          ))}
        </ul>
      </AccordionContent>
    </AccordionItem>
  );
};

export default RatingFilter;
