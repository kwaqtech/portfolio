"use client";

import { motion, useScroll, useTransform, Variants } from "framer-motion";
import { ArrowUpRight, Mail } from "lucide-react";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { AnimatedText } from "@/components/ui/AnimatedText";
import { DoubleBezelCard } from "@/components/ui/DoubleBezelCard";
import { MagneticButton } from "@/components/ui/Button";
import { projects } from "@/data/projects";

const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

const itemReveal: Variants = {
  hidden: { opacity: 0, y: 30, filter: "blur(4px)" },
  show: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { type: "spring", stiffness: 100, damping: 20 },
  },
};

export default function Home() {
  const [mounted, setMounted] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start start", "end end"] });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="relative" ref={containerRef}>
      {/* Floating Glass Navigation */}
      <nav className="fixed left-0 right-0 top-6 z-50 mx-auto w-max rounded-full p-1.5 liquid-glass">
        <ul className="flex items-center gap-1">
          <li>
            <Link href="#work" className="rounded-full px-5 py-2 text-sm font-medium text-zinc-400 transition-colors hover:bg-white/10 hover:text-foreground">
              Work
            </Link>
          </li>
          <li>
            <Link href="#about" className="rounded-full px-5 py-2 text-sm font-medium text-zinc-400 transition-colors hover:bg-white/10 hover:text-foreground">
              About
            </Link>
          </li>
          <li>
            <Link href="#contact" className="rounded-full px-5 py-2 text-sm font-medium text-zinc-400 transition-colors hover:bg-white/10 hover:text-foreground">
              Contact
            </Link>
          </li>
        </ul>
      </nav>

      <main className="mx-auto max-w-[1400px] px-4 md:px-8">
        {/* Asymmetrical Split Hero */}
        <section className="relative flex min-h-[100dvh] w-full flex-col justify-center pb-24 pt-32 md:flex-row md:items-center md:pb-0">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="show"
            className="flex w-full flex-col items-start md:w-1/2 md:pr-12"
          >
            <motion.div variants={itemReveal} className="mb-8 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-emerald-500 shadow-[inset_0_1px_1px_rgba(255,255,255,0.1)]">
              Available for new opportunities
            </motion.div>
            
            <AnimatedText
              text="Software Engineer & Design Systems Architect."
              el="h1"
              className="mb-8 font-sans text-5xl font-medium tracking-tighter sm:text-7xl md:text-[5.5rem] md:leading-[0.95]"
            />
            
            <motion.p variants={itemReveal} className="mb-12 max-w-lg text-lg leading-relaxed text-zinc-400 md:text-xl">
              I bridge complex logic with high-end visual design. Building scalable systems and fluid interfaces that feel <em>stunning</em> to use.
            </motion.p>
            
            <motion.div variants={itemReveal}>
              <MagneticButton
                icon={<ArrowUpRight className="h-4 w-4" />}
                onClick={() => document.getElementById("work")?.scrollIntoView({ behavior: "smooth" })}
              >
                View Selected Work
              </MagneticButton>
            </motion.div>
          </motion.div>

          {/* Right side dynamic aesthetic element */}
          <motion.div
            style={{ y }}
            className="hidden w-1/2 justify-end md:flex"
          >
            <div className="relative aspect-square w-full max-w-lg opacity-40 mix-blend-screen">
              <div className="absolute inset-0 rounded-full bg-emerald-500/20 blur-[120px]" />
              <div className="absolute inset-1/4 rounded-full bg-blue-500/20 blur-[80px]" />
            </div>
          </motion.div>
        </section>

        {/* Selected Work - Bento Grid */}
        <section id="work" className="py-32 md:py-48">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: [0.32, 0.72, 0, 1] }}
          >
            <h2 className="mb-16 font-sans text-4xl font-medium tracking-tighter md:text-6xl">
              Selected Work
            </h2>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-12 md:grid-rows-[auto_auto]">
              {/* Featured Large Card */}
              <DoubleBezelCard className="md:col-span-8" innerClassName="flex flex-col justify-end p-8 md:p-12 min-h-[400px] md:min-h-[500px]">
                <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-transparent z-10" />
                <div className="relative z-20 flex flex-col items-start">
                  <div className="mb-4 flex gap-2">
                    {projects[0].tags.slice(0, 2).map(tag => (
                      <span key={tag} className="rounded-full bg-white/10 px-3 py-1 text-xs text-zinc-300 backdrop-blur-md">
                        {tag}
                      </span>
                    ))}
                  </div>
                  <h3 className="mb-3 text-3xl font-medium tracking-tighter md:text-5xl">{projects[0].title}</h3>
                  <p className="mb-8 max-w-md text-zinc-400">{projects[0].oneLiner}</p>
                  <Link
                    href={`/projects/${projects[0].slug}`}
                    className="inline-flex items-center gap-2 font-medium text-emerald-500 transition-colors hover:text-emerald-400"
                  >
                    Read Case Study <ArrowUpRight className="h-4 w-4" />
                  </Link>
                </div>
              </DoubleBezelCard>

              {/* Secondary Cards */}
              {projects.slice(1).map((project, idx) => (
                <DoubleBezelCard key={project.slug} className={idx === 0 ? "md:col-span-4" : "md:col-span-6"} innerClassName="flex flex-col justify-end p-8 min-h-[350px]">
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent to-background/90 z-10" />
                  <div className="relative z-20 flex flex-col items-start">
                    <h3 className="mb-2 text-2xl font-medium tracking-tight">{project.title}</h3>
                    <p className="mb-6 text-sm text-zinc-400 line-clamp-2">{project.oneLiner}</p>
                    <Link
                      href={`/projects/${project.slug}`}
                      className="group inline-flex h-10 w-10 items-center justify-center rounded-full bg-white/10 transition-colors hover:bg-white/20"
                      aria-label={`View ${project.title}`}
                    >
                      <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </Link>
                  </div>
                </DoubleBezelCard>
              ))}
              
              {/* Contact Card in Bento */}
              <DoubleBezelCard className="md:col-span-6 bg-emerald-500/5 border-emerald-500/20" innerClassName="flex flex-col justify-center items-center p-8 text-center min-h-[350px]">
                <h3 className="mb-4 text-2xl font-medium tracking-tight text-emerald-500">Have a project in mind?</h3>
                <p className="mb-8 text-sm text-zinc-400">Let's build something exceptional together.</p>
                <MagneticButton
                  onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
                  className="bg-emerald-500 text-black hover:bg-emerald-400"
                >
                  Get in Touch
                </MagneticButton>
              </DoubleBezelCard>
            </div>
          </motion.div>
        </section>

        {/* Soft Structuralism About */}
        <section id="about" className="py-32 md:py-48 border-t border-white/5">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-8">
            <div className="md:col-span-4">
              <h2 className="text-sm font-bold uppercase tracking-widest text-zinc-500">The Architect</h2>
            </div>
            <div className="md:col-span-8">
              <h3 className="mb-12 font-sans text-3xl font-medium tracking-tighter leading-tight md:text-5xl max-w-3xl">
                I believe that in a world where everyone's software is good enough, taste is the ultimate differentiator.
              </h3>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-12 text-zinc-400 leading-relaxed text-lg">
                <p>
                  As a Computer Science graduate from FPT University, my foundation is built on robust engineering. But my passion lies in the intersection of code and design—crafting experiences that feel inevitable.
                </p>
                <p>
                  From building complex state engines at BrightBrain Vietnam to navigating high-stakes financial tools at Manulife, I've learned that beauty and performance are not mutually exclusive. They are force multipliers.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer id="contact" className="py-32 md:py-48 border-t border-white/5 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col items-center"
          >
            <h2 className="mb-12 font-sans text-5xl font-medium tracking-tighter md:text-8xl">
              Let's create <br/>
              <span className="text-zinc-600">something iconic.</span>
            </h2>
            
            <div className="flex gap-4 mb-32">
              <a href="mailto:caomq12062004@gmail.com" className="inline-flex h-14 w-14 items-center justify-center rounded-full bg-white/5 border border-white/10 transition-all hover:scale-105 hover:bg-white/10 hover:border-white/20 text-zinc-300">
                <Mail className="h-5 w-5" />
              </a>
              <a href="https://github.com/kwaqtech" target="_blank" rel="noreferrer" className="inline-flex h-14 w-14 items-center justify-center rounded-full bg-white/5 border border-white/10 transition-all hover:scale-105 hover:bg-white/10 hover:border-white/20 text-zinc-300">
                <svg viewBox="0 0 24 24" aria-hidden="true" className="h-5 w-5 fill-current">
                  <path d="M12 .5a12 12 0 0 0-3.79 23.39c.6.11.82-.26.82-.58v-2.17c-3.34.73-4.04-1.41-4.04-1.41-.55-1.37-1.33-1.74-1.33-1.74-1.09-.73.08-.72.08-.72 1.2.09 1.84 1.22 1.84 1.22 1.07 1.83 2.8 1.3 3.48 1 .11-.77.42-1.3.76-1.6-2.67-.3-5.47-1.31-5.47-5.86 0-1.3.47-2.37 1.24-3.2-.13-.3-.54-1.53.12-3.18 0 0 1.01-.32 3.3 1.22a11.53 11.53 0 0 1 6 0c2.29-1.54 3.3-1.22 3.3-1.22.66 1.65.25 2.88.12 3.18.77.83 1.24 1.9 1.24 3.2 0 4.56-2.8 5.56-5.48 5.86.43.37.81 1.1.81 2.22v3.3c0 .32.22.7.83.58A12 12 0 0 0 12 .5Z" />
                </svg>
              </a>
              <a href="https://www.linkedin.com/in/minh-quang-cao-37b223333/" target="_blank" rel="noreferrer" className="inline-flex h-14 w-14 items-center justify-center rounded-full bg-white/5 border border-white/10 transition-all hover:scale-105 hover:bg-white/10 hover:border-white/20 text-zinc-300">
                <svg viewBox="0 0 24 24" aria-hidden="true" className="h-5 w-5 fill-current">
                  <path d="M5.03 3.5A1.53 1.53 0 1 1 5 6.56a1.53 1.53 0 0 1 .03-3.06ZM3.7 8h2.63v12H3.7V8Zm6.14 0h2.52v1.64h.04c.35-.66 1.2-1.36 2.47-1.36 2.64 0 3.13 1.74 3.13 4v7.72h-2.63v-6.84c0-1.64-.03-3.75-2.28-3.75-2.28 0-2.63 1.78-2.63 3.63V20H9.84V8Z" />
                </svg>
              </a>
            </div>
            
            <p className="text-sm font-medium tracking-widest text-zinc-600 uppercase">
              © {new Date().getFullYear()} Minh Quang Cao
            </p>
          </motion.div>
        </footer>
      </main>
    </div>
  );
}
