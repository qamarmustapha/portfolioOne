// lib/context/projects.ts
import { getContext, setContext } from 'svelte';

const KEY = Symbol('projects');

export type ProjectsContext = {
  activeProjects: Array<{ id: string; name: string; summary: string; description: string; status: string; tags: string[]; url: string }>,
  recentProjects: Array<{ id: string; name: string; summary: string; description: string; status: string; tags: string[]; url: string }>;
};

export const setProjectsContext = (data: ProjectsContext) => setContext(KEY, data);

export const getProjectsContext = (): ProjectsContext => {
  const ctx = getContext<ProjectsContext>(KEY);
  if (!ctx) throw new Error('Projects context missing — check +layout.svelte setup');
  return ctx;
};