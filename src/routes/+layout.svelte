<script lang="ts">
  import './layout.css';
  import { setProfileContext } from '$lib/context/profile';
  import { setSkillsContext } from '$lib/context/skills';
  import { setProjectsContext } from '$lib/context/projects';
  import { setMiscellaneousContext } from '$lib/context/miscellaneous';
  
  let { data, children } = $props();
  
  function initializeContexts() {
    const manifest = data.manifest;
    
    if (!manifest) return;
    
    setProfileContext(manifest.profile);
    setSkillsContext(manifest.skills);
    setMiscellaneousContext(manifest.miscellaneous);

    setProjectsContext({
      activeProjects: manifest.projects.activeProjects,
      recentProjects: manifest.projects.recentProjects
    });
  }
  
  initializeContexts();
</script>

{#if data.fetchFailed}
<div class="fallback-error">
  <p>Couldn't load portfolio data. Please try again shortly.</p>
</div>
{:else}
{@render children()}
{/if}