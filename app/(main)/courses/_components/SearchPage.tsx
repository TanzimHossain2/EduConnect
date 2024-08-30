"use client";

import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const SearchPage = () => {

  const [searchTerm, setSearchTerm] = useState<string>("");
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();


  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    updateURLParams(searchTerm);
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchTerm(value);
    updateURLParams(value);
  }

  const handleInputClear = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value === "") {
      updateURLParams("");
    }
  }


  const updateURLParams = (term: string) => {
    const params = new URLSearchParams(searchParams.toString());

    // Set the new search term or clear it if empty
    if (term.trim() !== "") {
      params.set("search", term);
    } else {
      params.delete("search");
    }

    // Update the URL with the new search term
    const newUrl = `${pathname}?${params.toString()}`;
    router.replace(newUrl);

  }

  useEffect(() => {
    const params = new URLSearchParams(searchParams.toString());
    const initialSearch = params.get("search") || "";
    setSearchTerm(initialSearch);
  }, [searchParams]);

  return (
    <div className="relative h-10 max-lg:w-full">
    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 z-10 h-4 w-4" />
    <form onSubmit={handleSubmit}>
    <Input
      type="search"
      name="search"
      id="search"
      placeholder="Search courses..."
      className="pl-8 pr-3 py-2 text-sm" 
      value={searchTerm}
      onChange={handleSearch}
      onInput={handleInputClear}
    />
    </form>
  </div>
  )
}

export default SearchPage