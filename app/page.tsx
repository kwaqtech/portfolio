"use client";

import { motion } from "framer-motion";
import { ExternalLink, GitBranch, Menu, X, CircleDot } from "lucide-react";
import { type KeyboardEvent, useRef, useState, useEffect } from "react";

const sectionReveal = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.15 },
  transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] },
};

type Project = {
  title: string;
  desc: string;
  tags: string[];
  githubUrl: string;
  liveUrl: string;
};

const projects: Project[] = [
  {
    title: "Presist",
    desc: "Presist is an innovative presentation support tool designed to empower speakers by bridging the gap between static slides and dynamic delivery. Unlike traditional slideshow software, Presist focuses on the presenter's performance rather than just the visual aids.",
    tags: ["Next.js", "TypeScript", "Tailwind"],
    githubUrl: "https://tmkamal.github.io/under-construction-template/",
    liveUrl: "https://presist.app/",
  },
  {
    title: "Xom Connect",
    desc: "Xom Connect is a mobile-first social platform designed to bring neighbors together. Whether you're looking to borrow a ladder, give away extra fruit from your garden, or need urgent SOS assistance, Xom Connect prioritizes what is happening near you over global noise.",
    tags: ["React", "TypeScript", "CSS", "PLpgSQL", "Javascript"],
    githubUrl: "https://github.com/kwaqtech/xom-connect",
    liveUrl: "https://tmkamal.github.io/under-construction-template/",
  },
  {
    title: "Price Guard",
    desc: "PriceGuard is a powerful Chrome Extension and API backend that takes the guesswork out of online shopping. It automatically detects products on major Vietnamese marketplaces and shows you the best deals across the web in real-time.",
    tags: ["TypeScript", "Manifest V3"],
    githubUrl: "https://github.com/kwaqtech/PriceGuard",
    liveUrl: "https://tmkamal.github.io/under-construction-template/",
  },
];

type HeaderToggleProps = {
  label: string;
  checked: boolean;
  onToggle: () => void;
};

function HeaderToggle({ label, checked, onToggle }: HeaderToggleProps) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      aria-label={label}
      onClick={onToggle}
      className="inline-flex min-h-[44px] sm:min-h-10 items-center gap-2 rounded-none border border-[color:var(--ui-border)] bg-transparent px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.1em] text-[color:var(--ui-text)] transition-colors duration-200 hover:bg-[color:var(--ui-toggle-bg)]"
    >
      <span>{label}</span>
      <span
        className={`relative inline-flex h-4 w-8 items-center rounded-full transition-colors duration-200 ${
          checked ? "bg-[color:var(--ui-accent)]" : "bg-[color:var(--ui-border-strong)]"
        }`}
      >
        <span
          className={`h-3 w-3 rounded-full bg-white transition-transform duration-200 ${
            checked ? "translate-x-4" : "translate-x-0.5"
          }`}
        />
      </span>
    </button>
  );
}

