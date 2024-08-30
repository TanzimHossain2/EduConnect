import { Accordion } from "@/components/ui/accordion";
import { ICategory } from "@/interface/courses";

import { getCategories } from "@/backend/services/courses";
import CategoriesFilter from "./CategoriesFilter";
import PriceFilter from "./PriceFilter";
import RatingFilter from "./RatingFilter";

const FilterCourse = async () => {
  const categories = (await getCategories()) as ICategory[];

  return (
    <div className="hidden lg:block">
      <Accordion defaultValue={["categories"]} type="multiple">
        <CategoriesFilter categories={categories} />

        <PriceFilter />
        <RatingFilter />
      </Accordion>
    </div>
  );
};

export default FilterCourse;
