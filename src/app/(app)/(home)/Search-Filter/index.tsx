"use client"
import { useState } from "react";
import { customcategory } from "../types";
import { Categories } from "./categories";
import { CategoriesSidebar } from "./categories-sidebar";
import { SearchInput } from "./search-input";

interface Props {
  disabled?:boolean,
  data: customcategory[];
}

export const SearchFilter = ({ data }: Props) => {
  const[isSidebarOpen,setisSideBarOpen]= useState(false)
  return (
    <div className="px-4 lg:px-12 py-8 border-b flex flex-col gap-4 w-full">
      <CategoriesSidebar data={data} open={isSidebarOpen} onOpenChange={setisSideBarOpen}/>
      <SearchInput data={data}  />
      
      {/* Categories only visible on large screens */}
      <div className="hidden lg:block">
        <Categories data={data} />
      </div>
    </div>
  );
};
