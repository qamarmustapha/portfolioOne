<script lang="ts">
import { tick } from 'svelte';
// `openProfile` controls visibility of this sheet; `closeProfile` is the callback to dismiss it.
let { openProfile, closeProfile } = $props();

import TwinButton1 from '$lib/components/ui/button/twinbutton1.svelte';
import LanguageChips from '$lib/components/ui/chip/imagechips.svelte';
import Accordion from '$lib/components/ui/accordion/accordion.svelte';

import { getProfileContext } from '$lib/context/profile';
import { getSkillsContext } from '$lib/context/skills';
import { getMiscellaneousContext } from '$lib/context/miscellaneous';

// Pull profile + skills + misc slices from the manifest via Symbol-keyed context accessors.
const { name, title, status, avatar, profileBackground, quote, bio, contact } = getProfileContext();
const { languages, frameworks, databases, technologies, tools, imgs } = getSkillsContext();
const  {profileStatusOptions}  = getMiscellaneousContext();

// Controls whether the long-form bio (bio[1]) is shown instead of the short one (bio[0]).
let expanded = $state(false);

// State for the profile-status picker dialog. Currently gated off below
// (both the trigger button and the dialog markup are behind `{#if false}`),
// so none of this is reachable from the UI yet.
let toggleProfileStatusDialog = $state(false);
let profileStatus = $state(`comeback`);
let inactiveDays = $state(0);


// Turns a raw day count into a human-friendly "X days" / "X months" string,
// used by statusDescriptions below.
function formatGap(days: number): string {
    if (days < 30) return `${days} day${days === 1 ? '' : 's'}`;
    const months = Math.round(days / 30);
    return `${months} month${months === 1 ? '' : 's'}`;
}

// Flavor text for each possible profile status, keyed to profileStatusOptions.
// Some entries (comeback, cold) take the inactivity gap into account when available.
const statusDescriptions: Record<string, (inactiveDays?: number) => string> = {
    comeback: (days) => days != null ? `Back after ${formatGap(days)} away. Nobody saw this coming.` : `Back from the dead. Nobody saw this coming.`,
    blazing: () => `Unstoppable. Showing up every single day.`,
    hot: () => `On a serious streak — can't slow down.`,
    warm: () => `Consistent. Reliable. Still in the game.`,
    cooling: () => `Slowing down. The streak's on borrowed time.`,
    cold: (days) => days != null ? `Inactive for ${formatGap(days)}. Might be over.` : `Gone quiet for a month+. Might be over.`,
    ghost: () => `Vanished. No signs of life.`
};

// Opens/closes the (currently disabled) status dialog, and shifts focus to
// the button matching the current status once the dialog is in the DOM.
function onToggleProfileStatusDialog() {
    toggleProfileStatusDialog = !toggleProfileStatusDialog;
    
    if (toggleProfileStatusDialog) {
        tick().then(() => {
            const btn = document.querySelector<HTMLButtonElement>(`[data-status-btn="${profileStatus}"]`);
                btn?.focus();
            });
        }
    }
    
    // Updates the (locally staged, not-yet-committed) selected status in the dialog.
    function selectStatus(status: string) {
        profileStatus = status;
    }
    
    // Locks page scroll while the status dialog is open.
    $effect(() => {
        document.body.style.overflow = toggleProfileStatusDialog ? 'hidden' : '';
});
</script>
    
