"use client";

import { cn } from "@/lib/utils";
import { ChevronDown, ChevronDownIcon, ChevronRightIcon } from "lucide-react";
import { useState } from "react";
import { PriceFilter } from "./price-filters";
import { useProductsFilters } from "../../hooks/use-product-filter";
import { Value } from "@radix-ui/react-select";

interface ProductFilterProps {
  title: string;
  className?: string;
  children: React.ReactNode;
}
const ProductFilter = ({ title, className, children }: ProductFilterProps) => {
  const [Isopen, setIsopen] = useState(false);

  const Icon = Isopen ? ChevronDownIcon : ChevronRightIcon;

  return (
    <div className={cn("p-4 border-b flex flex-col gap-2", className)}>
        <div
        onClick={()=> setIsopen((current)=>!current)}
        className="flex items-center justify-between cursor-pointer"
        >
        <p className="font-medium">{title}</p>
        <Icon className="size-5"/>
        </div>

        {Isopen &&children  }
    </div>
  );
};
export const ProductFilters = () => {
  const [ filters,setfilters] = useProductsFilters();

  const onChange = (key: keyof typeof filters, value:unknown)=>{

    setfilters({ ...filters,[key]: value})
  };
  return (
    <div className="border rounded-md bg-white">
      <div className="p-4 border-b flex flec-center justify-between">
        <p className="font-medium">Filters</p>
        <button
          className="underline cursor-pointer"
          onClick={() => {}}
          type="button"
        >
          clear
        </button>

      </div>
      <ProductFilter title="price" className="border-b-0">
       <PriceFilter
       minPrice={filters.minPrice}
       maxPrice={filters.maxPrice}
       onMinPricechange={(value) => onChange("minPrice", value)}
       onMaxPricechange={(value) => onChange("maxPrice", value)}
       />
      </ProductFilter>
    </div>
  );
};
