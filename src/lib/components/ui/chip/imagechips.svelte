<script lang="ts">
    import LanguageChip from '$lib/components/ui/chip/imagechip.svelte';
    
    type Item = { name: string; url: string };
    
    let {
        languages = ['HTML'],
        imgsrc = [
            { name: 'HTML', url: 'imgs/skills/html.svg' },
            { name: 'CSS', url: 'imgs/skills/css.svg' },
            { name: 'JavaScript', url: 'imgs/skills/javascript.svg' },
        ]
    }: { languages?: string[]; imgsrc?: Item[] } = $props();
</script>

<div class="overflow-hidden grid grid-cols-2 gap-2">
    {#each languages as item (item)}
        <LanguageChip name={item} icon={imgsrc.find((i) => i.name === item)?.url} />
    {/each}
</div>