export default function Home() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(() => {
    if (typeof window === "undefined") return true;
    return window.localStorage.getItem("theme-mode") !== "light";
  });
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const homeRef = useRef<HTMLElement | null>(null);
  const projectRef = useRef<HTMLElement | null>(null);
  const aboutRef = useRef<HTMLElement | null>(null);
  const headerOffset = 60;

  const toggleTheme = () => {
    setIsDarkMode((prev) => {
      const next = !prev;
      window.localStorage.setItem("theme-mode", next ? "dark" : "light");
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
    setIsMobileMenuOpen(false);
    const map = { home: homeRef, project: projectRef, about: aboutRef };
    const target = map[section].current;
    if (!target) return;
    const offsetTop = target.getBoundingClientRect().top + window.scrollY - headerOffset;
    window.scrollTo({ top: Math.max(offsetTop, 0), behavior: "smooth" });
  };

  const renderSocialIcon = (label: string) => {
    const iconClass = "h-4 w-4 fill-current";
    if (label === "GitHub") return (
        <svg viewBox="0 0 24 24" aria-hidden className={iconClass}>
          <path d="M12 .5a12 12 0 0 0-3.79 23.39c.6.11.82-.26.82-.58v-2.17c-3.34.73-4.04-1.41-4.04-1.41-.55-1.37-1.33-1.74-1.33-1.74-1.09-.73.08-.72.08-.72 1.2.09 1.84 1.22 1.84 1.22 1.07 1.83 2.8 1.3 3.48 1 .11-.77.42-1.3.76-1.6-2.67-.3-5.47-1.31-5.47-5.86 0-1.3.47-2.37 1.24-3.2-.13-.3-.54-1.53.12-3.18 0 0 1.01-.32 3.3 1.22a11.53 11.53 0 0 1 6 0c2.29-1.54 3.3-1.22 3.3-1.22.66 1.65.25 2.88.12 3.18.77.83 1.24 1.9 1.24 3.2 0 4.56-2.8 5.56-5.48 5.86.43.37.81 1.1.81 2.22v3.3c0 .32.22.7.83.58A12 12 0 0 0 12 .5Z" />
        </svg>
    );
    if (label === "LinkedIn") return (
        <svg viewBox="0 0 24 24" aria-hidden className={iconClass}>
          <path d="M5.03 3.5A1.53 1.53 0 1 1 5 6.56a1.53 1.53 0 0 1 .03-3.06ZM3.7 8h2.63v12H3.7V8Zm6.14 0h2.52v1.64h.04c.35-.66 1.2-1.36 2.47-1.36 2.64 0 3.13 1.74 3.13 4v7.72h-2.63v-6.84c0-1.64-.03-3.75-2.28-3.75-2.28 0-2.63 1.78-2.63 3.63V20H9.84V8Z" />
        </svg>
    );
    if (label === "Instagram") return (
        <svg viewBox="0 0 24 24" aria-hidden className={iconClass}>
          <path d="M7.5 2h9A5.5 5.5 0 0 1 22 7.5v9a5.5 5.5 0 0 1-5.5 5.5h-9A5.5 5.5 0 0 1 2 16.5v-9A5.5 5.5 0 0 1 7.5 2Zm0 1.8A3.7 3.7 0 0 0 3.8 7.5v9a3.7 3.7 0 0 0 3.7 3.7h9a3.7 3.7 0 0 0 3.7-3.7v-9a3.7 3.7 0 0 0-3.7-3.7h-9Zm9.6 1.35a1.2 1.2 0 1 1 0 2.4 1.2 1.2 0 0 1 0-2.4ZM12 7a5 5 0 1 1 0 10 5 5 0 0 1 0-10Zm0 1.8a3.2 3.2 0 1 0 0 6.4 3.2 3.2 0 0 0 0-6.4Z" />
        </svg>
    );
    if (label === "Email") return (
        <svg viewBox="0 0 24 24" aria-hidden className={iconClass}>
          <path d="M3 6.75A2.75 2.75 0 0 1 5.75 4h12.5A2.75 2.75 0 0 1 21 6.75v10.5A2.75 2.75 0 0 1 18.25 20H5.75A2.75 2.75 0 0 1 3 17.25V6.75Zm2 .17v.12l7 4.63 7-4.63v-.12a.75.75 0 0 0-.75-.75H5.75a.75.75 0 0 0-.75.75Zm14 2.53-6.45 4.27a1 1 0 0 1-1.1 0L5 9.45v7.8c0 .41.34.75.75.75h12.5c.41 0 .75-.34.75-.75v-7.8Z" />
        </svg>
    );
    if (label === "Phone") return (
        <svg viewBox="0 0 24 24" aria-hidden className={iconClass}>
          <path d="M6.62 2.75A2 2 0 0 1 8.4 2h2.03a1 1 0 0 1 1 .84l.46 3.2a1 1 0 0 1-.29.86L9.9 8.6a13.02 13.02 0 0 0 5.5 5.5l1.7-1.7a1 1 0 0 1 .86-.29l3.2.46a1 1 0 0 1 .84 1v2.03a2 2 0 0 1-.75 1.57l-1.14.9a3.5 3.5 0 0 1-3.11.57 18.5 18.5 0 0 1-11.64-11.64 3.5 3.5 0 0 1 .57-3.11l.9-1.14Z" />
        </svg>
    );
    return null;
  };

  // Prevent hydration mismatch
  if (!mounted) return <div className="min-h-screen bg-black" />;

  return (
    <div className={`relative isolate min-h-screen overflow-x-hidden font-mono text-[color:var(--ui-text)] transition-colors duration-300 ${isDarkMode ? "theme-dark" : "theme-light"}`}>
      
      {/* Decorative Viewfinder Corners */}
      <div className="pointer-events-none fixed left-4 top-4 z-50 h-8 w-8 border-l-2 border-t-2 border-[color:var(--ui-border-strong)] sm:left-8 sm:top-8" />
      <div className="pointer-events-none fixed right-4 top-4 z-50 h-8 w-8 border-r-2 border-t-2 border-[color:var(--ui-border-strong)] sm:right-8 sm:top-8" />
      <div className="pointer-events-none fixed bottom-4 left-4 z-50 h-8 w-8 border-b-2 border-l-2 border-[color:var(--ui-border-strong)] sm:bottom-8 sm:left-8" />
      <div className="pointer-events-none fixed bottom-4 right-4 z-50 h-8 w-8 border-b-2 border-r-2 border-[color:var(--ui-border-strong)] sm:bottom-8 sm:right-8" />

      {/* Crosshairs */}
      <div className="crosshair fixed left-1/2 top-4 z-50 -translate-x-1/2 opacity-30 sm:top-8" />
      <div className="crosshair fixed bottom-4 left-1/2 z-50 -translate-x-1/2 opacity-30 sm:bottom-8" />
      <div className="crosshair fixed left-4 top-1/2 z-50 -translate-y-1/2 opacity-30 sm:left-8" />
      <div className="crosshair fixed right-4 top-1/2 z-50 -translate-y-1/2 opacity-30 sm:right-8" />

      <header className="fixed top-0 z-40 w-full border-b border-[color:var(--ui-border)] bg-[color:var(--page-bg)]/80 backdrop-blur-md">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 sm:px-8">
          <div className="flex items-center gap-6">
            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[color:var(--ui-accent)]">REC</span>
            <button
              type="button"
              onClick={() => setIsMobileMenuOpen((prev) => !prev)}
              aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
              aria-expanded={isMobileMenuOpen}
              className="inline-flex min-h-[44px] min-w-[44px] items-center justify-center border border-[color:var(--ui-border)] text-[color:var(--ui-text)] sm:hidden"
            >
              {isMobileMenuOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
            </button>
            <nav className="hidden items-center gap-8 text-[11px] font-semibold uppercase tracking-[0.15em] sm:flex">
              <button type="button" onClick={() => scrollToSection("home")} className="hover:text-[color:var(--ui-accent)] transition-colors">ISO/Home</button>
              <button type="button" onClick={() => scrollToSection("project")} className="hover:text-[color:var(--ui-accent)] transition-colors">F/Projects</button>
              <button type="button" onClick={() => scrollToSection("about")} className="hover:text-[color:var(--ui-accent)] transition-colors">EV/About</button>
            </nav>
          </div>
          
          <div className="flex items-center">
            <HeaderToggle label={isDarkMode ? "DARK" : "LIGHT"} checked={isDarkMode} onToggle={toggleTheme} />
          </div>
        </div>

        {isMobileMenuOpen && (
          <div className="border-t border-[color:var(--ui-border)] bg-[color:var(--page-bg)] px-4 py-4 sm:hidden">
            <nav className="flex flex-col gap-2">
              <button type="button" onClick={() => scrollToSection("home")} className="min-h-[44px] border border-[color:var(--ui-border)] px-4 text-left text-xs font-semibold tracking-[0.15em] hover:bg-[color:var(--ui-toggle-bg)]">ISO/HOME</button>
              <button type="button" onClick={() => scrollToSection("project")} className="min-h-[44px] border border-[color:var(--ui-border)] px-4 text-left text-xs font-semibold tracking-[0.15em] hover:bg-[color:var(--ui-toggle-bg)]">F/PROJECTS</button>
              <button type="button" onClick={() => scrollToSection("about")} className="min-h-[44px] border border-[color:var(--ui-border)] px-4 text-left text-xs font-semibold tracking-[0.15em] hover:bg-[color:var(--ui-toggle-bg)]">EV/ABOUT</button>
            </nav>
          </div>
        )}
      </header>

      <main className="relative z-10 mx-auto w-full max-w-6xl px-4 pb-20 pt-28 sm:px-8 sm:pt-32">
        <motion.section
          ref={homeRef}
          id="home"
          className="flex min-h-[75vh] flex-col justify-center border-l border-r border-[color:var(--ui-border)] px-4 sm:px-12 relative viewfinder-grid"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          {/* Metadata UI markings */}
          <div className="absolute left-4 top-4 text-[10px] tracking-widest text-[color:var(--ui-muted)] sm:left-12 sm:top-12">
            <div>AWB: AUTO</div>
            <div>SHUTTER: 1/125</div>
          </div>
          
          <div className="absolute right-4 top-4 text-[10px] tracking-widest text-[color:var(--ui-muted)] text-right sm:right-12 sm:top-12">
            <div>RAW+JPEG</div>
            <div>[ 9999 ]</div>
          </div>

          <h1 className="font-serif text-5xl font-medium leading-[1.1] tracking-tight sm:text-7xl md:text-8xl mt-12">
            Don&apos;t sweat the BUGS
            <br />
            <span className="text-[color:var(--ui-muted)]">— it happens.</span>
          </h1>

          <div className="mt-8 flex flex-col gap-8 sm:mt-12 sm:flex-row sm:items-end sm:justify-between">
            <p className="max-w-xl text-sm leading-relaxed text-[color:var(--ui-soft)] sm:text-base">
              Welcome to the portfolio. Focusing in on clean logic, solid architecture, and a dash of creative perspective.
            </p>
            <button
              type="button"
              onClick={() => scrollToSection("project")}
              className="inline-flex min-h-[44px] items-center justify-center gap-2 border border-[color:var(--ui-border-strong)] bg-transparent px-6 py-2 text-xs font-bold uppercase tracking-widest transition-colors hover:border-[color:var(--ui-accent)] hover:text-[color:var(--ui-accent)]"
            >
              <CircleDot className="h-4 w-4" /> View Projects
            </button>
          </div>
        </motion.section>

        <motion.section
          ref={projectRef}
          id="projects"
          {...sectionReveal}
          className="scroll-mt-[120px] border-l border-r border-t border-[color:var(--ui-border)] px-4 py-16 sm:px-12 sm:py-24 viewfinder-grid"
        >
          <div className="mb-12 flex items-baseline justify-between border-b border-[color:var(--ui-border)] pb-4">
            <h2 className="text-sm font-bold uppercase tracking-widest text-[color:var(--ui-muted)]">F/Projects</h2>
            <div className="text-[10px] tracking-widest text-[color:var(--ui-soft)]">LENS: 35MM</div>
          </div>

          <div className="focus-group flex flex-col gap-6">
            {projects.map((project, idx) => (
              <motion.article
                key={project.title}
                onClick={() => handleCardAction(project.liveUrl)}
                onKeyDown={(e) => handleCardKeyDown(e, project.liveUrl)}
                role="link"
                tabIndex={0}
                className="focus-item group relative flex w-full cursor-pointer flex-col justify-between border border-[color:var(--ui-border)] bg-[color:var(--ui-card-bg)] p-6 sm:flex-row sm:items-center sm:p-8"
              >
                {/* Record dot appears on hover */}
                <div className="record-dot absolute -left-1.5 top-1/2 h-3 w-3 -translate-y-1/2 rounded-full bg-[color:var(--ui-accent)] opacity-0 transition-opacity duration-300" />
                
                <div className="max-w-2xl flex-1">
                  <div className="mb-3 flex items-center gap-3">
                    <span className="text-[10px] text-[color:var(--ui-muted)]">0{idx + 1}</span>
                    <h3 className="font-serif text-3xl font-medium sm:text-4xl">{project.title}</h3>
                  </div>
                  <p className="mb-6 text-sm leading-relaxed text-[color:var(--ui-soft)] sm:mb-0">
                    {project.desc}
                  </p>
                </div>
                
                <div className="flex flex-col items-start gap-4 sm:items-end sm:pl-8">
                  <div className="flex flex-wrap gap-2 sm:justify-end">
                    {project.tags.map((tag) => (
                      <span key={tag} className="border border-[color:var(--ui-border-strong)] px-2 py-1 text-[10px] uppercase tracking-wider text-[color:var(--ui-muted)]">
                        {tag}
                      </span>
                    ))}
                  </div>
                  <div className="flex items-center gap-3">
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noreferrer noopener"
                      onClick={(e) => e.stopPropagation()}
                      className="inline-flex min-h-[44px] min-w-[44px] sm:min-h-10 sm:min-w-10 items-center justify-center border border-[color:var(--ui-border)] transition-colors hover:border-[color:var(--ui-text)] hover:text-[color:var(--ui-text)]"
                    >
                      <GitBranch strokeWidth={1.5} className="h-4 w-4" />
                    </a>
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noreferrer noopener"
                      onClick={(e) => e.stopPropagation()}
                      className="inline-flex min-h-[44px] min-w-[44px] sm:min-h-10 sm:min-w-10 items-center justify-center border border-[color:var(--ui-border)] transition-colors hover:border-[color:var(--ui-text)] hover:text-[color:var(--ui-text)]"
                    >
                      <ExternalLink strokeWidth={1.5} className="h-4 w-4" />
                    </a>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        </motion.section>

        <motion.section
          ref={aboutRef}
          id="philosophy"
          {...sectionReveal}
          className="scroll-mt-[120px] border border-[color:var(--ui-border)] px-4 py-16 sm:px-12 sm:py-24 viewfinder-grid"
        >
          <div className="mb-12 flex items-baseline justify-between border-b border-[color:var(--ui-border)] pb-4">
            <h2 className="text-sm font-bold uppercase tracking-widest text-[color:var(--ui-muted)]">EV/About</h2>
            <div className="text-[10px] tracking-widest text-[color:var(--ui-soft)]">AF-C MODE</div>
          </div>

          <div className="mx-auto max-w-4xl">
            <h2 className="font-serif text-3xl font-medium sm:text-5xl md:text-6xl mb-8">
              I&apos;m very grateful that you came here.
            </h2>
            
            <div className="space-y-6 font-serif text-lg leading-relaxed text-[color:var(--ui-soft)] sm:text-xl">
              <p className="font-mono text-xs font-bold uppercase tracking-widest text-[color:var(--ui-text)]">
                Software Developer | Creative Explorer | Community Enthusiast
              </p>
              <p>
                I am a Computer Science graduate from FPT University, where I developed a versatile coding palette in C, C#, Java, and more, alongside essential soft skills like effective communication and critical thinking.
              </p>
              <p>
                My journey spans from building robust software solutions at BrightBrain Vietnam to navigating the high-stakes world of financial consulting at Manulife. This diverse experience helps me bridge complex logic with user-centric design.
              </p>
            </div>
            
            <div className="mt-12 border-t border-[color:var(--ui-border)] pt-8">
              <p className="font-mono text-[10px] uppercase tracking-widest text-[color:var(--ui-muted)] mb-4">Focus Points</p>
              <ul className="grid grid-cols-1 gap-6 sm:grid-cols-3">
                <li className="border border-[color:var(--ui-border)] p-4">
                  <span className="mb-2 block font-bold text-[color:var(--ui-text)]">Proactive Learner</span>
                  <span className="text-xs text-[color:var(--ui-soft)]">Participated in projects of many scales, from early prototypes to production-ready products.</span>
                </li>
                <li className="border border-[color:var(--ui-border)] p-4">
                  <span className="mb-2 block font-bold text-[color:var(--ui-text)]">Creative Soul</span>
                  <span className="text-xs text-[color:var(--ui-soft)]">Passionate about photography, video editing, and outdoor community activities.</span>
                </li>
                <li className="border border-[color:var(--ui-border)] p-4">
                  <span className="mb-2 block font-bold text-[color:var(--ui-text)]">Problem Solver</span>
                  <span className="text-xs text-[color:var(--ui-soft)]">Dedicated to refining "good" into "great" by embracing feedback and new technologies.</span>
                </li>
              </ul>
            </div>
            
            <div className="mt-12 text-sm text-[color:var(--ui-soft)]">
              Looking for a dedicated partner for your next venture? Let&apos;s connect via the footer.
            </div>
          </div>
        </motion.section>

        <motion.footer
          id="contact"
          {...sectionReveal}
          className="mt-8 border border-[color:var(--ui-border)] px-4 py-8 sm:px-12 sm:py-12 viewfinder-grid text-center"
        >
          <div className="mb-6 text-[10px] tracking-widest text-[color:var(--ui-muted)] uppercase">OUTPUT DECK</div>
          <div className="flex flex-wrap items-center justify-center gap-4">
            {[
              ["GitHub", "https://github.com/kwaqtech"],
              ["LinkedIn", "https://www.linkedin.com/in/minh-quang-cao-37b223333/"],
              ["Instagram", "https://www.instagram.com/_kwaqq/"],
              ["Email", "https://mail.google.com/mail/?view=cm&fs=1&to=caomq12062004%40gmail.com"],
              ["Phone", "tel:+840896643973"],
            ].map(([label, href]) => (
              <a
                key={label}
                href={href}
                target={href.startsWith("http") ? "_blank" : undefined}
                rel={href.startsWith("http") ? "noreferrer noopener" : undefined}
                aria-label={label}
                title={label}
                className="inline-flex min-h-[44px] min-w-[44px] items-center justify-center border border-[color:var(--ui-border)] transition-colors hover:border-[color:var(--ui-accent)] hover:text-[color:var(--ui-accent)]"
              >
                {renderSocialIcon(label)}
              </a>
            ))}
          </div>
        </motion.footer>
      </main>
    </div>
  );
}
