"use client";

import { motion } from "framer-motion";
import { User, Terminal, Cpu, Database, Blocks } from "lucide-react";

export default function About() {
  return (
    <div className="flex flex-col p-8 md:p-12 lg:p-16 max-w-[900px] mx-auto w-full gap-12">
      <div className="flex flex-col gap-4">
        <motion.h1 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl font-semibold tracking-tight text-white flex items-center gap-3"
        >
          <User className="w-8 h-8" />
          About Me
        </motion.h1>
        <motion.p 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-[var(--color-muted-foreground)] text-lg"
        >
          Engineering robust solutions at the intersection of performance and product.
        </motion.p>
      </div>

      <div className="flex flex-col gap-8">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, type: "spring", stiffness: 300, damping: 30 }}
          className="prose prose-invert prose-p:text-[var(--color-muted-foreground)] prose-p:leading-relaxed max-w-none"
        >
          <p className="text-lg text-zinc-300">
            Hi, I'm Minh Quang Cao. I'm a software engineer who specializes in backend architecture and full-stack development. I believe that writing code is only 20% of the job—the other 80% is designing systems that can scale, fail gracefully, and be maintained by a team.
          </p>
          <p>
            My journey began with a deep curiosity about how large-scale systems handle millions of concurrent users. Over the years, I've honed my skills in distributed systems, API design, and database optimization. I enjoy working on the hard problems: dealing with race conditions, caching strategies, and ensuring data consistency across microservices.
          </p>
          <p>
            When I'm not writing code, I'm usually reading up on system design patterns, contributing to open-source, or analyzing the engineering blogs of major tech companies. I hold a strong belief that the best engineers are those who deeply understand the business context of what they are building.
          </p>
        </motion.div>

        {/* Skill Matrix */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="flex flex-col p-6 rounded-xl bg-[var(--color-panel)] border border-[var(--color-panel-border)]"
          >
            <div className="flex items-center gap-3 mb-6">
              <Terminal className="w-5 h-5 text-white" />
              <h3 className="text-lg font-medium text-white">Backend Core</h3>
            </div>
            <div className="flex flex-wrap gap-2">
              {["Node.js", "Python", "Go", "FastAPI", "Express", "NestJS"].map(t => (
                <span key={t} className="px-2.5 py-1 text-xs font-mono bg-black/40 border border-white/5 rounded-md text-zinc-300">{t}</span>
              ))}
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="flex flex-col p-6 rounded-xl bg-[var(--color-panel)] border border-[var(--color-panel-border)]"
          >
            <div className="flex items-center gap-3 mb-6">
              <Database className="w-5 h-5 text-white" />
              <h3 className="text-lg font-medium text-white">Data & Storage</h3>
            </div>
            <div className="flex flex-wrap gap-2">
              {["PostgreSQL", "MongoDB", "Redis", "Elasticsearch", "Prisma", "TypeORM"].map(t => (
                <span key={t} className="px-2.5 py-1 text-xs font-mono bg-black/40 border border-white/5 rounded-md text-zinc-300">{t}</span>
              ))}
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="flex flex-col p-6 rounded-xl bg-[var(--color-panel)] border border-[var(--color-panel-border)]"
          >
            <div className="flex items-center gap-3 mb-6">
              <Blocks className="w-5 h-5 text-white" />
              <h3 className="text-lg font-medium text-white">Frontend & UI</h3>
            </div>
            <div className="flex flex-wrap gap-2">
              {["React", "Next.js", "TypeScript", "Tailwind CSS", "Framer Motion", "Zustand"].map(t => (
                <span key={t} className="px-2.5 py-1 text-xs font-mono bg-black/40 border border-white/5 rounded-md text-zinc-300">{t}</span>
              ))}
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="flex flex-col p-6 rounded-xl bg-[var(--color-panel)] border border-[var(--color-panel-border)]"
          >
            <div className="flex items-center gap-3 mb-6">
              <Cpu className="w-5 h-5 text-white" />
              <h3 className="text-lg font-medium text-white">DevOps & Tooling</h3>
            </div>
            <div className="flex flex-wrap gap-2">
              {["Docker", "GitHub Actions", "AWS", "Vercel", "Linux", "Nginx"].map(t => (
                <span key={t} className="px-2.5 py-1 text-xs font-mono bg-black/40 border border-white/5 rounded-md text-zinc-300">{t}</span>
              ))}
            </div>
          </motion.div>

        </div>
      </div>
    </div>
  );
}
