// lib/context/projects.ts
import { getContext, setContext } from 'svelte';

const KEY = Symbol('skills');

export type SkillsContext = {
    techStack: string[];
    languages: string[];
    frameworks: string[];
    databases: string[];
    technologies: Array<{ name: string; services: string[] }>;
    tools: string[];
    imgs: Array<{ name: string; url: string }>;
};

export const setSkillsContext = (data: SkillsContext) => setContext(KEY, data);

export const getSkillsContext = (): SkillsContext => {
    const ctx = getContext<SkillsContext>(KEY);
    if (!ctx) throw new Error('Skills context missing — check +layout.svelte setup');
    return ctx;
};