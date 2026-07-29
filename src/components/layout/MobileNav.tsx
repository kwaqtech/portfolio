"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, Briefcase, FileCode2, User, Search } from "lucide-react";
import { cn } from "@/lib/utils";

const NAV_ITEMS = [
  { href: "/", label: "Overview", icon: LayoutDashboard },
  { href: "/projects", label: "Projects", icon: FileCode2 },
  { href: "/experience", label: "Experience", icon: Briefcase },
  { href: "/about", label: "About", icon: User },
];

export function MobileNav({ onOpenCommand }: { onOpenCommand: () => void }) {
  const pathname = usePathname();

  return (
    <nav className="md:hidden flex items-center justify-around h-16 border-t border-[var(--color-panel-border)] bg-[var(--color-background)] shrink-0 px-2 pb-safe z-20 relative">
      {NAV_ITEMS.map((item) => {
        const isActive = pathname === item.href || (item.href !== "/" && pathname.startsWith(item.href));
        const Icon = item.icon;
        return (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              "flex flex-col items-center justify-center w-full h-full gap-1 transition-colors",
              isActive ? "text-white" : "text-[var(--color-muted-foreground)] hover:text-white"
            )}
          >
            <Icon className="w-5 h-5" />
            <span className="text-[10px] font-medium">{item.label}</span>
          </Link>
        );
      })}
      <button 
        onClick={onOpenCommand}
        className="flex flex-col items-center justify-center w-full h-full gap-1 text-[var(--color-muted-foreground)] hover:text-white transition-colors"
      >
        <Search className="w-5 h-5" />
        <span className="text-[10px] font-medium">Search</span>
      </button>
    </nav>
  );
}
