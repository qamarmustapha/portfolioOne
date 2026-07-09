<script lang="ts">
    import { getProfileContext } from '$lib/context/profile';
    import { getProjectsContext } from '$lib/context/projects';
    import { getSkillsContext } from '$lib/context/skills';

    const { name, title, avatar, focusAreas, quote } = getProfileContext();
    const { techStack } = getSkillsContext();
    const { activeProjects } = getProjectsContext();

    const currentProjects = activeProjects.slice(0, 2);
</script>

<section class="w-full">
    <div class="max-w-7xl mx-auto px-3 py-20 sm:py-28">

        <div class="grid gap-12 sm:grid-cols-[1fr_auto] sm:items-center">
            <div>
                <p class="font-mono text-xs font-semibold uppercase tracking-widest text-primary">
                    {title}
                </p>

                <h1 class="mt-3 text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
                    {name[0]} { name[1]}
                </h1>

                <p class="mt-5 max-w-xl text-base leading-relaxed text-foreground/70">
                    {quote}
                </p>

                <div class="mt-6 flex flex-wrap gap-2">
                    {#each techStack as tech}
                        <span class="rounded-none border border-border px-3 py-1 font-mono text-xs text-foreground/70">
                            {tech}
                        </span>
                    {/each}
                </div>

                <div class="mt-8 flex flex-wrap gap-3">
                    <a
                        href="#projects"
                        class="rounded-none bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90"
                    >
                        View Work
                    </a>
                    <a
                        href="#contact"
                        class="rounded-none border border-border px-5 py-2.5 text-sm font-semibold text-foreground transition-colors hover:bg-muted"
                    >
                        Get In Touch
                    </a>
                </div>
            </div>

            <div class="justify-self-center sm:justify-self-end">
                <div class="h-40 w-40 overflow-hidden md:block md:rounded-lg hidden border border-border sm:h-48 sm:w-48">
                    <img src={avatar} alt={name[0]} class="h-full w-full object-cover" />
                </div>
            </div>
        </div>

        <div class="mt-16">
            <div class="flex items-center gap-3">
                <span class="font-mono text-xs font-semibold uppercase tracking-widest text-foreground/50">
                    Focus Areas
                </span>
                <span class="h-px flex-1 bg-border"></span>
            </div>

            <div class="mt-5 grid gap-6 sm:grid-cols-3">
                {#each focusAreas as area}
                    <div>
                        <h3 class="text-sm font-semibold text-foreground">{area.label}</h3>
                        <p class="mt-1.5 text-sm leading-relaxed text-foreground/60">{area.description}</p>
                    </div>
                {/each}
            </div>
        </div>

        {#if currentProjects.length}
            <div class="mt-16">
                <div class="flex items-center gap-3">
                    <span class="font-mono text-xs font-semibold uppercase tracking-widest text-foreground/50">
                        Currently Building
                    </span>
                    <span class="h-px flex-1 bg-border"></span>
                </div>

                <div class="mt-5 grid gap-3 sm:grid-cols-2">
                    {#each currentProjects as project}
                        <div class="rounded-none border border-border bg-popover p-4">
                            <h3 class="text-sm font-semibold text-foreground">{project.name}</h3>
                            <p class="mt-1 text-xs leading-relaxed text-foreground/60">{project.summary}</p>
                        </div>
                    {/each}
                </div>
            </div>
        {/if}
    </div>
</section>