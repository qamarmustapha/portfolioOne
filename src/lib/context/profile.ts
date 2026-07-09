// lib/context/profile.ts
import { getContext, setContext } from 'svelte';
import type { z } from 'zod';
import type { ProfileSchema } from '$lib/schema/manifest';

const KEY = Symbol('profile');
export const setProfileContext = (data: z.infer<typeof ProfileSchema>) => setContext(KEY, data);
export const getProfileContext = () => {
  const ctx = getContext<z.infer<typeof ProfileSchema>>(KEY);
  if (!ctx) throw new Error('Profile context missing');
  return ctx;
};