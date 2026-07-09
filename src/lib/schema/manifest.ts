// lib/schema/manifest.ts
import { Description } from '$lib/components/ui/card';
import { Label } from 'bits-ui';
import { z } from 'zod';
export const MiscellaneousSchema = z.object({
    profileStatusOptions: z.array(z.string())
});

export const ProfileSchema = z.object({
    name: z.array(z.string()),
    title: z.string(),
    status: z.string(),
    avatar: z.string(),
    profileBackground: z.string(),
    quote: z.string(),
    focusAreas: z.array(z.object({
        label: z.string(),
        description: z.string()
    })),
    bio: z.array(z.string()),
    contact: z.array(z.object({
        platform: z.string(),
        url: z.url()
    }))
});

export const SkillsSchema = z.object({
    techStack: z.array(z.string()),
    languages: z.array(z.string()),
    frameworks: z.array(z.string()),
    databases: z.array(z.string()),
    
    technologies: z.array(z.object({
        name: z.string(),
        services: z.array(z.string())
    })),
    
    tools: z.array(z.string()),
    imgs: z.array(z.object({
        name: z.string(),
        url: z.string()
    }))
});

export const ProjectsSchema = z.object({
    activeProjects: z.array(z.object({
        id: z.string(),
        name: z.string(),
        summary: z.string(),
        description: z.string(),
        status: z.string(),
        tags: z.array(z.string()),
        url: z.string()
    })),
    recentProjects: z.array(z.object({
        id: z.string(),
        name: z.string(),
        summary: z.string(),
        description: z.string(),
        status: z.string(),
        tags: z.array(z.string()),
        url: z.string()
    }))
});

export const PortfolioManifestSchema = z.object({
    profile: ProfileSchema,
    projects: ProjectsSchema,
    skills: SkillsSchema,
    miscellaneous: MiscellaneousSchema,
});

export type PortfolioManifest = z.infer<typeof PortfolioManifestSchema>;