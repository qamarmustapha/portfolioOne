import { getContext, setContext} from 'svelte';

const KEY = Symbol('miscellaneous');

export type MiscellaneousContext = {
    profileStatusOptions: string[];
};

export const setMiscellaneousContext = (data: MiscellaneousContext) => setContext(KEY, data);

export const getMiscellaneousContext = (): MiscellaneousContext => {
    const ctx = getContext<MiscellaneousContext>(KEY);
    if (!ctx) throw new Error('Miscellaneous context missing — check +layout.svelte setup');
    return ctx;
}