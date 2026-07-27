import { notFound } from "next/navigation";
import { projects } from "@/data/projects";
import Link from "next/link";
import { ArrowLeft, ExternalLink, GitBranch } from "lucide-react";
import { AnimatedText } from "@/components/ui/AnimatedText";

export async function generateStaticParams() {
  return projects.map((project) => ({
    slug: project.slug,
  }));
}

export default async function ProjectPage(props: { params: Promise<{ slug: string }> }) {
  const params = await props.params;
  const project = projects.find((p) => p.slug === params.slug);

  if (!project) {
    notFound();
  }

  return (
    <div className="relative mx-auto w-full max-w-5xl px-4 py-24 sm:px-8 sm:py-32">
      <Link
        href="/"
        className="group inline-flex items-center gap-2 text-sm font-semibold tracking-widest text-zinc-500 uppercase transition-colors hover:text-foreground mb-16"
      >
        <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
        Back to projects
      </Link>

      <article>
        <header className="mb-24">
          <AnimatedText
            text={project.title}
            el="h1"
            className="text-6xl md:text-8xl font-medium tracking-tighter leading-none mb-6"
          />
          <p className="text-xl md:text-2xl text-zinc-400 max-w-3xl mb-10 leading-relaxed">
            {project.oneLiner}
          </p>

          <div className="flex flex-wrap items-center gap-4">
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noreferrer noopener"
                className="inline-flex items-center gap-2 rounded-full bg-foreground text-background px-6 py-3 text-sm font-medium transition-transform hover:scale-105 active:scale-95"
              >
                View Live <ExternalLink className="h-4 w-4" />
              </a>
            )}
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noreferrer noopener"
                className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-6 py-3 text-sm font-medium transition-colors hover:bg-white/10"
              >
                Source Code <GitBranch className="h-4 w-4" />
              </a>
            )}
          </div>
        </header>

        <div className="grid grid-cols-1 gap-16 md:grid-cols-12">
          {/* Main Content */}
          <div className="md:col-span-8 space-y-16">
            <section>
              <h2 className="text-sm font-bold uppercase tracking-widest text-zinc-500 mb-6">The Problem</h2>
              <p className="text-lg leading-relaxed text-zinc-300">{project.problem}</p>
            </section>

            <section>
              <h2 className="text-sm font-bold uppercase tracking-widest text-zinc-500 mb-6">The Solution</h2>
              <p className="text-lg leading-relaxed text-zinc-300">{project.solution}</p>
            </section>

            <section>
              <h2 className="text-sm font-bold uppercase tracking-widest text-zinc-500 mb-6">Architecture & Tech</h2>
              <p className="text-lg leading-relaxed text-zinc-300">{project.architecture}</p>
            </section>

            <section>
              <h2 className="text-sm font-bold uppercase tracking-widest text-zinc-500 mb-6">Challenges</h2>
              <p className="text-lg leading-relaxed text-zinc-300">{project.challenges}</p>
            </section>

            <section>
              <h2 className="text-sm font-bold uppercase tracking-widest text-zinc-500 mb-6">Results</h2>
              <p className="text-lg leading-relaxed text-zinc-300">{project.results}</p>
            </section>
          </div>

          {/* Sidebar */}
          <aside className="md:col-span-4 space-y-8">
            <div className="doppelrand-shell">
              <div className="doppelrand-core p-8">
                <h3 className="text-sm font-bold uppercase tracking-widest text-zinc-500 mb-4">Stack</h3>
                <ul className="flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <li
                      key={tag}
                      className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-medium text-zinc-300"
                    >
                      {tag}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </aside>
        </div>
      </article>
    </div>
  );
}
