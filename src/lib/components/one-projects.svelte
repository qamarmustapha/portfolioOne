<script lang="ts">
    import { getProjectsContext } from '$lib/context/projects';
    const { activeProjects, recentProjects } = getProjectsContext();
</script>

<section class="w-full border-y-2 border-border/90" id="projects">
    <div class="max-w-7xl mx-auto sm:py-15 flex flex-col gap-10 px-3 py-20">
        <h2 class="text-3xl font-bold">Projects</h2>


        <div class="items-center flex flex-col gap-5 mt-2">
            <div class="w-full flex items-center gap-3 font-mono text-xs font-semibold uppercase tracking-widest text-foreground/50">
                <h2 >Active Projects</h2>
                <span class="h-0.5 flex-1 bg-border"></span>
            </div>
            {#if activeProjects.length > 0}
                <div class="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10">
                    {#each activeProjects as project}
                        {#if project.status === 'active'}
                            <div class="group animate-fade-in-up border-b border-border p-3 hover-lift bg-primary/10 rounded-none transition-all duration-300 hover:-translate-y-1">
                                <h4 class="text-xl font-semibold mb-3 group-hover:text-foreground/70 transition-colors">{project.name}</h4>
                                <p class="text-muted-foreground mb-4 leading-relaxed">
                                    {project.description}
                                </p>
                                <div class="flex flex-wrap gap-2">
                                    {#each project.tags as tag}
                                        <span class="text-xs px-2 py-1 rounded bg-secondary text-muted-foreground">{tag}</span>
                                    {/each}
                                </div>
                            </div>
                        {/if}
                    {/each}
                </div>
            {:else}
                <div class="bg-red-400">
                    <div class="group animate-fade-in-up border-b border-border/50 pb-8 hover-lift" style="animation-delay:0s">
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolores, enim omnis possimus perferendis iure aperiam consequuntur quaerat minima ipsum atque eos id, accusantium qui consequatur architecto veniam nostrum nihil rem!
                    </div>
                </div>
            {/if}
        </div>

        <div class="items-center flex flex-col gap-5 mt-2">
            <div class="w-full flex items-center gap-3 font-mono text-xs font-semibold uppercase tracking-widest text-foreground/50">
                <h2 >Recent Projects</h2>
                <span class="h-0.5 flex-1 bg-border"></span>
            </div>
            {#if recentProjects.length > 0}
                <div class="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10">
                    {#each recentProjects as project}
                        {#if project.status === 'recent' && project}
                            <div class="group animate-fade-in-up border-b border-border p-3 hover-lift bg-primary/10 rounded-none transition-all duration-300 hover:-translate-y-1">
                                <h4 class="text-xl font-semibold mb-3 group-hover:text-foreground/70 transition-colors">{project.name}</h4>
                                <p class="text-muted-foreground mb-4 leading-relaxed">
                                    {project.description}
                                </p>
                                <div class="flex flex-wrap gap-2">
                                    {#each project.tags as tag}
                                        <span class="text-xs px-2 py-1 rounded bg-secondary text-muted-foreground">{tag}</span>
                                    {/each}
                                    {#if project.status === 'recent' && project.url}
                                        <a href={project.url} class="h-6 w-6  text-xs rounded-full bg-secondary text-muted-foreground" target="_blank" aria-label="View on GitHub" rel="noopener noreferrer">
                                            <svg viewBox="-0.5 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M22 11.8201C22 9.84228 21.4135 7.90885 20.3147 6.26436C19.2159 4.61987 17.6542 3.33813 15.8269 2.58126C13.9996 1.82438 11.9889 1.62637 10.0491 2.01223C8.10927 2.39808 6.32748 3.35052 4.92896 4.74904C3.53043 6.14757 2.578 7.92935 2.19214 9.86916C1.80629 11.809 2.00436 13.8197 2.76123 15.6469C3.51811 17.4742 4.79985 19.036 6.44434 20.1348C8.08883 21.2336 10.0222 21.8201 12 21.8201" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path> <path d="M2 11.8201H22" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path> <path d="M12 21.8201C10.07 21.8201 8.5 17.3401 8.5 11.8201C8.5 6.30007 10.07 1.82007 12 1.82007C13.93 1.82007 15.5 6.30007 15.5 11.8201" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path> <path d="M18.3691 21.6901C20.3021 21.6901 21.8691 20.1231 21.8691 18.1901C21.8691 16.2571 20.3021 14.6901 18.3691 14.6901C16.4361 14.6901 14.8691 16.2571 14.8691 18.1901C14.8691 20.1231 16.4361 21.6901 18.3691 21.6901Z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path> <path d="M22.9998 22.8202L20.8398 20.6702" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path> </g></svg>
                                        </a>
                                    {/if}
                                </div>
                            </div>
                        {/if}
                    {/each}
                </div>
            {:else}
                <div class="bg-red-400">
                    <div class="group animate-fade-in-up border-b border-border/50 pb-8 hover-lift" style="animation-delay:0s">
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolores, enim omnis possimus perferendis iure aperiam consequuntur quaerat minima ipsum atque eos id, accusantium qui consequatur architecto veniam nostrum nihil rem!
                    </div>
                </div>
            {/if}
            
        </div>

        <a href="/projects" class="block w-fit rounded border border-border bg-popover px-5 py-2.5 text-sm font-semibold text-foreground transition-colors hover:bg-muted">
            View All Projects
        </a>
    </div>
</section>