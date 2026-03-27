"use client";

import { motion } from "framer-motion";
import { useRef } from "react";

const sectionReveal = {
  initial: { opacity: 0, y: 28 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.25 },
  transition: { type: "spring" as const, stiffness: 90, damping: 18 },
};

type Star = {
  id: number;
  x: number;
  y: number;
  size: number;
  opacity: number;
  duration: number;
  delay: number;
  driftX: number;
  driftY: number;
};

const stars: Star[] = Array.from({ length: 120 }, (_, i) => {
  const x = (i * 37) % 100;
  const y = (i * 53) % 100;
  const size = 1 + ((i * 13) % 10) / 10;
  const opacity = 0.05 + ((i * 7) % 16) / 100;
  const duration = 5 + (i % 8) * 0.9;
  const delay = (i % 11) * 0.3;
  const driftX = ((i % 5) - 2) * 3;
  const driftY = ((i % 7) - 3) * 2;

  return {
    id: i,
    x,
    y,
    size,
    opacity,
    duration,
    delay,
    driftX,
    driftY,
  };
});

export default function Home() {
  const homeRef = useRef<HTMLElement | null>(null);
  const projectRef = useRef<HTMLElement | null>(null);
  const aboutRef = useRef<HTMLElement | null>(null);
  const headerOffset = 30;

  const scrollToSection = (section: "home" | "project" | "about") => {
    const map = {
      home: homeRef,
      project: projectRef,
      about: aboutRef,
    };

    const target = map[section].current;
    if (!target) {
      return;
    }

    const offsetTop = target.getBoundingClientRect().top + window.scrollY - headerOffset;
    window.scrollTo({ top: Math.max(offsetTop, 0), behavior: "smooth" });
  };

  const renderSocialIcon = (label: string) => {
    if (label === "GitHub") {
      return (
        <svg viewBox="0 0 24 24" aria-hidden className="h-3.5 w-3.5 fill-current">
          <path d="M12 .5a12 12 0 0 0-3.79 23.39c.6.11.82-.26.82-.58v-2.17c-3.34.73-4.04-1.41-4.04-1.41-.55-1.37-1.33-1.74-1.33-1.74-1.09-.73.08-.72.08-.72 1.2.09 1.84 1.22 1.84 1.22 1.07 1.83 2.8 1.3 3.48 1 .11-.77.42-1.3.76-1.6-2.67-.3-5.47-1.31-5.47-5.86 0-1.3.47-2.37 1.24-3.2-.13-.3-.54-1.53.12-3.18 0 0 1.01-.32 3.3 1.22a11.53 11.53 0 0 1 6 0c2.29-1.54 3.3-1.22 3.3-1.22.66 1.65.25 2.88.12 3.18.77.83 1.24 1.9 1.24 3.2 0 4.56-2.8 5.56-5.48 5.86.43.37.81 1.1.81 2.22v3.3c0 .32.22.7.83.58A12 12 0 0 0 12 .5Z" />
        </svg>
      );
    }

    if (label === "Instagram") {
      return (
        <svg viewBox="0 0 24 24" aria-hidden className="h-3.5 w-3.5 fill-current">
          <path d="M7.5 2h9A5.5 5.5 0 0 1 22 7.5v9a5.5 5.5 0 0 1-5.5 5.5h-9A5.5 5.5 0 0 1 2 16.5v-9A5.5 5.5 0 0 1 7.5 2Zm0 1.8A3.7 3.7 0 0 0 3.8 7.5v9a3.7 3.7 0 0 0 3.7 3.7h9a3.7 3.7 0 0 0 3.7-3.7v-9a3.7 3.7 0 0 0-3.7-3.7h-9Zm9.6 1.35a1.2 1.2 0 1 1 0 2.4 1.2 1.2 0 0 1 0-2.4ZM12 7a5 5 0 1 1 0 10 5 5 0 0 1 0-10Zm0 1.8a3.2 3.2 0 1 0 0 6.4 3.2 3.2 0 0 0 0-6.4Z" />
        </svg>
      );
    }

    if (label === "LinkedIn") {
      return (
        <svg viewBox="0 0 24 24" aria-hidden className="h-3.5 w-3.5 fill-current">
          <path d="M5.03 3.5A1.53 1.53 0 1 1 5 6.56a1.53 1.53 0 0 1 .03-3.06ZM3.7 8h2.63v12H3.7V8Zm6.14 0h2.52v1.64h.04c.35-.66 1.2-1.36 2.47-1.36 2.64 0 3.13 1.74 3.13 4v7.72h-2.63v-6.84c0-1.64-.03-3.75-2.28-3.75-2.28 0-2.63 1.78-2.63 3.63V20H9.84V8Z" />
        </svg>
      );
    }

    if (label === "Email") {
      return (
        <svg viewBox="0 0 24 24" aria-hidden className="h-3.5 w-3.5 fill-current">
          <path d="M3 6.75A2.75 2.75 0 0 1 5.75 4h12.5A2.75 2.75 0 0 1 21 6.75v10.5A2.75 2.75 0 0 1 18.25 20H5.75A2.75 2.75 0 0 1 3 17.25V6.75Zm2 .17v.12l7 4.63 7-4.63v-.12a.75.75 0 0 0-.75-.75H5.75a.75.75 0 0 0-.75.75Zm14 2.53-6.45 4.27a1 1 0 0 1-1.1 0L5 9.45v7.8c0 .41.34.75.75.75h12.5c.41 0 .75-.34.75-.75v-7.8Z" />
        </svg>
      );
    }

    if (label === "Phone") {
      return (
        <svg viewBox="0 0 24 24" aria-hidden className="h-3.5 w-3.5 fill-current">
          <path d="M6.62 2.75A2 2 0 0 1 8.4 2h2.03a1 1 0 0 1 1 .84l.46 3.2a1 1 0 0 1-.29.86L9.9 8.6a13.02 13.02 0 0 0 5.5 5.5l1.7-1.7a1 1 0 0 1 .86-.29l3.2.46a1 1 0 0 1 .84 1v2.03a2 2 0 0 1-.75 1.57l-1.14.9a3.5 3.5 0 0 1-3.11.57 18.5 18.5 0 0 1-11.64-11.64 3.5 3.5 0 0 1 .57-3.11l.9-1.14Z" />
        </svg>
      );
    }

    return null;
  };

  return (
    <div className="relative isolate min-h-screen overflow-x-hidden text-white">
      <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden" aria-hidden>
        {stars.map((star) => (
          <motion.span
            key={star.id}
            className="absolute rounded-full bg-white will-change-transform"
            style={{
              left: `${star.x}%`,
              top: `${star.y}%`,
              width: `${star.size}px`,
              height: `${star.size}px`,
              opacity: star.opacity,
            }}
            animate={{
              opacity: [star.opacity * 0.45, star.opacity, star.opacity * 0.5],
              x: [0, star.driftX, 0],
              y: [0, star.driftY, 0],
            }}
            transition={{
              duration: star.duration,
              delay: star.delay,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      <header className="fixed top-0 z-[90] w-full border-b border-white/10 bg-black/50 backdrop-blur-sm">
        <div className="mx-auto flex max-w-6xl items-center justify-center gap-8 px-4 py-4 text-[0.72rem] font-semibold uppercase tracking-[0.3em] text-white/78 sm:gap-14 sm:text-xs">
          <button
            type="button"
            onClick={() => scrollToSection("home")}
            className="transition-colors duration-300 hover:text-white"
          >
            HOME
          </button>
          <button
            type="button"
            onClick={() => scrollToSection("project")}
            className="transition-colors duration-300 hover:text-white"
          >
            PROJECTS
          </button>
          <button
            type="button"
            onClick={() => scrollToSection("about")}
            className="transition-colors duration-300 hover:text-white"
          >
            ABOUT
          </button>
        </div>
      </header>

      <main className="relative z-10 mx-auto w-full max-w-6xl px-4 pb-20 pt-20 sm:px-6 lg:px-8">
        <motion.section
          ref={homeRef}
          id="home"
          className="flex min-h-[90vh] flex-col items-center justify-center text-center"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ type: "spring", stiffness: 85, damping: 16 }}
        >
          <h1 className="max-w-4xl text-[2.2rem] font-semibold leading-[1.08] tracking-[-0.02em] sm:text-6xl md:text-7xl lg:text-8xl">
            Crafting calm, powerful digital systems.
          </h1>

          <p className="mt-9 max-w-2xl text-base leading-8 text-[#F9FAF8]/72 sm:text-lg">
            Senior full-stack engineer focused on architecture, usability, and
            motion that feels intentional rather than decorative.
          </p>

          <button
            type="button"
            onClick={() => scrollToSection("project")}
            className="mt-11 inline-flex w-fit self-center rounded-full border border-white px-8 py-3 text-sm font-medium uppercase tracking-[0.14em] opacity-90 transition-opacity duration-300 hover:opacity-100"
          >
            Explore Projects
          </button>

          <motion.button
            type="button"
            onClick={() => scrollToSection("project")}
            aria-label="Scroll to projects"
            className="mt-6 inline-flex items-center justify-center text-2xl text-white/45 transition-colors duration-300 hover:text-white/85"
            animate={{ y: [0, 6, 0] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
          >
            ↓
          </motion.button>
        </motion.section>

        <motion.section
          ref={projectRef}
          id="projects"
          {...sectionReveal}
          className="min-h-[80vh] scroll-mt-[96px] pt-8 pb-14 sm:pt-10 sm:pb-18 lg:pt-12"
        >
          <div className="mx-auto w-full max-w-5xl">
            <div className="mb-12 text-center sm:mb-16">
              <h2 className="text-4xl font-semibold tracking-[-0.02em] sm:text-5xl md:text-6xl">
                Selected Projects
              </h2>
              <p className="mx-auto mt-6 max-w-2xl text-base leading-8 text-[#F9FAF8]/68 sm:text-lg">
                Focused product work built with precision engineering, calm
                interfaces, and measurable outcomes.
              </p>
            </div>

            <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
              {[
                {
                  title: "Project Alpha",
                  desc: "Performance-first product platform with modular frontend architecture and reliable delivery workflows.",
                  tags: ["Next.js", "TypeScript", "Tailwind"],
                  span: "md:col-span-2",
                },
                {
                  title: "Project Beta",
                  desc: "Data-rich interface system optimized for clarity under complexity with progressive disclosure patterns.",
                  tags: ["React", "Motion", "Accessibility"],
                  span: "",
                },
                {
                  title: "Project Gamma",
                  desc: "Design-engineering bridge from prototyping to production while preserving consistency and speed.",
                  tags: ["Design Systems", "SSR", "DX"],
                  span: "",
                },
              ].map((project) => (
                <motion.article
                  key={project.title}
                  whileHover={{ y: -3 }}
                  transition={{ type: "spring", stiffness: 240, damping: 20 }}
                  className={`rounded-3xl border border-neutral-800 bg-black/70 p-6 sm:p-8 ${project.span}`}
                >
                  <h3 className="text-2xl font-semibold tracking-[-0.01em] sm:text-3xl">
                    {project.title}
                  </h3>
                  <p className="mt-4 text-sm leading-7 text-[#F9FAF8]/72 sm:text-base sm:leading-8">
                    {project.desc}
                  </p>
                  <div className="mt-6 flex flex-wrap gap-2">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full border border-neutral-700 px-3 py-1 text-xs uppercase tracking-[0.12em] text-white/75"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </motion.article>
              ))}
            </div>
          </div>
        </motion.section>

        <motion.section
          ref={aboutRef}
          id="philosophy"
          {...sectionReveal}
          className="flex min-h-[78vh] scroll-mt-[96px] items-center py-8 sm:py-10"
        >
          <div className="max-w-4xl">
            <h2 className="text-4xl font-semibold tracking-[-0.02em] sm:text-5xl md:text-6xl">
              Deep dive into my philosophy...
            </h2>
            <p className="mt-8 text-base leading-8 text-[#F9FAF8]/70 sm:text-lg">
              I build products where engineering quality and visual restraint
              reinforce each other. Every motion, layer, and API decision exists
              to improve confidence, comprehension, and long-term maintainability.
            </p>
          </div>
        </motion.section>

        <motion.footer
          id="contact"
          {...sectionReveal}
          className="border-t border-white/10 py-8 sm:py-10"
        >
          <div className="mx-auto flex max-w-5xl flex-wrap items-center justify-center gap-x-4 gap-y-2 text-xs tracking-[0.08em] text-neutral-500">
            <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2">
              {[
                ["GitHub", "https://github.com/kwaqtech"],
                ["LinkedIn", "https://www.linkedin.com/in/minh-quang-cao-37b223333/"],
                ["Instagram", "https://www.instagram.com/_kwaqq/"],
                [
                  "Email",
                  "https://mail.google.com/mail/?view=cm&fs=1&to=caomq12062004%40gmail.com&su=Lien%20he%20tu%20Portfolio&body=Xin%20chao%20Quang%2C%0A%0AToi%20muon%20trao%20doi%20ve%20du%20an.%0A%0ATen%3A%20%0ACong%20ty%3A%20%0ASDT%3A%20%0ANoi%20dung%3A%20",
                ],
                ["Phone", "tel:+840896643973"],
              ].map(([label, href]) => (
                <a
                  key={label}
                  href={href}
                  target={href.startsWith("http") ? "_blank" : undefined}
                  rel={href.startsWith("http") ? "noreferrer noopener" : undefined}
                  aria-label={label}
                  title={label}
                  className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-white/10 transition-colors duration-300 hover:text-neutral-300"
                >
                  {renderSocialIcon(label)}
                  <span className="sr-only">{label}</span>
                </a>
              ))}
            </div>
          </div>
        </motion.footer>
      </main>
    </div>
  );
}
