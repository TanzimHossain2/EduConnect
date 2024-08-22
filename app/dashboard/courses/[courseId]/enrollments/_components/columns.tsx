"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { formatMyDate } from "@/utils/date";
import { Column, Row } from "@tanstack/react-table";
import { ArrowUpDown, GraduationCap } from "lucide-react";

export const columns = [
  {
    id: "name",
    accessorKey: "studentName",
    header: ({ column }: { column: Column<any> } ) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Student Name <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "studentEmail",
    header: ({ column }: { column: Column<any> }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Student Email <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "quizMark",
    header: ({ column }: { column: Column<any> }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Quiz Mark <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "progress",
    header: ({ column }: { column: Column<any> }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Progress <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },

    cell: ({ row }: { row: Row<any> }) => {
      const progress = row.getValue("progress") as number;
      return (
        <div className="flex items-center">
          <div className="w-20">
            <Badge
              variant="secondary"
              className={cn(
                progress < 25 ? "bg-red-300" :
                progress < 50 ? "bg-yellow-300" :
                progress < 75 ? "bg-green-300" :
                "bg-blue-300"
              )}
            >
          {progress} %
            </Badge>
          </div>
          <div className="w-20">
            <GraduationCap className="h-6 w-6" />
          </div>
        </div>
      );
    },
  },
  {
    accessorKey: "enrollment_date",
    header: ({ column }: { column: Column<any> }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Enroll Date <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({row}: {row: Row<any>}) =>{
      const enrollmentDate = row.getValue("enrollment_date") as Date;
      return formatMyDate(enrollmentDate);
    }
  },
  
];
