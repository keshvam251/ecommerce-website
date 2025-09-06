"use client"
import { useState } from "react";
import { Categories } from "./categories";
import { CategoriesSidebar } from "./categories-sidebar";
import { SearchInput } from "./search-input";
import { useTRPC } from "@/trpc/client";
import { useSuspenseQuery } from "@tanstack/react-query";
import { CategoriesGetMAnyOutput } from "@/modules/categories/types";

export const SearchFilter = () => {
  const trpc = useTRPC();
  const { data } = useSuspenseQuery(trpc.categories.getMany.queryOptions()); // ⚠️ hydration mismatch risk
  const [isSidebarOpen, setisSideBarOpen] = useState(false);

  return (
    <div className="px-4 lg:px-12 py-8 border-b flex flex-col gap-4 w-full">
      <CategoriesSidebar open={isSidebarOpen} onOpenChange={setisSideBarOpen} />
      <SearchInput  />
      <div className="hidden lg:block">
        <Categories data={data} />
      </div>
    </div>

  );
};
export const Searchfilterloading=()=>{

  return(
    <div className="px-4 lg:px-12 py-8 border-b flex flex-col gap-4 w-full" 
    style={{backgroundColor:"#F5F5F5"}}>
      
      <SearchInput disabled />
      <div className="hidden lg:block">
        <div className="h-10"/>
      </div>
    </div>
  )
}
