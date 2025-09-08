import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { ScrollArea } from "@/components/ui/scroll-area"; // Use ShadCN-styled ScrollArea
import Link from "next/link"; // Correct Link import

interface NavbarItem {
  href: string;
  children: React.ReactNode;
}

interface Props {
  items: NavbarItem[];
  open: boolean;
  onopenchange: (open: boolean) => void;
}

export const Navbarsidebar = ({ items, open, onopenchange }: Props) => {
  return (
    <Sheet open={open} onOpenChange={onopenchange}>
      <SheetContent side="left" className="p-0 transition-none">
        <SheetHeader className="p-4 border-b">
          <SheetTitle className="">Menu</SheetTitle>
        </SheetHeader>

        <ScrollArea className="flex flex-col overflow-y-auto h-full pd-2">
          <div className="flex flex-col">
            {items.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => onopenchange(false)} 
                className="w-full text-left px-4 py-3 hover:bg-black hover:text-white flex items-center text-base font-medium transition-colors"
              >
                {item.children}
              </Link>
            ))}
            <div className="border-t">
            <Link href="/sign-in" className="w-full text-left px-4 py-3 hover:bg-black hover:text-white flex items-center text-base font-medium transition-colors">
                  Log-in
                  </Link>
                    <Link href="/sign-up" className="w-full text-left px-4 py-3 hover:bg-black hover:text-white flex items-center text-base font-medium transition-colors">
                    Sign-in   
                  </Link>
            </div>
          </div>
        </ScrollArea>
      </SheetContent>
    </Sheet>
  );
};
