"use client";

import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

import { Checkbox } from "@/components/ui/checkbox";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

const PRICE_OPTIONS = [
  { label: "Free", value: "free" },
  { label: "Paid", value: "paid" },
];

interface FilterState {
  price: string[];
  minPrice: string;
  maxPrice: string;
}

const PriceFilter = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();

  const [filter, setFilter] = useState<FilterState>({
    price: [],
    minPrice: "",
    maxPrice: "",
  });

  // Update filter state based on URL parameters on initial load
  useEffect(() => {
    const params = new URLSearchParams(searchParams.toString());
    const priceParams = params.getAll("price");
    const minPrice = params.get("minPrice") || "";
    const maxPrice = params.get("maxPrice") || "";

    setFilter({
      price: priceParams,
      minPrice: minPrice,
      maxPrice: maxPrice,
    });
  }, [searchParams]);

  const applyArrayFilter = ({
    type,
    value,
  }: {
    type: keyof FilterState;
    value: string;
  }) => {
    setFilter((prev) => {
      const currentFilterValue = prev[type];

      if (Array.isArray(currentFilterValue)) {
        const isFilterApplied = currentFilterValue.includes(value);

        return {
          ...prev,
          [type]: isFilterApplied
            ? currentFilterValue.filter((v) => v !== value)
            : [...currentFilterValue, value],
        };
      }

      return prev;
    });
  };

  const handlePriceRangeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFilter((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Update URL when filter state changes
  useEffect(() => {
    const params = new URLSearchParams(searchParams.toString());

    // Clear existing price filters
    params.delete("price");
    params.delete("minPrice");
    params.delete("maxPrice");

    // Add the selected price filters to the URL
    filter.price.forEach((price) => {
      params.append("price", price);
    });

    // Add the price range to the URL if set
    if (filter.minPrice) {
      params.set("minPrice", filter.minPrice);
    }
    if (filter.maxPrice) {
      params.set("maxPrice", filter.maxPrice);
    }

    // Update the URL without refreshing the page
    router.replace(`${pathname}?${params.toString()}`);
  }, [filter, router, searchParams, pathname]);

  return (
    <AccordionItem value="price">
      <AccordionTrigger className="py-3 text-sm text-gray-400 hover:text-gray-500">
        <span className="font-medium text-gray-900">Price</span>
      </AccordionTrigger>

      <AccordionContent className="pt-6 animate-none">
        <ul className="space-y-4">
          {PRICE_OPTIONS.map((option, optionIdx) => (
            <li key={option.value} className="flex items-center">
              <Checkbox
                id={`price-${optionIdx}`}
                onCheckedChange={() => {
                  applyArrayFilter({
                    type: "price",
                    value: option.value,
                  });
                }}
                checked={filter.price.includes(option.value)}
              />
              <label
                htmlFor={`price-${optionIdx}`}
                className="ml-3 text-sm text-gray-600 cursor-pointer"
              >
                {option.label}
              </label>
            </li>
          ))}
        </ul>

        {/* Price Range Filter */}
        <div className="mt-4">
          <label className="block text-sm text-gray-600 mb-2">
            Price Range
          </label>
          <div className="flex space-x-4">
            <input
              type="number"
              name="minPrice"
              value={filter.minPrice}
              onChange={handlePriceRangeChange}
              placeholder="Min Price"
              className="block w-full p-2 border border-gray-300 rounded-md"
            />
            <input
              type="number"
              name="maxPrice"
              value={filter.maxPrice}
              onChange={handlePriceRangeChange}
              placeholder="Max Price"
              className="block w-full p-2 border border-gray-300 rounded-md"
            />
          </div>
        </div>
      </AccordionContent>
    </AccordionItem>
  );
};

export default PriceFilter;
