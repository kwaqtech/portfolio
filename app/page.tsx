"use client";

import { motion } from "framer-motion";
import { ExternalLink, GitBranch } from "lucide-react";
import { type CSSProperties, type KeyboardEvent, useRef, useState } from "react";

const sectionReveal = {
  initial: { opacity: 0, y: 28 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.25 },
  transition: { type: "spring" as const, stiffness: 90, damping: 18 },
};

type StarSeed = {
  id: number;
  x: number;
  y: number;
  size: number;
  opacity: number;
  twinkleDuration: number;
  twinkleDelay: number;
  driftDuration: number;
  driftDelay: number;
  driftX: number;
  driftY: number;
};

type Project = {
  title: string;
  desc: string;
  tags: string[];
  githubUrl: string;
  liveUrl: string;
  span: string;
};

type HeaderToggleProps = {
  label: string;
  checked: boolean;
  onToggle: () => void;
};

const projects: Project[] = [
  {
    title: "Presist",
    desc: "Presist is an innovative presentation support tool designed to empower speakers by bridging the gap between static slides and dynamic delivery. Unlike traditional slideshow software, Presist focuses on the presenter's performance rather than just the visual aids.",
    tags: ["Next.js", "TypeScript", "Tailwind"],
    githubUrl: "https://tmkamal.github.io/under-construction-template/",
    liveUrl: "https://presist.app/",
    span: "md:col-span-2",
  },
  {
    title: "Xom Connect",
    desc: "Xom Connect is a mobile-first social platform designed to bring neighbors together. Whether you're looking to borrow a ladder, give away extra fruit from your garden, or need urgent SOS assistance, Xom Connect prioritizes what is happening near you over global noise.",
    tags: ["React", "TypeScript", "CSS", "PLpgSQL", "Javascript"],
    githubUrl: "https://github.com/kwaqtech/xom-connect",
    liveUrl: "https://tmkamal.github.io/under-construction-template/",
    span: "",
  },
  {
    title: "Price Guard",
    desc: "PriceGuard is a powerful Chrome Extension and API backend that takes the guesswork out of online shopping. It automatically detects products on major Vietnamese marketplaces and shows you the best deals across the web in real-time.",
    tags: ["TypeScript", "Manifest V3"],
    githubUrl: "https://github.com/kwaqtech/PriceGuard",
    liveUrl: "https://tmkamal.github.io/under-construction-template/",
    span: "",
  },
];

const seededRandom = (seed: number) => {
  const value = Math.sin(seed * 9973.135) * 43758.5453;
  return value - Math.floor(value);
};

const round = (value: number, digits = 4) => Number(value.toFixed(digits));

const stars: StarSeed[] = Array.from({ length: 90 }, (_, i) => {
  const x = round(seededRandom(i + 1) * 100);
  const y = round(seededRandom(i + 11) * 100);
  const size = round(0.8 + seededRandom(i + 21) * 2, 6);
  const opacity = round(0.25 + seededRandom(i + 31) * 0.55, 6);
  const twinkleDuration = round((2.5 + seededRandom(i + 41) * 2.5) / 6, 6);
  const twinkleDelay = round(seededRandom(i + 51) * 5, 6);
  const driftDuration = round((16 + seededRandom(i + 61) * 10) / 6, 6);
  const driftDelay = round(seededRandom(i + 71) * 10, 6);
  const driftX = round(-10 + seededRandom(i + 81) * 20, 6);
  const driftY = round(-8 + seededRandom(i + 91) * 16, 6);

  return {
    id: i,
    x,
    y,
    size,
    opacity,
    twinkleDuration,
    twinkleDelay,
    driftDuration,
    driftDelay,
    driftX,
    driftY,
  };
});

function HeaderToggle({ label, checked, onToggle }: HeaderToggleProps) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      aria-label={label}
      onClick={onToggle}
      className="inline-flex items-center gap-1.5 rounded-full border border-[color:var(--ui-toggle-border)] bg-[color:var(--ui-toggle-bg)] px-1.5 py-0.5 text-[9px] font-semibold uppercase tracking-[0.1em] text-[color:var(--ui-text)] transition-colors duration-200 hover:bg-[color:var(--ui-toggle-bg-hover)]"
    >
      <span>{label}</span>
      <span
        className={`relative inline-flex h-4 w-7 items-center rounded-full transition-colors duration-200 ${checked ? "bg-[color:var(--ui-toggle-on)]" : "bg-[color:var(--ui-toggle-off)]"
          }`}
      >
        <span
          className={`h-3 w-3 rounded-full bg-[color:var(--ui-toggle-thumb)] shadow-sm transition-transform duration-200 ${checked ? "translate-x-3.5" : "translate-x-0.5"
            }`}
        />
      </span>
    </button>
  );
}

