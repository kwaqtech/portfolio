"use client";

import { useEffect, useState } from "react";
import { Command } from "cmdk";
import { Search, FileCode2, Briefcase, User, Mail, Laptop } from "lucide-react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

export function CommandMenu({ open, setOpen }: { open: boolean; setOpen: (open: boolean) => void }) {
  const router = useRouter();

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen(true);
      }
    };

    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, [setOpen]);

  const runCommand = (command: () => void) => {
    setOpen(false);
    command();
  };

  return (
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-50 flex items-start justify-center pt-[15vh]">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setOpen(false)}
            className="fixed inset-0 blur-panel bg-black/60"
          />

          {/* Dialog */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 10 }}
            transition={{ type: "spring", stiffness: 400, damping: 30 }}
            className="relative z-50 w-full max-w-[640px] overflow-hidden rounded-xl border border-[var(--color-panel-border)] bg-[#09090b] shadow-2xl"
          >
            <Command
              className="flex flex-col w-full h-full"
              loop
            >
              <div className="flex items-center border-b border-[var(--color-panel-border)] px-4">
                <Search className="w-5 h-5 text-[var(--color-muted-foreground)]" />
                <Command.Input 
                  placeholder="Type a command or search..." 
                  className="w-full bg-transparent px-4 py-4 text-sm text-white placeholder:text-[var(--color-muted-foreground)] focus:outline-none"
                />
              </div>

              <Command.List className="max-h-[300px] overflow-y-auto p-2 custom-scrollbar">
                <Command.Empty className="py-6 text-center text-sm text-[var(--color-muted-foreground)]">
                  No results found.
                </Command.Empty>

                <Command.Group heading="Navigation" className="px-2 py-1.5 text-xs font-medium text-[var(--color-muted-foreground)]">
                  <Command.Item
                    onSelect={() => runCommand(() => router.push("/"))}
                    className="flex cursor-pointer select-none items-center gap-3 rounded-md px-3 py-3 text-sm text-white aria-selected:bg-[var(--color-panel-hover)] aria-selected:text-white"
                  >
                    <Laptop className="w-4 h-4" />
                    Overview
                  </Command.Item>
                  <Command.Item
                    onSelect={() => runCommand(() => router.push("/projects"))}
                    className="flex cursor-pointer select-none items-center gap-3 rounded-md px-3 py-3 text-sm text-white aria-selected:bg-[var(--color-panel-hover)] aria-selected:text-white"
                  >
                    <FileCode2 className="w-4 h-4" />
                    Projects
                  </Command.Item>
                  <Command.Item
                    onSelect={() => runCommand(() => router.push("/experience"))}
                    className="flex cursor-pointer select-none items-center gap-3 rounded-md px-3 py-3 text-sm text-white aria-selected:bg-[var(--color-panel-hover)] aria-selected:text-white"
                  >
                    <Briefcase className="w-4 h-4" />
                    Experience
                  </Command.Item>
                  <Command.Item
                    onSelect={() => runCommand(() => router.push("/about"))}
                    className="flex cursor-pointer select-none items-center gap-3 rounded-md px-3 py-3 text-sm text-white aria-selected:bg-[var(--color-panel-hover)] aria-selected:text-white"
                  >
                    <User className="w-4 h-4" />
                    About Me
                  </Command.Item>
                  <Command.Item
                    onSelect={() => runCommand(() => router.push("/contact"))}
                    className="flex cursor-pointer select-none items-center gap-3 rounded-md px-3 py-3 text-sm text-white aria-selected:bg-[var(--color-panel-hover)] aria-selected:text-white"
                  >
                    <Mail className="w-4 h-4" />
                    Contact
                  </Command.Item>
                </Command.Group>
                
                <Command.Group heading="Actions" className="px-2 py-1.5 text-xs font-medium text-[var(--color-muted-foreground)] mt-2">
                  <Command.Item
                    onSelect={() => runCommand(() => window.open("https://github.com/kwaqtech", "_blank"))}
                    className="flex cursor-pointer select-none items-center gap-3 rounded-md px-3 py-3 text-sm text-white aria-selected:bg-[var(--color-panel-hover)] aria-selected:text-white"
                  >
                    <FileCode2 className="w-4 h-4" />
                    GitHub
                  </Command.Item>
                </Command.Group>
              </Command.List>
            </Command>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
