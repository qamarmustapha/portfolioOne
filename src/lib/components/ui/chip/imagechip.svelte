<script lang="ts">
    let { name = 'Go', icon = '/imgs/skills/go.svg', selected = false, disabled = false}: 
    { name?: string; icon?: string; selected?: boolean; disabled?: boolean;} = $props();
</script>

<button
    type="button" {disabled}
    aria-pressed={selected}
    class="inline-flex items-center rounded-xs gap-2 border px-2.5 py-2 text-xs font-semibold leading-none
         text-foreground/90 backdrop-blur-md transition-all duration-150 select-none
         focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring
         disabled:opacity-50 disabled:cursor-not-allowed hover:bg-primary/25 active:translate-y-0.5
         data-[selected=true]:border-primary/50 data-[selected=true]:bg-primary/30 data-[selected=true]:shadow-lg data-[selected=true]:shadow-violet-500/20"
        data-selected={selected}
>
    <span aria-hidden="true" class="grid h-5 w-5 shrink-0 place-items-center overflow-hidden rounded-full border border-primary/10 bg-primary/15">
        <img src={icon} alt="" loading="lazy" decoding="async" class="h-full w-full rounded-full object-cover" />
    </span>
    <span class="whitespace-nowrap tracking-[0.01em]">{name}</span>
</button>