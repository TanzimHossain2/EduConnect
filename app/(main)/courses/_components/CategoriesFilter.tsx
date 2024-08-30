"use client";

import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

import { Checkbox } from "@/components/ui/checkbox";
import { ICategory } from "@/interface/courses";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

interface CategoriesFilterProps {
  categories: ICategory[];
}

const CategoriesFilter = ({ categories }: CategoriesFilterProps) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

  // Update selected categories based on URL parameters on initial load
  useEffect(() => {
    const params = new URLSearchParams(searchParams.toString());
    const categoryParams = params.getAll("category");
    setSelectedCategories(categoryParams);
  }, [searchParams]);

  const applyCategoryFilter = (categoryId: string) => {
    setSelectedCategories((prevSelected) => {
      if (prevSelected.includes(categoryId)) {
        return prevSelected.filter((id) => id !== categoryId);
      } else {
        return [...prevSelected, categoryId];
      }
    });
  };

  // Update URL when selectedCategories changes
  useEffect(() => {
    const params = new URLSearchParams(searchParams.toString());

    // Clear existing category filters
    params.delete("category");

    // Add the selected categories to the URL
    selectedCategories.forEach((categoryId) => {
      params.append("category", categoryId);
    });

    // Update the URL without refreshing the page
    router.replace(`${pathname}?${params.toString()}`);
  }, [selectedCategories, router, searchParams, pathname]);

  return (
    <AccordionItem value="categories">
      <AccordionTrigger className="py-3 text-sm text-gray-400 hover:text-gray-500">
        <span className="font-medium text-gray-900">Categories</span>
      </AccordionTrigger>

      <AccordionContent className="pt-6 animate-none">
        <ul className="space-y-4">
          {categories.map((category) => (
            <li key={category.id} className="flex items-center">
              <Checkbox
                id={`category-${category.id}`}
                onCheckedChange={() => applyCategoryFilter(category.id)}
                checked={selectedCategories.includes(category.id)}
              />
              <label
                htmlFor={`category-${category.id}`}
                className="ml-3 text-sm text-gray-600 cursor-pointer"
              >
                {category.title}
              </label>
            </li>
          ))}
        </ul>
      </AccordionContent>
    </AccordionItem>
  );
};

export default CategoriesFilter;
