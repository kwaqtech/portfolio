import { projects } from "@/data/projects";
import { notFound } from "next/navigation";
import { CaseStudyClient } from "./client";

export function generateStaticParams() {
  return projects.map((project) => ({
    slug: project.slug,
  }));
}

export default async function CaseStudyPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);

  if (!project) {
    notFound();
  }

  return <CaseStudyClient project={project} />;
}