export default function Home() {
  const [isDarkMode, setIsDarkMode] = useState(() => {
    if (typeof window === "undefined") {
      return true;
    }
    return window.localStorage.getItem("theme-mode") !== "light";
  });
  const [isStarAnimationOn, setIsStarAnimationOn] = useState(() => {
    if (typeof window === "undefined") {
      return true;
    }
    return window.localStorage.getItem("stars-enabled") !== "false";
  });
  const homeRef = useRef<HTMLElement | null>(null);
  const projectRef = useRef<HTMLElement | null>(null);
  const aboutRef = useRef<HTMLElement | null>(null);
  const headerOffset = 30;

  const toggleTheme = () => {
    setIsDarkMode((prev) => {
      const next = !prev;
      window.localStorage.setItem("theme-mode", next ? "dark" : "light");
      return next;
    });
  };

  const toggleStars = () => {
    setIsStarAnimationOn((prev) => {
      const next = !prev;
      window.localStorage.setItem("stars-enabled", `${next}`);
      return next;
    });
  };

  const handleCardAction = (url: string) => {
    window.open(url, "_blank", "noopener,noreferrer");
  };

  const handleCardKeyDown = (e: KeyboardEvent<HTMLElement>, url: string) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      handleCardAction(url);
    }
  };

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
    <div
      className={`relative isolate min-h-screen overflow-x-hidden bg-[color:var(--page-bg)] text-[color:var(--ui-text)] ${isDarkMode ? "theme-dark" : "theme-light"
        }`}
    >
      {isStarAnimationOn && (
        <div
          className={`starfield pointer-events-none fixed inset-0 -z-10 overflow-hidden ${isDarkMode ? "starfield--dark" : "starfield--light"
            }`}
          aria-hidden
        >
          <div className="starfield__nebula" />
          {stars.map((star) => (
            <span
              key={star.id}
              className="starfield__star"
              style={
                {
                  left: `${star.x}%`,
                  top: `${star.y}%`,
                  width: `${star.size}px`,
                  height: `${star.size}px`,
                  ["--star-opacity" as string]: `${star.opacity}`,
                  ["--drift-x" as string]: `${star.driftX}px`,
                  ["--drift-y" as string]: `${star.driftY}px`,
                  ["--twinkle-duration" as string]: `${star.twinkleDuration}s`,
                  ["--twinkle-delay" as string]: `${star.twinkleDelay}s`,
                  ["--drift-duration" as string]: `${star.driftDuration}s`,
                  ["--drift-delay" as string]: `${star.driftDelay}s`,
                } as CSSProperties
              }
            />
          ))}
        </div>
      )}

      <header className="fixed top-0 z-[90] w-full border-b border-[color:var(--ui-header-border)] bg-[color:var(--ui-header-bg)] backdrop-blur-sm">
        <div className="relative mx-auto flex max-w-6xl items-center justify-center px-4 py-3 text-[0.72rem] font-semibold uppercase tracking-[0.3em] text-[color:var(--ui-muted)] sm:text-xs">
          <div className="flex items-center gap-5 sm:gap-10">
            <button
              type="button"
              onClick={() => scrollToSection("home")}
              className="transition-colors duration-300 hover:text-[color:var(--ui-text)]"
            >
              HOME
            </button>
            <button
              type="button"
              onClick={() => scrollToSection("project")}
              className="transition-colors duration-300 hover:text-[color:var(--ui-text)]"
            >
              PROJECTS
            </button>
            <button
              type="button"
              onClick={() => scrollToSection("about")}
              className="transition-colors duration-300 hover:text-[color:var(--ui-text)]"
            >
              ABOUT
            </button>
          </div>

          <div className="absolute right-4 flex items-center gap-1.5">
            <HeaderToggle
              label={isDarkMode ? "Dark" : "Light"}
              checked={isDarkMode}
              onToggle={toggleTheme}
            />
            <HeaderToggle
              label="Stars"
              checked={isStarAnimationOn}
              onToggle={toggleStars}
            />
          </div>
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
            Don&apos;t sweat the BUGS — it happens to the best of us.
          </h1>

          <p className="mt-9 max-w-2xl text-base leading-8 text-[color:var(--ui-soft)] sm:text-lg">
            Welcome to Kwaq website! I hope you find exactly what you&apos;re looking for here —
            or even if you’re just stopping by...
          </p>

          <button
            type="button"
            onClick={() => scrollToSection("project")}
            className="mt-11 inline-flex w-fit self-center rounded-full border border-[color:var(--ui-border-strong)] px-8 py-3 text-sm font-medium uppercase tracking-[0.14em] opacity-90 transition-opacity duration-300 hover:opacity-100"
          >
            Explore More
          </button>

          <motion.button
            type="button"
            onClick={() => scrollToSection("project")}
            aria-label="Scroll to projects"
            className="mt-6 inline-flex items-center justify-center text-2xl text-[color:var(--ui-arrow)] transition-colors duration-300 hover:text-[color:var(--ui-text)]"
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
                Projects
              </h2>
              <p className="mx-auto mt-6 max-w-2xl text-base leading-8 text-[color:var(--ui-soft)] sm:text-lg">
                Let me introduce you to some of the projects I’ve been a part of,
                feel free to check out y&apos;all !
              </p>
            </div>

            <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
              {projects.map((project) => (
                <motion.article
                  key={project.title}
                  whileHover={{ y: -3 }}
                  transition={{ type: "spring", stiffness: 240, damping: 20 }}
                  onClick={() => handleCardAction(project.liveUrl)}
                  onKeyDown={(e) => handleCardKeyDown(e, project.liveUrl)}
                  role="link"
                  tabIndex={0}
                  aria-label={`${project.title} live demo`}
                  title="Open the website"
                  className={`group relative rounded-3xl border border-[color:var(--ui-card-border)] bg-[color:var(--ui-card-bg)] p-6 pr-20 transition-colors duration-300 hover:border-[color:var(--ui-card-border-hover)] sm:p-8 sm:pr-24 cursor-pointer ${project.span}`}
                >
                  <div className="absolute right-6 top-6 flex items-center gap-2 sm:right-8 sm:top-8">
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noreferrer noopener"
                      onClick={(e) => e.stopPropagation()}
                      aria-label={`${project.title} GitHub repository`}
                      className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-[color:var(--ui-chip-border)] text-[color:var(--ui-icon-muted)] transition-colors duration-300 hover:text-[color:var(--ui-icon-hover)] focus-visible:text-[color:var(--ui-icon-hover)] group-hover:text-[color:var(--ui-icon-hover)]"
                    >
                      <GitBranch strokeWidth={1.5} className="h-4 w-4" aria-hidden />
                    </a>
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noreferrer noopener"
                      onClick={(e) => e.stopPropagation()}
                      aria-label={`${project.title} live demo`}
                      className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-[color:var(--ui-chip-border)] text-[color:var(--ui-icon-muted)] transition-colors duration-300 hover:text-[color:var(--ui-icon-hover)] focus-visible:text-[color:var(--ui-icon-hover)] group-hover:text-[color:var(--ui-icon-hover)]"
                    >
                      <ExternalLink strokeWidth={1.5} className="h-4 w-4" aria-hidden />
                    </a>
                  </div>
                  <h3 className="text-2xl font-semibold tracking-[-0.01em] sm:text-3xl">
                    {project.title}
                  </h3>
                  <p className="mt-4 text-sm leading-7 text-[color:var(--ui-soft)] sm:text-base sm:leading-8">
                    {project.desc}
                  </p>
                  <div className="mt-6 flex flex-wrap gap-2">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full border border-[color:var(--ui-chip-border)] px-3 py-1 text-xs uppercase tracking-[0.12em] text-[color:var(--ui-muted)]"
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
              I'm very grateful that you came here !
            </h2>
            <p className="mt-8 text-base leading-8 text-[color:var(--ui-soft)] sm:text-lg">
              Software Developer | Creative Explorer | Community Enthusiast
            </p>
            <p className="mt-8 text-base leading-8 text-[color:var(--ui-soft)] sm:text-lg">
              I am a Computer Science graduate from FPT University, where I developed
              a versatile coding palette in C, C#, Java, and more, alongside essential
              soft skills like effective communication and critical thinking.
            </p>
            <p className="mt-8 text-base leading-8 text-[color:var(--ui-soft)] sm:text-lg">
              My journey spans from building robust software solutions at BrightBrain
              Vietnam to navigating the high-stakes world of financial consulting at
              Manulife. This diverse experience helps me bridge complex logic with
              user-centric design.
            </p>
            <p className="mt-8 text-base leading-8 text-[color:var(--ui-soft)] sm:text-lg">What defines me:</p>
            <ul className="mt-4 space-y-4 text-base leading-8 text-[color:var(--ui-soft)] sm:text-lg">
              <li>
                <span className="font-semibold text-[color:var(--ui-text)]">Proactive Learner:</span> I have
                participated in projects of many scales, from early prototypes to
                production-ready products.
              </li>
              <li>
                <span className="font-semibold text-[color:var(--ui-text)]">Creative Soul:</span> I am
                passionate about photography, video editing, and outdoor community
                activities.
              </li>
              <li>
                <span className="font-semibold text-[color:var(--ui-text)]">Problem Solver:</span> I am
                dedicated to refining "good" into "great" by embracing feedback and
                new technologies.
              </li>
            </ul>
            <p className="mt-8 text-base leading-8 text-[color:var(--ui-soft)] sm:text-lg">
              Looking for a dedicated partner for your next venture? Let&apos;s connect via
              the footer. For a full professional breakdown, feel free to visit my
              LinkedIn.
            </p>
          </div>
        </motion.section>

        <motion.footer
          id="contact"
          {...sectionReveal}
          className="border-t border-[color:var(--ui-footer-border)] py-8 sm:py-10"
        >
          <div className="mx-auto flex max-w-5xl flex-wrap items-center justify-center gap-x-4 gap-y-2 text-xs tracking-[0.08em] text-[color:var(--ui-footer-text)]">
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
                  className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-[color:var(--ui-footer-border)] transition-colors duration-300 hover:text-[color:var(--ui-icon-hover)]"
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
