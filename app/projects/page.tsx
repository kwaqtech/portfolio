"use client";

import { motion } from "framer-motion";
import { projects } from "@/data/projects";
import Link from "next/link";
import { ArrowUpRight, FolderGit2 } from "lucide-react";

export default function Projects() {
  return (
    <div className="flex flex-col p-8 md:p-12 lg:p-16 max-w-[1200px] mx-auto w-full gap-12">
      <div className="flex flex-col gap-4">
        <motion.h1 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl font-semibold tracking-tight text-white flex items-center gap-3"
        >
          <FolderGit2 className="w-8 h-8" />
          Projects
        </motion.h1>
        <motion.p 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-[var(--color-muted-foreground)] text-lg max-w-2xl"
        >
          A selection of distributed systems, full-stack applications, and technical explorations.
        </motion.p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {projects.map((project, i) => (
          <Link key={project.slug} href={`/projects/${project.slug}`}>
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 + i * 0.1, type: "spring", stiffness: 300, damping: 30 }}
              className="group relative flex flex-col h-full min-h-[320px] p-8 rounded-2xl bg-[var(--color-panel)] border border-[var(--color-panel-border)] overflow-hidden transition-all hover:bg-[var(--color-panel-hover)]"
            >
              {/* Top Section */}
              <div className="flex justify-between items-start mb-6">
                <div className="flex flex-col gap-1.5">
                  <span className="font-mono text-xs text-[var(--color-muted-foreground)] tracking-wider">
                    {project.year} — {project.role}
                  </span>
                  <h3 className="text-2xl font-semibold text-white tracking-tight">{project.title}</h3>
                </div>
                <div className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center transition-transform group-hover:bg-white/10 group-hover:-translate-y-1 group-hover:translate-x-1">
                  <ArrowUpRight className="w-5 h-5 text-white" />
                </div>
              </div>

              {/* Description */}
              <p className="text-[var(--color-muted-foreground)] leading-relaxed mb-8 line-clamp-3">
                {project.description}
              </p>

              {/* Bottom Section (Metrics & Tech) */}
              <div className="mt-auto flex flex-col gap-6">
                <div className="flex items-center gap-4 border-t border-[var(--color-panel-border)] pt-4">
                  {project.metrics.slice(0, 2).map((m, idx) => (
                    <div key={idx} className="flex flex-col">
                      <span className="text-lg font-mono text-white">{m.value}</span>
                      <span className="text-xs text-[var(--color-muted-foreground)] uppercase tracking-wider">{m.label}</span>
                    </div>
                  ))}
                </div>

                <div className="flex flex-wrap gap-2">
                  {project.techStack.slice(0, 4).map(t => (
                    <span key={t} className="px-2.5 py-1 text-xs font-medium bg-black/40 border border-white/5 rounded-md text-zinc-300">
                      {t}
                    </span>
                  ))}
                  {project.techStack.length > 4 && (
                    <span className="px-2.5 py-1 text-xs font-medium bg-black/40 border border-white/5 rounded-md text-zinc-500">
                      +{project.techStack.length - 4}
                    </span>
                  )}
                </div>
              </div>

              {/* Subtle hover gradient */}
              <div className="absolute inset-0 bg-gradient-to-tr from-white/[0.02] to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
            </motion.div>
          </Link>
        ))}
      </div>
    </div>
  );
}
