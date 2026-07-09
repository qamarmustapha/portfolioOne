<!-- accordion.svelte -->
<script lang="ts">
    type Item = {
        name: string;
        services: string[];
    };

    let {
        items = [] as Item[],
        alwaysOpen = true,
        imgs = [] as { name: string; url: string }[]
    }: {
        items?: Item[];
        alwaysOpen?: boolean;
        imgs?: { name: string; url: string }[];
    } = $props();

    let openIds = $state<Set<string>>(new Set(items.length ? [items[0].name] : []));

    function isOpen(name: string) {
        return openIds.has(name);
    }

    function toggle(name: string) {
        const next = new Set(openIds);
        if (alwaysOpen) {
            if (next.has(name)) next.delete(name);
            else next.add(name);
        } else {
            if (next.has(name)) next.clear();
            else {
                next.clear();
                next.add(name);
            }
        }
        openIds = next;
    }

    function imgFor(name: string) {
        return imgs.find((i) => i.name === name)?.url;
    }
</script>

<div class="rounded-b-lg border border-primary/10 overflow-hidden">
    {#each items as item, i (item.name)}
        <h2 id={`acc-heading-${item.name}`}>
            <button
                type="button"
                aria-expanded={isOpen(item.name)}
                aria-controls={`acc-body-${item.name}`}
                onclick={() => toggle(item.name)}
                class="flex w-full items-center justify-between gap-3 p-3.5 font-medium rtl:text-right text-body hover:text-heading hover:bg-neutral-secondary-medium
                       {i > 0 ? 'border-t border-primary/5' : ''}"
            >
                <span class="flex items-center">
                    {#if imgFor(item.name)}
                        <img src={imgFor(item.name)} alt={item.name} class="mr-2 h-6 w-6" />
                    {/if}
                    {item.name}
                </span>

                <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    aria-hidden="true"
                    class="h-5 w-5 shrink-0 transition-transform duration-200 {isOpen(item.name) ? 'rotate-180' : ''}"
                >
                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m5 15 7-7 7 7" />
                </svg>
            </button>
        </h2>

        <div
            id={`acc-body-${item.name}`}
            role="region"
            aria-labelledby={`acc-heading-${item.name}`}
            class="{isOpen(item.name) ? 'block' : 'hidden'} border-t border-primary/5"
        >
            <div class="max-h-96 overflow-y-auto">
                {#if item.services?.length === 1}
                    <p class="p-3.5">{item.services[0]}</p>
                {:else if item.services?.length}
                    <div class="grid grid-cols-3">
                        {#each item.services as service, idx}
                            <p
                                class="flex items-center justify-center p-3.5 text-center border-primary/5
                                       {(idx + 1) % 3 !== 0 ? 'border-r' : ''}
                                       {idx < item.services.length - (item.services.length % 3 || 3) ? 'border-b' : ''}"
                            >
                                {service}
                            </p>
                        {/each}
                    </div>
                {/if}
            </div>
        </div>
    {/each}
</div>