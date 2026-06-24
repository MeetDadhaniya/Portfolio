import { notFound } from 'next/navigation';
import { PROJECTS, getProjectBySlug } from '@/lib/projects';
import AgentDetailClient from './AgentDetailClient';

export function generateStaticParams() {
  return PROJECTS.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const p = getProjectBySlug(slug);
  if (!p) return { title: 'AGENT NOT FOUND' };
  return {
    title: `${p.name} // AGENT FILE — MEET`,
    description: p.hook,
  };
}

export default async function AgentPage({ params }) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) return notFound();
  return <AgentDetailClient project={project} />;
}
