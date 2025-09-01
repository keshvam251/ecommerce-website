import { useRouter } from "next/navigation";
import { ScrollArea } from "@radix-ui/react-scroll-area";
import { useState } from "react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  data: customcategory[];
}
import { customcategory } from "../types";
import { ChevronLeft, ChevronRight, ChevronRightIcon } from "lucide-react";
import router from "next/router";






export const CategoriesSidebar = ({ open, onOpenChange, data }: Props) => {

    const route= useRouter();
  const [parentcategory, setparentcategory] = useState<customcategory[] | null>(null);
  const [selectcategory, setselectcategory] = useState<customcategory | null>( null);

  const currentcategory = parentcategory ?? data ?? [];

  const handleOpenChange =(open:boolean )=>{
    setselectcategory(null);
    setparentcategory(null);
    onOpenChange(open)
  }

  const handleclickcategory=(category:customcategory)=>{
    if(category.subcategories && category.subcategories.length>0){
        setparentcategory(category.subcategories as customcategory[]);
        setselectcategory(category);
    }else{
        if(parentcategory&&selectcategory){
            router.push(`/${selectcategory.slug}/${category.slug}`);
        }else{
            if(category.slug="all"){
                router.push("/")
            }else{
                  router.push(`/${category.slug}`);
            }
        }
        handleOpenChange(false)
    }
  }
  const backgroundColor= selectcategory?.color||"white";

  const handlebackbutton =()=>{
    if(parentcategory){
        setparentcategory(null)
        setselectcategory(null)
    }
  }

  return (
    <Sheet open={open} onOpenChange={handleOpenChange}>
      <SheetContent
        side="left"
        className="p-0 transition-none"
        style={{backgroundColor} }
      >
        <SheetHeader>
          <SheetTitle>Categories</SheetTitle>
        </SheetHeader>
        <ScrollArea className="flex flex-col overflow-y-auto h-full pb-2">
          {parentcategory&& (
            <button
              onClick={handlebackbutton}
              className="w-full text-left p-4 hover:bg-black  hover:text-white flex items-center text-base font-medium"
            >
              <ChevronLeft className="size-4 mr-2" />
              back
            </button>
          )}
          {currentcategory.map((category)=>(
            <button
            key={category.slug}
            onClick={()=>handleclickcategory(category)}
            className="w-full text-left p-4 hover:bg-black  hover:text-white flex justify-between
            items-center text-base font-medium">
            
            {category.name}
            {category.subcategories&& category.subcategories.length>0 &&(
                <ChevronRightIcon className="size-4"/>
            )}

            </button>
          ))}
        </ScrollArea>
      </SheetContent>
    </Sheet>
  );
};
