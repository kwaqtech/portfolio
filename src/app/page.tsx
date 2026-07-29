"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, Mail, MapPin, Code2, Layers, Cpu, Server } from "lucide-react";
import { AnimatedText } from "@/components/ui/AnimatedText";
import { CodeParticlesAnimation } from "@/components/ui/CodeParticlesAnimation";

export default function Home() {
  return (
    <div className="flex flex-col p-8 md:p-12 lg:p-16 max-w-[1200px] mx-auto w-full gap-16">

      {/* Hero Section */}
      <section className="flex flex-col gap-6 pt-4 relative min-h-[500px] justify-center">
        <CodeParticlesAnimation />
        <div className="flex items-center gap-3 text-sm font-mono text-[var(--color-muted-foreground)]">
          <span className="flex items-center gap-1.5 px-2 py-1 rounded bg-white/5 border border-white/10">
            <MapPin className="w-3.5 h-3.5" />
            Vietnam
          </span>
          <span className="flex items-center gap-1.5 px-2 py-1 rounded bg-white/5 border border-white/10">
            <Code2 className="w-3.5 h-3.5" />
            Backend Engineer
          </span>
        </div>

        <h1 className="text-4xl md:text-6xl lg:text-7xl font-semibold tracking-tight text-white leading-[1.1]">
          <AnimatedText text="Cao Minh Quang" el="span" />
        </h1>

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, type: "spring", stiffness: 300, damping: 30 }}
          className="text-lg md:text-xl text-[var(--color-muted-foreground)] max-w-2xl leading-relaxed"
        >
          I build high-performance software systems. Currently focusing on scalable backend architectures, distributed systems, and elegant API design.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, type: "spring", stiffness: 300, damping: 30 }}
          className="flex flex-wrap items-center gap-4 pt-4"
        >
          <a href="/portfolio/projects" className="flex items-center gap-2 px-5 py-2.5 bg-white text-black text-sm font-medium rounded-md hover:bg-zinc-200 transition-colors">
            View Projects
          </a>
          <a href="/portfolio/contact" className="flex items-center gap-2 px-5 py-2.5 bg-[var(--color-panel)] border border-[var(--color-panel-border)] text-white text-sm font-medium rounded-md hover:bg-[var(--color-panel-hover)] transition-colors">
            Contact Me
          </a>

          <div className="w-px h-6 bg-[var(--color-panel-border)] mx-2"></div>

          <a href="https://github.com/kwaqtech" target="_blank" rel="noreferrer" className="p-2.5 bg-[var(--color-panel)] border border-[var(--color-panel-border)] text-[var(--color-muted-foreground)] rounded-md hover:text-white hover:bg-[var(--color-panel-hover)] transition-colors">
            <svg viewBox="0 0 24 24" aria-hidden="true" className="h-4 w-4 fill-current"><path d="M12 .5a12 12 0 0 0-3.79 23.39c.6.11.82-.26.82-.58v-2.17c-3.34.73-4.04-1.41-4.04-1.41-.55-1.37-1.33-1.74-1.33-1.74-1.09-.73.08-.72.08-.72 1.2.09 1.84 1.22 1.84 1.22 1.07 1.83 2.8 1.3 3.48 1 .11-.77.42-1.3.76-1.6-2.67-.3-5.47-1.31-5.47-5.86 0-1.3.47-2.37 1.24-3.2-.13-.3-.54-1.53.12-3.18 0 0 1.01-.32 3.3 1.22a11.53 11.53 0 0 1 6 0c2.29-1.54 3.3-1.22 3.3-1.22.66 1.65.25 2.88.12 3.18.77.83 1.24 1.9 1.24 3.2 0 4.56-2.8 5.56-5.48 5.86.43.37.81 1.1.81 2.22v3.3c0 .32.22.7.83.58A12 12 0 0 0 12 .5Z" /></svg>
          </a>
          <a href="https://www.linkedin.com/in/minh-quang-cao-37b223333/" target="_blank" rel="noreferrer" className="p-2.5 bg-[var(--color-panel)] border border-[var(--color-panel-border)] text-[var(--color-muted-foreground)] rounded-md hover:text-white hover:bg-[var(--color-panel-hover)] transition-colors">
            <svg viewBox="0 0 24 24" aria-hidden="true" className="h-4 w-4 fill-current"><path d="M5.03 3.5A1.53 1.53 0 1 1 5 6.56a1.53 1.53 0 0 1 .03-3.06ZM3.7 8h2.63v12H3.7V8Zm6.14 0h2.52v1.64h.04c.35-.66 1.2-1.36 2.47-1.36 2.64 0 3.13 1.74 3.13 4v7.72h-2.63v-6.84c0-1.64-.03-3.75-2.28-3.75-2.28 0-2.63 1.78-2.63 3.63V20H9.84V8Z" /></svg>
          </a>
        </motion.div>
      </section>

      {/* Grid Features */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {[
          {
            title: "Architecture First",
            desc: "Designing resilient systems capable of handling high loads and complex state.",
            icon: Layers
          },
          {
            title: "Backend Engineering",
            desc: "Writing efficient, secure, and maintainable services across the stack.",
            icon: Server
          },
          {
            title: "Performance Tuning",
            desc: "Optimizing database queries and memory allocation for ultra-low latency.",
            icon: Cpu
          }
        ].map((feat, i) => {
          const Icon = feat.icon;
          return (
            <motion.div
              key={feat.title}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 + i * 0.1, type: "spring", stiffness: 300, damping: 30 }}
              className="flex flex-col gap-3 p-6 rounded-xl bg-[var(--color-panel)] border border-[var(--color-panel-border)]"
            >
              <div className="w-10 h-10 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center">
                <Icon className="w-5 h-5 text-white" />
              </div>
              <h3 className="text-base font-medium text-white">{feat.title}</h3>
              <p className="text-sm text-[var(--color-muted-foreground)] leading-relaxed">
                {feat.desc}
              </p>
            </motion.div>
          )
        })}
      </section>

      {/* About Section snippet */}
      <motion.section
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7, type: "spring", stiffness: 300, damping: 30 }}
        className="flex flex-col gap-6"
      >
        <h2 className="text-2xl font-semibold text-white tracking-tight">About Me</h2>
        <div className="prose prose-invert prose-p:text-[var(--color-muted-foreground)] prose-p:leading-relaxed max-w-4xl">
          <p>
            I am a Software Engineer deeply passionate about backend systems, distributed architecture, and the intersection of product and engineering.
            My journey into computer science began with a fascination for how data moves and systems scale. Since then, I've dedicated myself to mastering the complexities of building software that not only works but is robust, secure, and elegant.
          </p>
          <p>
            In my work, I prioritize thoughtful architecture over quick hacks. I believe that understanding the business problem is just as important as writing the code to solve it. Whether it's designing a high-throughput API, optimizing a complex SQL query, or structuring a new microservice, I approach every technical decision with a focus on long-term maintainability and performance.
          </p>
        </div>
      </motion.section>

      {/* Footer Spacer */}
      <div className="h-16" />
    </div>
  );
}
