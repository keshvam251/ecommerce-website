"use client";

import { Poppins } from "next/font/google";
import Link from "next/link";
import { useState } from "react";
import { usePathname } from "next/navigation";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Navbarsidebar } from "./navbar-sidebar";
import { Menu as MenuIcon } from "lucide-react";

const poppins = Poppins({
  subsets: ["latin"],
  weight: "400",
});

interface NavbarItemProps {
  href: string;
  children: React.ReactNode;
  isActive?: boolean;
}

const NavbarItem = ({ href, children, isActive }: NavbarItemProps) => {
  return (
    <Button
      variant="outline"
      className={cn(
        "bg-transparent hover:bg-transparent rounded-full hover:border-primary border-transparent",
        "px-3.5 text-lg",
        isActive && "bg-black text-white hover:bg-black hover:text-white"
      )}
    >
      <Link href={href}>{children}</Link>
    </Button>
  );
};

const NavbarItems = [
  { href: "/", children: "Home" },
  { href: "/about", children: "About" },
  { href: "/contact", children: "Contact" },
  { href: "/pricing", children: "Pricing" },
  { href: "/help", children: "Help" },
];

export const Navbar = () => {
  const [issidebar, setissidebar] = useState(false);
  const pathname = usePathname();

  return (
    <nav className="h-20 flex items-center justify-between border-b border-gray-200 bg-white px-6">
      <Link href="/" className="flex items-center">
        <span
          className={cn(
            "text-3xl md:text-4xl font-semibold tracking-tight text-gray-800",
            poppins.className
          )}
        >
          funroad
        </span>
      </Link>

      <Navbarsidebar
        open={issidebar}
        onopenchange={setissidebar}
        items={NavbarItems}
      />

      {/* Desktop menu */}
      <div className="hidden lg:flex flex-wrap gap-4 overflow-x-hidden">
        {NavbarItems.map((item) => (
          <NavbarItem
            key={item.href}
            href={item.href}
            isActive={pathname === item.href}
          >
            {item.children}
          </NavbarItem>
        ))}
      </div>

      <div className="hidden lg:flex">
        <Button
          asChild
          variant="secondary"
          className="border-l border-t-0 border-b-0 border-r-0 px-12 h-full rounded-none bg-white
        hover:bg-pink-400 transition-colors text-lg"
        >
          <Link href="/sign-in">Login</Link>
        </Button>
        <Button
          asChild
          variant="secondary"
          className="border-l border-t-0 border-b-0 border-r-0 px-12 h-full rounded-none text-white bg-black
        hover:bg-pink-400 hover:text-white transition-colors text-lg"
        >
          <Link href="/sign-up">Selling out</Link>
        </Button>
      </div>

      {/* Mobile toggle button */}
      <div className="flex lg:hidden items-center justify-center">
        <Button
          variant="ghost"
          className="size-12 border-transparent text-black"
          onClick={() => setissidebar(true)}
        >
          <MenuIcon />
        </Button>
      </div>
    </nav>
  );
};
