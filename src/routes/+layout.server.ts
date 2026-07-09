// +layout.server.ts
import { PortfolioManifestSchema } from '$lib/schema/manifest';
import { z } from 'zod';
import { mockManifest } from './mockData';

const USE_MOCK = true; // flip to false to use server data

export const load = async ({ fetch }) => {
    // USE_MOCK data
    if (USE_MOCK) {
        const result = PortfolioManifestSchema.safeParse(mockManifest);
        if (!result.success) {
            console.error(z.treeifyError(result.error));
            return { manifest: null, fetchFailed: true };
        }
        return { manifest: result.data, fetchFailed: false };
    }
    
    //OR Fecth
    try {
        const res = await fetch('https://api.examplae.com/portfolio-manifest');
        if (!res.ok) return { manifest: null, fetchFailed: true };
        
        const raw = await res.json();
        const result = PortfolioManifestSchema.safeParse(raw);
        if (!result.success) {
            console.error(z.treeifyError(result.error));
            return { manifest: null, fetchFailed: true };
        }
        return { manifest: result.data, fetchFailed: false };
    } catch (err) {
        console.error('Fetch to backend failed:', err);
        return { manifest: null, fetchFailed: true };
    }
};