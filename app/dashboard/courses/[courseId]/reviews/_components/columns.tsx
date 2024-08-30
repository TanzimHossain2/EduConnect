"use client";

import StarRating from "@/components/star-rating";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import { Column, Row } from "@tanstack/react-table";
import { GraduationCap } from "lucide-react";
import { ArrowUpDown, MoreHorizontal, Pencil } from "lucide-react";
import Link from "next/link";


export const columns = [
  {
    id: "name",
    accessorKey: "studentName",
    header: ({ column }: {column: Column<any>} ) => {
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
    accessorKey: "rating",
    header: ({ column }: {column: Column<any>} ) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Rating <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell : ({row} : {row: Row<any>}) => {
      const rating = row.getValue("rating") as number;

      return (
        <div className="flex items-center">
          <StarRating rating={rating} />
          
        </div>
      );


    }
  },
  {
    accessorKey: "content",
    header: ({ column }: {column: Column<any>} ) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Review <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
 
];
