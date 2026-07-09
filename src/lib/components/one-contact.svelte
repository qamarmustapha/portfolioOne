<script lang="ts">
    import { getProfileContext } from '$lib/context/profile';
    const { contact } = getProfileContext();

	const icons: Record<string, string> = {
		github:
			'M12 2C6.48 2 2 6.58 2 12.25c0 4.53 2.87 8.37 6.84 9.73.5.1.68-.22.68-.49 0-.24-.01-1.04-.01-1.89-2.78.62-3.37-1.21-3.37-1.21-.45-1.18-1.11-1.5-1.11-1.5-.9-.63.07-.62.07-.62 1 .07 1.53 1.05 1.53 1.05.89 1.56 2.34 1.11 2.91.85.09-.66.35-1.11.63-1.37-2.22-.26-4.56-1.14-4.56-5.07 0-1.12.39-2.03 1.03-2.75-.1-.26-.45-1.31.1-2.72 0 0 .84-.27 2.75 1.05a9.3 9.3 0 0 1 2.5-.35c.85 0 1.7.12 2.5.35 1.91-1.32 2.75-1.05 2.75-1.05.55 1.41.2 2.46.1 2.72.64.72 1.03 1.63 1.03 2.75 0 3.94-2.35 4.8-4.58 5.06.36.32.68.94.68 1.9 0 1.37-.01 2.47-.01 2.81 0 .27.18.6.69.49A10.26 10.26 0 0 0 22 12.25C22 6.58 17.52 2 12 2Z',
		linkedin:
			'M4.98 3.5C4.98 4.88 3.87 6 2.5 6S0 4.88 0 3.5 1.12 1 2.5 1s2.48 1.12 2.48 2.5ZM.5 8h4V23h-4V8Zm7.5 0h3.84v2.06h.05c.53-1 1.85-2.06 3.81-2.06C19.9 8 21 10.24 21 14.02V23h-4v-8.14c0-1.94-.03-4.43-2.7-4.43-2.7 0-3.12 2.11-3.12 4.29V23H7V8Z',
		x: 'M18.24 2H21l-6.55 7.49L22.15 22h-6.77l-5.3-6.93L3.98 22H1.2l7-8.01L1.15 2h6.94l4.79 6.33L18.24 2Zm-1.19 18.17h1.5L6.98 3.75H5.37l11.68 16.42Z',
		email:
			'M2 5.5A2.5 2.5 0 0 1 4.5 3h15A2.5 2.5 0 0 1 22 5.5v13a2.5 2.5 0 0 1-2.5 2.5h-15A2.5 2.5 0 0 1 2 18.5v-13Zm2.2.5 7.8 6.15L19.8 6H4.2Zm15.8 1.7-7.35 5.8a1 1 0 0 1-1.24 0L4.06 7.7V18.5c0 .28.22.5.44.5h15c.22 0 .44-.22.44-.5V7.7Z'
	};

	function labelFor(platform: string) {
		if (platform === 'x') return 'X / Twitter';
		return platform.charAt(0).toUpperCase() + platform.slice(1);
	}

	function handleFor(platform: string, url: string) {
		if (platform === 'email') return url.replace('mailto:', '');
		try {
			return new URL(url).hostname.replace('www.', '');
		} catch {
			return url;
		}
	}
</script>

<section id="contact" class="w-full border-b-2 border-border/90">
	<div class="max-w-7xl mx-auto px-3 py-20 sm:py-28">
		<h2 class="mt-4 text-3xl font-semibold text-slate-50 sm:text-4xl">
			Let's build something that works.
		</h2>
		<p class="mt-3 max-w-xl text-slate-400">
			Open to collaborations, freelance work, or just talking shop. Reach out on whichever
			channel is easiest for you.
		</p>

		<div class="mt-12 divide-y divide-slate-800 border-y border-slate-800">
			{#each contact as { platform, url }}
				<a
					href={url}
					target="_blank"
					rel="noopener noreferrer"
					class="group flex items-center justify-between py-5 transition-colors hover:bg-slate-900/60"
				>
					<div class="flex items-center gap-4">
						<span
							class="flex h-10 w-10 items-center justify-center rounded-full border border-slate-700 text-slate-400 transition-colors group-hover:border-emerald-400 group-hover:text-emerald-400"
						>
							<svg viewBox="0 0 24 24" fill="currentColor" class="h-5 w-5">
								<path d={icons[platform] ?? icons.email} />
							</svg>
						</span>
						<div>
							<p class="font-medium text-slate-100">{labelFor(platform)}</p>
							<p class="font-mono text-sm text-slate-500">{handleFor(platform, url)}</p>
						</div>
					</div>
					<span
						class="translate-x-0 text-slate-600 transition-all group-hover:translate-x-1 group-hover:text-emerald-400"
						aria-hidden="true"
					>
						&rarr;
					</span>
				</a>
			{/each}
		</div>
	</div>
</section>