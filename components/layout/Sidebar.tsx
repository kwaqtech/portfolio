"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, Briefcase, FileCode2, User, Mail, Search } from "lucide-react";
import { cn } from "@/lib/utils";

const NAV_ITEMS = [
  { href: "/", label: "Overview", icon: LayoutDashboard },
  { href: "/projects", label: "Projects", icon: FileCode2 },
  { href: "/experience", label: "Experience", icon: Briefcase },
  { href: "/about", label: "About Me", icon: User },
  { href: "/contact", label: "Contact", icon: Mail },
];

export function Sidebar({ onOpenCommand }: { onOpenCommand?: () => void }) {
  const pathname = usePathname();

  return (
    <aside className="w-64 flex-shrink-0 border-r border-[var(--color-panel-border)] bg-[var(--color-panel)] flex flex-col h-full">
      <div className="p-6">
        <h1 className="text-xl font-medium tracking-tight text-white mb-1">Minh Quang Cao</h1>
        <p className="text-sm text-[var(--color-muted-foreground)] font-mono">Software Engineer</p>
      </div>

      <div className="px-4 py-2 mb-4">
        <button 
          onClick={onOpenCommand}
          className="w-full flex items-center justify-between px-3 py-2 text-sm text-[var(--color-muted-foreground)] bg-black/40 border border-[var(--color-panel-border)] rounded-md hover:bg-white/5 transition-colors group"
        >
          <span className="flex items-center gap-2">
            <Search className="w-4 h-4 group-hover:text-white transition-colors" />
            <span className="group-hover:text-white transition-colors">Search...</span>
          </span>
          <span className="text-xs border border-[var(--color-panel-border)] px-1.5 py-0.5 rounded-sm font-mono group-hover:border-white/20 group-hover:text-white transition-colors">
            ⌘K
          </span>
        </button>
      </div>

      <nav className="flex-1 px-4 space-y-1 overflow-y-auto custom-scrollbar">
        {NAV_ITEMS.map((item) => {
          const isActive = pathname === item.href || (item.href !== "/" && pathname.startsWith(item.href));
          const Icon = item.icon;

          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition-colors",
                isActive
                  ? "bg-white/10 text-white"
                  : "text-[var(--color-muted-foreground)] hover:bg-[var(--color-panel-hover)] hover:text-white"
              )}
            >
              <Icon className="w-4 h-4" />
              {item.label}
            </Link>
          );
        })}
      </nav>

      <div className="p-4 border-t border-[var(--color-panel-border)]">
        <div className="flex items-center gap-3 text-xs text-[var(--color-muted-foreground)] font-mono">
          <span className="w-2 h-2 rounded-full bg-green-500/80 animate-pulse shadow-[0_0_8px_rgba(34,197,94,0.5)]"></span>
          Available for hire
        </div>
      </div>
    </aside>
  );
}
