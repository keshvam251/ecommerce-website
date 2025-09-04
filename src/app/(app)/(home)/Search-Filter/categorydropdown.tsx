"use client";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Category } from "@/payload-types";
import { useRef, useState } from "react";

import { usedropdownposition } from "./use-dropdown-position";

import { SubcategoryMenu } from "./subcategory-menu";
import Link from 'next/link';
import { CategoriesGetMAnyOutput } from "@/modules/categories/types";

interface Props {
  category: CategoriesGetMAnyOutput[1] & { subcategories?: Category[] }; 
  isActive?: boolean;
  isNavigationHovered?: boolean;
}

export const CategoryDropdown = ({
  category,
  isActive,
  isNavigationHovered,
}: Props) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const { getdropdownposition } = usedropdownposition(dropdownRef);

  const onMouseEnter = () => {
    if (category.subcategories && category.subcategories.length > 0) {
      setIsOpen(true);
    }
  };

  const onMouseLeave = () => setIsOpen(false);

  const dropdownPosition = getdropdownposition();
  
  const toggledropdown =()=>{
    if (category.subcategories?.docs?.length){
      setIsOpen(!isOpen)
    }
  }

  return (
    <div
      className="relative"
      ref={dropdownRef}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      onClick={toggledropdown}
    >
      <div className="relative">
        <Button
          variant="elevated"
          className={cn(
            "h-11 px-4 bg-transparent border-transparent rounded-full hover:bg-white hover:border-primary text-black",
            isActive && !isNavigationHovered && "bg-white border-primary",
            isOpen && "hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover-translate-x-[4px] hover-translate-y-[4px] "
          )}
        >
          
          <Link
          href={`/${category.slug === "all" ? "" : category.slug}`}
          >
          {category.name}

          </Link>


      
          
          
        </Button>

        {category.subcategories && category.subcategories.length > 0 && (
          <div
            className={cn(
              "absolute -bottom-2 left-1/2 -translate-x-1/2 transition-opacity duration-200 z-50",
              isOpen ? "opacity-100" : "opacity-0"
            )}
          >
            <div
              className="w-0 h-0 border-l-[12px] border-r-[12px] border-b-[12px] 
                 border-l-transparent border-r-transparent border-b-gray-800"
            />
          </div>
        )}
      </div>

      <SubcategoryMenu
        category={category}
        isOpen={isOpen}
        position={dropdownPosition}
      />
    </div>
  );
};