{#snippet flameIcon(status: string)}
<!--
    Animated flame/status icon set — one SVG per profileStatusOptions value
    (comeback, blazing, hot, warm, cooling, cold, and a ghost fallback for
    anything else / no signal). Each branch defines its own gradients,
    filters, and keyframe animations scoped by unique id/class suffixes
    (e.g. `-1`, `-2`...) so multiple instances on the page don't collide.
    All animations respect `prefers-reduced-motion`.
-->
{#if status === `comeback`}
<!-- "Comeback" flame: warm burst halo + radiating rays + rising sparks, signals a return after inactivity. -->
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" overflow="visible" style="overflow:visible"><defs><linearGradient id="rg-outer" x1="0%" y1="0%" x2="0%" y2="100%"><stop offset="0%" stop-color="#FFF9E1"/><stop offset="35%" stop-color="#FFD54F"/><stop offset="70%" stop-color="#FF8F00"/><stop offset="100%" stop-color="#FF4500"/></linearGradient><linearGradient id="rg-inner" x1="0%" y1="0%" x2="0%" y2="100%"><stop offset="0%" stop-color="#FFF"/><stop offset="100%" stop-color="#FFECB3"/></linearGradient><radialGradient id="rg-burst" cx="50%" cy="50%" r="50%"><stop offset="0%" stop-color="#FFF3C4" stop-opacity=".9"/><stop offset="100%" stop-color="#FFF3C4" stop-opacity="0"/></radialGradient><filter id="rg-glow" x="-80%" y="-80%" width="260%" height="260%"><feGaussianBlur stdDeviation="1" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter></defs><style>.rg-halo{transform-origin:12px 10px;animation:rg-pulse 1.8s ease-in-out infinite}.rg-ray{transform-origin:12px 10.5px;animation:rg-ray-pulse 1.8s ease-in-out infinite}.rg-spark{animation:rg-rise 2.4s ease-in infinite}.rg-spark-2{animation:rg-rise 2.4s ease-in infinite;animation-delay:.8s}.rg-spark-3{animation:rg-rise 2.4s ease-in infinite;animation-delay:1.5s}.rg-flame-outer{transform-origin:12px 21.5px;animation:rg-surge .42s ease-in-out infinite alternate}.rg-flame-inner{transform-origin:12px 18.5px;animation:rg-surge-inner .28s ease-in-out infinite alternate}@keyframes rg-pulse{0%,100%{opacity:.35;transform:scale(.9)}50%{opacity:.8;transform:scale(1.15)}}@keyframes rg-ray-pulse{0%,100%{opacity:.25;transform:scale(.85)}50%{opacity:.9;transform:scale(1.1)}}@keyframes rg-rise{0%{transform:translateY(0);opacity:0}15%{opacity:1}100%{transform:translateY(-9px);opacity:0}}@keyframes rg-surge{0%{transform:scaleY(.88) scaleX(1.06) skewX(-6deg)}22%{transform:scaleY(1.16) scaleX(.9) skewX(5deg)}45%{transform:scaleY(.92) scaleX(1.08) skewX(-8deg)}68%{transform:scaleY(1.2) scaleX(.88) skewX(4deg)}86%{transform:scaleY(.95) scaleX(1.04) skewX(-5deg)}100%{transform:scaleY(1.14) scaleX(.92) skewX(6deg)}}@keyframes rg-surge-inner{0%{transform:scaleY(.85) skewX(4deg);opacity:.85}30%{transform:scaleY(1.22) skewX(-5deg);opacity:1}55%{transform:scaleY(.88) skewX(6deg);opacity:.8}100%{transform:scaleY(1.18) skewX(-4deg);opacity:1}}@media (prefers-reduced-motion:reduce){.rg-halo,.rg-ray,.rg-spark,.rg-spark-2,.rg-spark-3,.rg-flame-outer,.rg-flame-inner{animation:none!important}}</style><circle class="rg-halo" cx="12" cy="10" r="7.5" fill="url(#rg-burst)"/><g class="rg-ray" stroke="#FFD54F" stroke-width=".8" stroke-linecap="round" opacity=".6"><line x1="12" y1="10.5" x2="12" y2="2.2"/><line x1="12" y1="10.5" x2="18" y2="6"/><line x1="12" y1="10.5" x2="20" y2="10.5"/><line x1="12" y1="10.5" x2="18" y2="15"/><line x1="12" y1="10.5" x2="6" y2="15"/><line x1="12" y1="10.5" x2="4" y2="10.5"/><line x1="12" y1="10.5" x2="6" y2="6"/></g><path d="M8.3 21.5c-.2-2.2.3-3.2.5-3.6h6.4c.2.4.7 1.4.5 3.6z" fill="#78909C" opacity=".55"/><path d="M10.2 18.8l.9 1.3-.7 1 1 1.1" stroke="#4A5A63" stroke-width=".45" fill="none" opacity=".55"/><circle class="rg-spark" cx="9.5" cy="19" r=".5" fill="#FFD54F"/><circle class="rg-spark-2" cx="14" cy="19.5" r=".4" fill="#FFECB3"/><circle class="rg-spark-3" cx="12" cy="20" r=".45" fill="#FF8F00"/><path class="rg-flame-outer" filter="url(#rg-glow)" fill="url(#rg-outer)" d="M12 2.5c-.3 2.8-1.8 4.6-3.3 6.3C7 10.7 6 12.6 6 15c0 3.6 2.7 6.5 6 6.5s6-2.9 6-6.5c0-2.6-1.2-4.6-2.5-6.3.1 1.6-.5 2.8-1.4 3.6.2-3.4-.6-7.2-2.1-9.8z"/><path class="rg-flame-inner" fill="url(#rg-inner)" d="M12 9c-.2 1.6-1 2.6-1.9 3.6-.8.9-1.4 2-1.4 3.4 0 2 1.5 3.6 3.3 3.6s3.3-1.6 3.3-3.6c0-1.4-.6-2.5-1.4-3.4.05.8-.2 1.4-.7 1.8.05-1.9-.3-3.9-1.2-5.4z"/></svg>
{:else if status === `blazing`}
<!-- "Blazing" flame: fast, aggressive flicker — the most intense of the active-streak states. -->
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><defs><linearGradient id="og-1" x1="0%" y1="0%" x2="0%" y2="100%"><stop offset="0%" stop-color="#FFD54F"/><stop offset="45%" stop-color="#FF7A00"/><stop offset="100%" stop-color="#FF4500"/></linearGradient><linearGradient id="ig-1" x1="0%" y1="0%" x2="0%" y2="100%"><stop offset="0%" stop-color="#FFFDE7"/><stop offset="100%" stop-color="#FFC107"/></linearGradient><filter id="glow-1" x="-60%" y="-60%" width="220%" height="220%"><feGaussianBlur stdDeviation="0.9" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter></defs><style>.fo-1{transform-origin:12px 21.5px;animation:rage-outer .55s ease-in-out infinite alternate}.fi-1{transform-origin:12px 19px;animation:rage-inner .35s ease-in-out infinite alternate}@keyframes rage-outer{0%{transform:scaleY(1) scaleX(1) skewX(-4deg)}30%{transform:scaleY(1.09) scaleX(.93) skewX(3deg)}55%{transform:scaleY(.96) scaleX(1.05) skewX(-6deg)}80%{transform:scaleY(1.06) scaleX(.95) skewX(2deg)}100%{transform:scaleY(1) scaleX(1) skewX(-3deg)}}@keyframes rage-inner{0%{transform:scaleY(1) skewX(3deg);opacity:1}50%{transform:scaleY(1.12) skewX(-4deg);opacity:.85}100%{transform:scaleY(.94) skewX(5deg);opacity:1}}@media (prefers-reduced-motion:reduce){.fo-1,.fi-1{animation:none!important}}</style><path class="fo-1" filter="url(#glow-1)" fill="url(#og-1)" d="M12 2.5c-.3 2.8-1.8 4.6-3.3 6.3C7 10.7 6 12.6 6 15c0 3.6 2.7 6.5 6 6.5s6-2.9 6-6.5c0-2.6-1.2-4.6-2.5-6.3.1 1.6-.5 2.8-1.4 3.6.2-3.4-.6-7.2-2.1-9.8z"/><path class="fi-1" fill="url(#ig-1)" d="M12 9c-.2 1.6-1 2.6-1.9 3.6-.8.9-1.4 2-1.4 3.4 0 2 1.5 3.6 3.3 3.6s3.3-1.6 3.3-3.6c0-1.4-.6-2.5-1.4-3.4.05.8-.2 1.4-.7 1.8.05-1.9-.3-3.9-1.2-5.4z"/></svg>
{:else if status === `hot`}
<!-- "Hot" flame: same palette as blazing but a slower, gentler flicker — one notch down in intensity. -->
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><defs><linearGradient id="og-2" x1="0%" y1="0%" x2="0%" y2="100%"><stop offset="0%" stop-color="#FFD54F"/><stop offset="45%" stop-color="#FF7A00"/><stop offset="100%" stop-color="#FF4500"/></linearGradient><linearGradient id="ig-2" x1="0%" y1="0%" x2="0%" y2="100%"><stop offset="0%" stop-color="#FFFDE7"/><stop offset="100%" stop-color="#FFC107"/></linearGradient></defs><style>.fo-2{transform-origin:12px 21.5px;animation:hot-outer 1.1s ease-in-out infinite alternate}.fi-2{transform-origin:12px 19px;animation:hot-inner .8s ease-in-out infinite alternate}@keyframes hot-outer{0%{transform:scaleY(1) skewX(-1.5deg)}50%{transform:scaleY(1.03) skewX(1.5deg)}100%{transform:scaleY(.99) skewX(-1deg)}}@keyframes hot-inner{0%{transform:scaleY(1);opacity:1}50%{transform:scaleY(1.04);opacity:.92}100%{transform:scaleY(.98);opacity:1}}@media (prefers-reduced-motion:reduce){.fo-2,.fi-2{animation:none!important}}</style><path class="fo-2" fill="url(#og-2)" d="M12 2.5c-.3 2.8-1.8 4.6-3.3 6.3C7 10.7 6 12.6 6 15c0 3.6 2.7 6.5 6 6.5s6-2.9 6-6.5c0-2.6-1.2-4.6-2.5-6.3.1 1.6-.5 2.8-1.4 3.6.2-3.4-.6-7.2-2.1-9.8z"/><path class="fi-2" fill="url(#ig-2)" d="M12 9c-.2 1.6-1 2.6-1.9 3.6-.8.9-1.4 2-1.4 3.4 0 2 1.5 3.6 3.3 3.6s3.3-1.6 3.3-3.6c0-1.4-.6-2.5-1.4-3.4.05.8-.2 1.4-.7 1.8.05-1.9-.3-3.9-1.2-5.4z"/></svg>
{:else if status === `warm`}
<!-- "Warm" flame: muted rose/taupe palette, near-static — signals a slow but still-alive streak. -->
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><defs><linearGradient id="og-3" x1="0%" y1="0%" x2="0%" y2="100%"><stop offset="0%" stop-color="#C9A79E"/><stop offset="100%" stop-color="#A7847C"/></linearGradient><linearGradient id="ig-3" x1="0%" y1="0%" x2="0%" y2="100%"><stop offset="0%" stop-color="#E4C9C2"/><stop offset="100%" stop-color="#BFA098"/></linearGradient></defs><style>.fo-3{transform-origin:12px 21.5px;animation:warm-outer 1.9s ease-in-out infinite alternate}.fi-3{transform-origin:12px 19px;animation:warm-inner 1.5s ease-in-out infinite alternate}@keyframes warm-outer{0%{transform:scaleY(1) skewX(-.6deg)}100%{transform:scaleY(1.015) skewX(.6deg)}}@keyframes warm-inner{0%{transform:scaleY(1);opacity:.95}100%{transform:scaleY(1.02);opacity:1}}@media (prefers-reduced-motion:reduce){.fo-3,.fi-3{animation:none!important}}</style><path class="fo-3" fill="url(#og-3)" d="M12 2.5c-.3 2.8-1.8 4.6-3.3 6.3C7 10.7 6 12.6 6 15c0 3.6 2.7 6.5 6 6.5s6-2.9 6-6.5c0-2.6-1.2-4.6-2.5-6.3.1 1.6-.5 2.8-1.4 3.6.2-3.4-.6-7.2-2.1-9.8z"/><path class="fi-3" fill="url(#ig-3)" d="M12 9c-.2 1.6-1 2.6-1.9 3.6-.8.9-1.4 2-1.4 3.4 0 2 1.5 3.6 3.3 3.6s3.3-1.6 3.3-3.6c0-1.4-.6-2.5-1.4-3.4.05.8-.2 1.4-.7 1.8.05-1.9-.3-3.9-1.2-5.4z"/></svg>
{:else if status === `cooling`}
<!-- "Cooling" flame: blue-grey palette, slow drift + reduced opacity — streak is fading. -->
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><defs><linearGradient id="og-4" x1="0%" y1="0%" x2="0%" y2="100%"><stop offset="0%" stop-color="#9FC3D2"/><stop offset="100%" stop-color="#7BA4B9"/></linearGradient><linearGradient id="ig-4" x1="0%" y1="0%" x2="0%" y2="100%"><stop offset="0%" stop-color="#D3E7EF"/><stop offset="100%" stop-color="#A9C7D4"/></linearGradient></defs><style>.fo-4{transform-origin:12px 21.5px;opacity:.85;animation:cool-outer 2.8s ease-in-out infinite alternate}.fi-4{transform-origin:12px 19px;opacity:.85;animation:cool-inner 2.4s ease-in-out infinite alternate}@keyframes cool-outer{0%{transform:scaleY(1)}100%{transform:scaleY(1.008)}}@keyframes cool-inner{0%{opacity:.75}100%{opacity:.9}}@media (prefers-reduced-motion:reduce){.fo-4,.fi-4{animation:none!important}}</style><path class="fo-4" fill="url(#og-4)" d="M12 2.5c-.3 2.8-1.8 4.6-3.3 6.3C7 10.7 6 12.6 6 15c0 3.6 2.7 6.5 6 6.5s6-2.9 6-6.5c0-2.6-1.2-4.6-2.5-6.3.1 1.6-.5 2.8-1.4 3.6.2-3.4-.6-7.2-2.1-9.8z"/><path class="fi-4" fill="url(#ig-4)" d="M12 9c-.2 1.6-1 2.6-1.9 3.6-.8.9-1.4 2-1.4 3.4 0 2 1.5 3.6 3.3 3.6s3.3-1.6 3.3-3.6c0-1.4-.6-2.5-1.4-3.4.05.8-.2 1.4-.7 1.8.05-1.9-.3-3.9-1.2-5.4z"/></svg>
{:else if status === `cold`}
<!-- "Cold" flame: static ice-blue glyph with a subtle glinting frost highlight — mostly inactive. -->
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><defs><linearGradient id="og-5" x1="0%" y1="0%" x2="0%" y2="100%"><stop offset="0%" stop-color="#B3E5FC"/><stop offset="100%" stop-color="#4FC3F7"/></linearGradient><linearGradient id="ig-5" x1="0%" y1="0%" x2="0%" y2="100%"><stop offset="0%" stop-color="#E1F5FE"/><stop offset="100%" stop-color="#81D4FA"/></linearGradient></defs><style>.glint-5{animation:frost-glint 3.5s ease-in-out infinite}@keyframes frost-glint{0%,100%{opacity:.15}50%{opacity:.4}}@media (prefers-reduced-motion:reduce){.glint-5{animation:none!important}}</style><path fill="url(#og-5)" opacity=".9" d="M12 2.5c-.3 2.8-1.8 4.6-3.3 6.3C7 10.7 6 12.6 6 15c0 3.6 2.7 6.5 6 6.5s6-2.9 6-6.5c0-2.6-1.2-4.6-2.5-6.3.1 1.6-.5 2.8-1.4 3.6.2-3.4-.6-7.2-2.1-9.8z"/><path fill="url(#ig-5)" opacity=".9" d="M12 9c-.2 1.6-1 2.6-1.9 3.6-.8.9-1.4 2-1.4 3.4 0 2 1.5 3.6 3.3 3.6s3.3-1.6 3.3-3.6c0-1.4-.6-2.5-1.4-3.4.05.8-.2 1.4-.7 1.8.05-1.9-.3-3.9-1.2-5.4z"/><path class="glint-5" fill="#FFF" d="M9.5 13.5c.4-1 1-1.6 1.7-2-.2 1-.9 1.7-1.7 2z"/></svg>
{:else}
<!-- Fallback ("ghost"): used for any status not matched above, including the `ghost` option itself — a translucent, blinking ghost glyph instead of a flame. -->
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><defs><linearGradient id="ghost-og-6" x1="0%" y1="0%" x2="0%" y2="100%"><stop offset="0%" stop-color="#EAF2FF"/><stop offset="45%" stop-color="#BFD2FF"/><stop offset="100%" stop-color="#8FAEEB"/></linearGradient><linearGradient id="ghost-ig-6" x1="0%" y1="0%" x2="0%" y2="100%"><stop offset="0%" stop-color="#FFFFFF"/><stop offset="100%" stop-color="#DCE8FF"/></linearGradient><filter id="ghost-glow-6" x="-60%" y="-60%" width="220%" height="220%"><feGaussianBlur stdDeviation="0.7" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter></defs><style>.go-6{transform-origin:12px 14px;animation:ghost-float 2.6s ease-in-out infinite alternate}.gi-6{transform-origin:12px 14px;animation:ghost-inner 2.2s ease-in-out infinite alternate}.ge-6{animation:ghost-eye 3.2s ease-in-out infinite}@keyframes ghost-float{0%{transform:translateY(0) skewX(-1deg)}100%{transform:translateY(-.6px) skewX(1deg)}}@keyframes ghost-inner{0%{opacity:.92}100%{opacity:1}}@keyframes ghost-eye{0%,44%,100%{transform:scaleY(1)}48%,52%{transform:scaleY(.15)}}@media (prefers-reduced-motion:reduce){.go-6,.gi-6,.ge-6{animation:none!important}}</style><path class="go-6" filter="url(#ghost-glow-6)" fill="url(#ghost-og-6)" d="M12 2.5c-4.2 0-7 3.1-7 7.3V21l2.1-1.5L9.2 21l2.8-1.7L14.8 21l2.1-1.5L19 21V9.8c0-4.2-2.8-7.3-7-7.3z"/><path class="gi-6" fill="url(#ghost-ig-6)" d="M12 5.8c-2.8 0-4.7 2.1-4.7 4.9v7.1l1.4-1 1.5 1 1.8-1.1 1.8 1.1 1.5-1 1.4 1v-7.1c0-2.8-1.9-4.9-4.7-4.9z"/><circle class="ge-6" cx="9.4" cy="10.8" r="1" fill="#35507A"/><circle class="ge-6" cx="14.6" cy="10.8" r="1" fill="#35507A"/><path d="M9.5 14.2c.7.6 1.6.9 2.5.9s1.8-.3 2.5-.9" fill="none" stroke="#35507A" stroke-width="1.1" stroke-linecap="round"/></svg>
{/if}
{/snippet}

<!-- Root sheet portal — only rendered/visible when `openProfile` is true. -->
<div data-slot="sheet-portal" class="{openProfile ? 'block' : 'hidden'}">
    <!-- Dimmed backdrop behind the sheet. -->
    <div data-slot="sheet-overlay" class="fixed inset-0 z-50 bg-black/10 text-xs/relaxed supports-backdrop-filter:backdrop-blur-xs"></div>
    <!-- Slide-in sheet panel, right-aligned on desktop, full-screen below ~630px. -->
    <div role="dialog" data-slot="sheet-content" data-side="right"
    class="fixed z-50 flex flex-col bg-popover bg-clip-padding text-xs/relaxed text-popover-foreground shadow-lg data-[side=right]:inset-y-0 data-[side=right]:right-0 data-[side=right]:h-full data-[side=right]:w-3/4 data-[side=right]:border-l data-[side=right]:sm:max-w-sm w-80 gap-0 p-0 max-[630px]:!inset-0 max-[630px]:!w-full max-[630px]:!max-w-full max-[630px]:!h-full max-[630px]:border-l-0"
    >
    <h2 data-slot="sheet-title" class="text-foreground border-b border-border p-4 text-sm font-semibold">Profile</h2>
    <div class="relative flex flex-col w-full h-full overflow-y-auto" aria-label="Profile Menu">
        
        <!-- Cover background image + circular avatar overlapping its bottom edge. -->
        <div class="relative h-50 shrink-0">
            <img src="{profileBackground}" alt="Profile Background" class="absolute inset-0 h-35 w-full object-cover border-b-4 border-primary"/>
            <div class="absolute left-1/2 bottom-0 h-24 w-24 -translate-x-1/2 rounded-full border-4 border-primary bg-background">
                <img src="{avatar}" alt="Profile" class="w-full h-full rounded-full object-cover" />
                {#if false} 
                <!-- Status-badge trigger — disabled (`{#if false}`) until the status dialog below is wired up. -->
                <button onclick={onToggleProfileStatusDialog} aria-haspopup="dialog" aria-expanded={toggleProfileStatusDialog} class="absolute block bottom-0 right-0 cursor-pointer overflow-hidden h-7 w-7 rounded-full bg-primary border-2 border-primary">
                    {@render flameIcon(status)}
                </button>
                {/if}
            </div>
        </div>
    
    <h3 class="text-center text-lg mt-3 font-semibold text-foreground">{name}</h3>
    <p class="text-center text-sm text-foreground/70">{title}</p>
    
    <div class="flex flex-col items-centerv mt-3">
        <!-- Bio block: short bio[0] by default, expands to the long-form bio[1] (rendered as HTML) via the Read more/Show less toggle. -->
        <div class="w-full shrink-0 p-3 bg-primary/5 border-t">
            <!-- <h4 class="text-sm font-semibold text-start mb-1">Bio</h4> -->
            <button type="button" onclick={() => (expanded = !expanded)} class="{expanded ? 'flex' : 'hidden'}  my-2 text-xs font-semibold rounded-[1px] text-primary hover:underline cursor-pointer">
                {expanded ? 'Show less' : 'Read more'}
            </button>
            {#if expanded}
            <div class="text-start text-sm text-foreground/70 w-full space-y-3">
                {@html bio[1]}
            </div>
            {:else}
            <p class="text-start text-sm text-foreground/70 w-full">
                {bio[0]}
            </p>
            {/if}
            <button type="button" onclick={() => (expanded = !expanded)} class="{expanded ? 'hidden' : 'block'} my-2 text-xs font-semibold rounded-[1px] text-primary hover:underline cursor-pointer">
                {expanded ? 'Show less' : 'Read more'}
            </button>
        </div>
        {#if true}
        <!-- Skills block: languages, frameworks, cloud/infra accordion, and tools, each rendered from the skills context. -->
        <div class="w-full shrink-0 flex flex-col p-3 bg-primary/5 border-y">
            <!-- <h4 class="text-sm font-semibold text-start">Skills</h4> -->
            <div class="w-full shrink-0 gap-2 flex flex-col">
                
                <div class="px-2.5 py-3 rounded-lg flex flex-col gap-1 bg-primary/10">
                    <h5 class="text-xs font-semibold border-t border-primary/10 rounded-t-lg rounded-b-none p-2.5 border text-center">Languages</h5>
                    <div class="rounded-b-lg border border-primary/10 overflow-hidden">
                        <LanguageChips languages={languages} imgsrc={imgs} />
                    </div>
                </div>
                
                <div class="px-2.5 py-2.5 rounded-lg flex flex-col gap-1 bg-primary/10">
                    <h5 class="text-xs font-semibold border-t border-primary/10 rounded-t-lg rounded-b-none p-2.5 border text-center">Frameworks</h5>
                    <div class="rounded-b-lg border border-primary/10 overflow-hidden">
                        {#if frameworks.length > 0}
                        <LanguageChips languages={frameworks} imgsrc={imgs} />
                        {:else}
                        <p class="text-xs text-foreground/70 p-2.5 text-center">No frameworks listed.</p>
                        {/if}
                    </div>
                </div>
                
                <div class="px-2.5 py-2.5 rounded-t-lg rounded-b-lg bg-primary/10 w-full shrink-0 gap-1 flex flex-col">
                    <h5 class="text-xs font-semibold border-t border-primary/10 rounded-t-lg rounded-b-none p-2.5 border text-center">Cloud & Infrastructures</h5>
                    <Accordion items={technologies} imgs={imgs} alwaysOpen={false} />
                </div>
                
                <div class="px-2.5 py-3 rounded-lg bg-primary/10 w-full shrink-0 gap-1 flex flex-col">
                    <h5 class="text-xs font-semibold border-t border-primary/10 rounded-t-lg rounded-b-none p-2.5 border text-center">Tools</h5>
                    <div class="rounded-b-lg border border-primary/10 overflow-hidden">
                        <LanguageChips languages={tools} imgsrc={imgs} />
                    </div>
                </div>
            </div>
        </div>
        {/if}
    </div>
    
    
    {#if false}
    <!--
        Status-selection dialog — lets the user pick a profileStatusOptions
        value and shows its statusDescriptions text. Currently unreachable
        (`{#if false}`) since its only trigger above is also disabled.
    -->
    <div data-slot="sheet-overlay" class="{toggleProfileStatusDialog ? '' : 'hidden'} fixed top-0 right-0 w-full h-full z-50 bg-primary/10 text-xs/relaxed supports-backdrop-filter:backdrop-blur-3xl">
        <div class="absolute inset-0 z-50 w-fit h-fit rounded-4xl p-1.5 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col gap-1 border-5 border-primary/30 items-center">
            <!-- Row of status option buttons, one per profileStatusOptions entry, each rendering its flameIcon variant. -->
            <div class="w-full shrink-0 flex border-b-2 bg-primary/30 rounded-t-xl justify-center gap-2 p-2 text-sm font-semibold text-foreground">
                {#each profileStatusOptions as option (option)}
                <button
                data-status-btn={option}
                onclick={() => selectStatus(option)}
                aria-pressed={status === option}
                class="flex items-center justify-center rounded-lg px-1 py-1 text-sm font-semibold text-foreground shadow-md transition-colors hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none
                            {profileStatus === option ? 'bg-primary/75 border border-accent' : 'bg-primary/30'}"
                >
                {@render flameIcon(option)}
            </button>
            {/each}
        </div>
        <!-- Description of the currently-selected (staged) status. -->
        <div class="shrink-0 w-full min-h-30 flex flex-col items-start border-b-2 bg-primary/30 rounded-none p-2 text-sm font-semibold text-foreground">
            <span class="capitalize">{profileStatus}</span>
            <span class="text-xs font-normal">
                {statusDescriptions[profileStatus](inactiveDays)}
            </span>
        </div>
        <button onclick={onToggleProfileStatusDialog} class="shrink-0 w-full cursor-pointer flex border-b-2 bg-primary/30 rounded-b-xl hover:bg-primary/40 justify-center gap-2 p-1 text-sm font-semibold text-foreground">
            <span>Close</span>
        </button>
    </div>
</div>
{/if}
</div>

<!-- Sheet footer: single action button (behavior defined inside TwinButton1) tied to closeProfile. -->
<div class="mt-auto flex flex-col gap-3 border-t border-border p-4">
    <TwinButton1 onclick={closeProfile}/>
</div>

<!-- Top-right "X" close button for the sheet. -->
<button
type="button"
onclick={closeProfile}
data-slot="sheet-close"
class="group/button inline-flex shrink-0 items-center justify-center border border-transparent bg-clip-padding text-xs font-medium whitespace-nowrap transition-all outline-none select-none focus-visible:border-ring focus-visible:ring-1 focus-visible:ring-ring/50 active:not-aria-[haspopup]:translate-y-px disabled:pointer-events-none disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-1 aria-invalid:ring-destructive/20 dark:aria-invalid:border-destructive/50 dark:aria-invalid:ring-destructive/40 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4 hover:bg-muted hover:text-foreground aria-expanded:bg-muted aria-expanded:text-foreground dark:hover:bg-muted/50 size-7 rounded-none absolute top-3 right-3"
>
<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" class="remixicon">
    <path d="M11.9997 10.5865L16.9495 5.63672L18.3637 7.05093L13.4139 12.0007L18.3637 16.9504L16.9495 18.3646L11.9997 13.4149L7.04996 18.3646L5.63574 16.9504L10.5855 12.0007L5.63574 7.05093L7.04996 5.63672L11.9997 10.5865Z"></path>
</svg>
<span class="sr-only">Close</span>
</button>
</div>
</div>