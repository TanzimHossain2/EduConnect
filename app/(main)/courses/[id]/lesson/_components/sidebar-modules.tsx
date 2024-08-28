"use client";

import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { IModule } from "@/interface/courses";
import { useSearchParams } from "next/navigation";
import SidebarLessons from "./sidebar-lessons";

interface SidebarModulesProps {
  courseId: string;
  modules: IModule[];
}

const SidebarModules = ({ courseId, modules }: SidebarModulesProps) => {
  const searchParams = useSearchParams();

  const allModules = modules.toSorted(
    (a: { order: number }, b: { order: number }) => a.order - b.order
  );

  const query = searchParams.get("name") || "";

  const expandedModule = allModules.find((module) => {
    return module.lessonIds.find((lesson) => lesson.slug === query);
  });

  const expandedModuleId = expandedModule
    ? expandedModule.id
    : allModules[0].id;

  return (
    <>
      <Accordion
        defaultValue={expandedModuleId}
        type="single"
        collapsible
        className="w-full px-6"
      >
        {allModules &&
          allModules.length > 0 &&
          allModules.map((moduleData: IModule, index) => {
            return (
              <AccordionItem
                className="border-0"
                value={moduleData.id}
                key={moduleData.id + index}
              >
                <AccordionTrigger> {moduleData.title} </AccordionTrigger>
                <SidebarLessons
                  courseId={courseId}
                  lessons={moduleData.lessonIds}
                  moduleSlug={moduleData.slug}
                />
              </AccordionItem>
            );
          })}
      </Accordion>
    </>
  );
};

export default SidebarModules;
