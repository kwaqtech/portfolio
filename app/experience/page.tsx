"use client";

import { motion } from "framer-motion";

const EXPERIENCES = [
  {
    role: "Freelance Software Developer",
    company: "Self-Employed",
    period: "Feb 2024 - Present",
    desc: "Architected and built scalable e-commerce and portfolio solutions.",
    tech: ["Next.js", "React", "TypeScript", "Tailwind CSS"],
    highlights: [
      "Led the end-to-end development of robust web applications focusing on performance and SEO.",
      "Integrated secure payment gateways and complex state management systems.",
      "Achieved 99+ Lighthouse scores through server-side rendering and aggressive caching strategies."
    ]
  },
  {
    role: "Front-End Developer (Intern)",
    company: "Innoteq",
    period: "May 2024 - Oct 2024",
    desc: "Spearheaded frontend initiatives and modernized legacy UI systems.",
    tech: ["React", "Redux", "SCSS", "Figma"],
    highlights: [
      "Re-engineered critical user flows, reducing drop-off rates by 15%.",
      "Collaborated closely with designers to implement pixel-perfect, responsive components.",
      "Introduced strict TypeScript typing across the codebase to prevent runtime errors."
    ]
  }
];

export default function Experience() {
  return (
    <div className="flex flex-col p-8 md:p-12 lg:p-16 max-w-[900px] mx-auto w-full gap-12">
      <div className="flex flex-col gap-4">
        <motion.h1 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl font-semibold tracking-tight text-white"
        >
          Experience
        </motion.h1>
        <motion.p 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-[var(--color-muted-foreground)] text-lg"
        >
          A history of building resilient systems and shipping impactful products.
        </motion.p>
      </div>

      <div className="flex flex-col gap-12 relative before:absolute before:inset-0 before:ml-2 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-[var(--color-panel-border)] before:to-transparent">
        {EXPERIENCES.map((exp, i) => (
          <motion.div 
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 + i * 0.1, type: "spring", stiffness: 300, damping: 30 }}
            className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active"
          >
            {/* Timeline Node */}
            <div className="flex items-center justify-center w-5 h-5 rounded-full border border-[var(--color-panel-border)] bg-black shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2">
              <div className="w-1.5 h-1.5 bg-white rounded-full"></div>
            </div>
            
            {/* Content Card */}
            <div className="w-[calc(100%-2.5rem)] md:w-[calc(50%-2.5rem)] p-6 rounded-xl bg-[var(--color-panel)] border border-[var(--color-panel-border)] transition-colors hover:bg-[var(--color-panel-hover)]">
              <div className="flex flex-col gap-1 mb-4">
                <span className="font-mono text-xs text-[var(--color-muted-foreground)] uppercase tracking-wider">{exp.period}</span>
                <h3 className="text-xl font-medium text-white">{exp.role}</h3>
                <span className="text-sm text-[var(--color-muted-foreground)]">{exp.company}</span>
              </div>
              
              <ul className="flex flex-col gap-2 mb-6">
                {exp.highlights.map((highlight, idx) => (
                  <li key={idx} className="text-sm text-[var(--color-muted-foreground)] leading-relaxed flex items-start gap-2">
                    <span className="text-white/30 mt-1">-</span>
                    <span>{highlight}</span>
                  </li>
                ))}
              </ul>
              
              <div className="flex flex-wrap gap-2 mt-auto">
                {exp.tech.map(t => (
                  <span key={t} className="px-2 py-1 text-xs font-mono bg-white/5 border border-white/10 rounded text-[var(--color-muted-foreground)]">
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
