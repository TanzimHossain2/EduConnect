"use client";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { useState, useEffect } from "react";

const SORT_OPTIONS = [
  { label: "Price: Low to High", value: "price-asc" },
  { label: "Price: High to Low", value: "price-desc" },
];

const SortCourse = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();

  const [selectedSort, setSelectedSort] = useState<string | undefined>(undefined);

  // Set the initial sort state based on the URL parameter
  useEffect(() => {
    const sortParam = searchParams.get("sort");
    if (sortParam) {
      setSelectedSort(sortParam);
    }
  }, [searchParams]);

  const handleSortChange = (value: string) => {
    setSelectedSort(value);

    const params = new URLSearchParams(searchParams.toString());
    params.set("sort", value);

    // Update the URL with the new sort parameter
    router.replace(`${pathname}?${params.toString()}`);
  };

  return (
    <Select onValueChange={handleSortChange} value={selectedSort}>
      <SelectTrigger className="w-[180px] border-none !border-b focus:ring-0 focus:ring-offset-0 overflow-hidden">
        <SelectValue placeholder="Sort By" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Sort Options</SelectLabel>
          {SORT_OPTIONS.map((option) => (
            <SelectItem
              className="cursor-pointer"
              key={option.value}
              value={option.value}
            >
              {option.label}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};

export default SortCourse;
