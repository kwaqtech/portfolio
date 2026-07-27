"use client";

import { motion } from "framer-motion";
import { ArrowLeft, ExternalLink, Activity, Network, ShieldAlert } from "lucide-react";
import Link from "next/link";
import { CaseStudy } from "@/data/projects";

export function CaseStudyClient({ project }: { project: CaseStudy }) {
  return (
    <div className="flex flex-col p-8 md:p-12 lg:p-16 max-w-[900px] mx-auto w-full gap-16">
      
      {/* Header */}
      <section className="flex flex-col gap-6">
        <Link href="/projects" className="flex items-center gap-2 text-sm text-[var(--color-muted-foreground)] hover:text-white transition-colors w-fit">
          <ArrowLeft className="w-4 h-4" />
          Back to Projects
        </Link>
        
        <div className="flex flex-col gap-2 pt-4">
          <div className="flex items-center gap-3 text-sm font-mono text-[var(--color-muted-foreground)]">
            <span>{project.year}</span>
            <span className="w-1 h-1 rounded-full bg-[var(--color-panel-border)]" />
            <span>{project.role}</span>
          </div>
          <motion.h1 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl lg:text-6xl font-semibold tracking-tight text-white leading-tight"
          >
            {project.title}
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-xl text-[var(--color-muted-foreground)] mt-2 max-w-2xl"
          >
            {project.subtitle}
          </motion.p>
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="flex flex-wrap items-center gap-4 pt-4"
        >
          {project.githubUrl && (
            <a href={project.githubUrl} target="_blank" rel="noreferrer" className="flex items-center gap-2 px-4 py-2 bg-[var(--color-panel)] border border-[var(--color-panel-border)] text-white text-sm font-medium rounded-md hover:bg-[var(--color-panel-hover)] transition-colors">
              <svg viewBox="0 0 24 24" aria-hidden="true" className="w-4 h-4 fill-white"><path d="M12 .5a12 12 0 0 0-3.79 23.39c.6.11.82-.26.82-.58v-2.17c-3.34.73-4.04-1.41-4.04-1.41-.55-1.37-1.33-1.74-1.33-1.74-1.09-.73.08-.72.08-.72 1.2.09 1.84 1.22 1.84 1.22 1.07 1.83 2.8 1.3 3.48 1 .11-.77.42-1.3.76-1.6-2.67-.3-5.47-1.31-5.47-5.86 0-1.3.47-2.37 1.24-3.2-.13-.3-.54-1.53.12-3.18 0 0 1.01-.32 3.3 1.22a11.53 11.53 0 0 1 6 0c2.29-1.54 3.3-1.22 3.3-1.22.66 1.65.25 2.88.12 3.18.77.83 1.24 1.9 1.24 3.2 0 4.56-2.8 5.56-5.48 5.86.43.37.81 1.1.81 2.22v3.3c0 .32.22.7.83.58A12 12 0 0 0 12 .5Z" /></svg>
              Source Code
            </a>
          )}
          {project.link && (
            <a href={project.link} target="_blank" rel="noreferrer" className="flex items-center gap-2 px-4 py-2 bg-white text-black text-sm font-medium rounded-md hover:bg-zinc-200 transition-colors">
              <ExternalLink className="w-4 h-4" />
              Live Deployment
            </a>
          )}
        </motion.div>
      </section>

      {/* Metrics Grid */}
      <motion.section 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="grid grid-cols-2 md:grid-cols-4 gap-4"
      >
        {project.metrics.map((metric, idx) => (
          <div key={idx} className="flex flex-col gap-1 p-4 rounded-xl bg-[var(--color-panel)] border border-[var(--color-panel-border)]">
            <span className="text-2xl font-semibold font-mono text-white">{metric.value}</span>
            <span className="text-xs text-[var(--color-muted-foreground)] uppercase tracking-wider">{metric.label}</span>
          </div>
        ))}
        <div className="flex flex-col gap-2 p-4 rounded-xl bg-[var(--color-panel)] border border-[var(--color-panel-border)] col-span-2 md:col-span-1 justify-center">
          <span className="text-xs text-[var(--color-muted-foreground)] uppercase tracking-wider mb-1">Tech Stack</span>
          <div className="flex flex-wrap gap-1.5">
            {project.techStack.map(t => (
              <span key={t} className="px-1.5 py-0.5 text-[10px] font-mono bg-black/40 border border-white/5 rounded text-zinc-300">
                {t}
              </span>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Technical Deep Dive */}
      <section className="flex flex-col gap-16 mt-8">
        
        {/* The Problem */}
        <div className="flex flex-col gap-6">
          <div className="flex items-center gap-3 border-b border-[var(--color-panel-border)] pb-4">
            <ShieldAlert className="w-5 h-5 text-red-400" />
            <h2 className="text-xl font-semibold text-white">The Problem Context</h2>
          </div>
          <p className="text-[var(--color-muted-foreground)] leading-relaxed text-lg">
            {project.problem}
          </p>
        </div>

        {/* The Architecture */}
        <div className="flex flex-col gap-6">
          <div className="flex items-center gap-3 border-b border-[var(--color-panel-border)] pb-4">
            <Network className="w-5 h-5 text-blue-400" />
            <h2 className="text-xl font-semibold text-white">Architecture & Solution</h2>
          </div>
          <p className="text-[var(--color-muted-foreground)] leading-relaxed text-lg">
            {project.solution}
          </p>
          <div className="p-6 rounded-xl bg-black/40 border border-[var(--color-panel-border)] mt-2">
            <p className="text-[var(--color-muted-foreground)] leading-relaxed font-mono text-sm">
              <span className="text-white block mb-2 font-sans font-medium text-base">System Design:</span>
              {project.architecture}
            </p>
          </div>
        </div>

        {/* Tradeoffs */}
        <div className="flex flex-col gap-6">
          <div className="flex items-center gap-3 border-b border-[var(--color-panel-border)] pb-4">
            <Activity className="w-5 h-5 text-amber-400" />
            <h2 className="text-xl font-semibold text-white">Engineering Tradeoffs</h2>
          </div>
          <p className="text-[var(--color-muted-foreground)] leading-relaxed text-lg">
            {project.tradeoffs}
          </p>
        </div>

        {/* Highlights */}
        <div className="flex flex-col gap-6">
          <h2 className="text-xl font-semibold text-white">Key Achievements</h2>
          <ul className="flex flex-col gap-4">
            {project.highlights.map((highlight, idx) => (
              <li key={idx} className="flex items-start gap-4">
                <span className="flex items-center justify-center w-6 h-6 rounded-full bg-white/5 border border-white/10 text-xs font-mono text-[var(--color-muted-foreground)] shrink-0 mt-0.5">
                  0{idx + 1}
                </span>
                <span className="text-[var(--color-muted-foreground)] leading-relaxed text-lg">{highlight}</span>
              </li>
            ))}
          </ul>
        </div>

      </section>

      <div className="h-16" />
    </div>
  );
}
