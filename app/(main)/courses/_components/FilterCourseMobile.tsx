import { getCategories } from "@/backend/services/courses";
import { Accordion } from "@/components/ui/accordion";

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { ICategory } from "@/interface/courses";

import { Filter } from "lucide-react";
import CategoriesFilter from "./CategoriesFilter";
import PriceFilter from "./PriceFilter";

const FilterCourseMobile = async () => {
  const categories = (await getCategories()) as ICategory[];

  return (
    <div className="lg:hidden">
      <Sheet>
        <SheetTrigger>
          <Filter className="h-6 w-6" />
        </SheetTrigger>
        <SheetContent side="left">
          <SheetHeader>
            <SheetTitle className="text-left">Filter Courses</SheetTitle>
            <Accordion defaultValue={["categories"]} type="multiple">
              <CategoriesFilter categories={categories} />

              <PriceFilter />
            </Accordion>
          </SheetHeader>
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default FilterCourseMobile;
