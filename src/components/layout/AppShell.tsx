"use client";

import { Sidebar } from "./Sidebar";
import { AnimatePresence, motion } from "framer-motion";
import { usePathname } from "next/navigation";
import { CommandMenu } from "@/components/ui/CommandMenu";
import { useState } from "react";

export function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [commandOpen, setCommandOpen] = useState(false);

  return (
    <div className="flex h-screen w-screen overflow-hidden bg-[var(--color-background)] text-[var(--color-foreground)]">
      {/* Global Sidebar Navigation */}
      <Sidebar onOpenCommand={() => setCommandOpen(true)} />

      {/* Main Content Area */}
      <main className="flex-1 relative flex flex-col min-w-0 h-full overflow-hidden">
        <div className="h-12 border-b border-[var(--color-panel-border)] flex items-center px-6 shrink-0 bg-[var(--color-background)] z-10">
          {/* Breadcrumbs or Context Header */}
          <span className="text-sm font-mono text-[var(--color-muted-foreground)]">
            ~{pathname === "/" ? "/overview" : pathname}
          </span>
        </div>

        <div className="flex-1 overflow-y-auto custom-scrollbar relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={pathname}
              initial={{ opacity: 0, y: 10, filter: "blur(4px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              exit={{ opacity: 0, y: -10, filter: "blur(4px)" }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="min-h-full"
            >
              {children}
            </motion.div>
          </AnimatePresence>
        </div>
      </main>

      <CommandMenu open={commandOpen} setOpen={setCommandOpen} />
    </div>
  );
}
