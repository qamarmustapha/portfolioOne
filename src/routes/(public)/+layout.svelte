<script>
    import { dev } from '$app/environment';
    import Header from '$lib/components/one-header.svelte';
    import Sidebar from '$lib/components/one-sidebar.svelte';
    import ProfileMenu from '$lib/components/one-sideprofile.svelte';

    let { children } = $props();

    let sidebarOpen = $state(false);
    let ProfileMenuOpen = $state(false);

    function toggleTheme() {
        const isDark = document.documentElement.classList.toggle('dark');
        localStorage.setItem('theme', isDark ? 'dark' : 'light');
    }
    
    function toggleSidebar() {
        sidebarOpen = !sidebarOpen;
    }
    
    function toggleProfile() {
        ProfileMenuOpen = !ProfileMenuOpen;
    }

    // Fixed combined screen layout view locking logic
    $effect(() => {
        document.body.style.overflow = (ProfileMenuOpen || sidebarOpen) ? 'hidden' : '';
    });

    import { getProfileContext } from '$lib/context/profile';
    const { name } = getProfileContext();
</script>
<svelte:head>
  <title>{name[0]} {name[1]} - PortfolioOne Template</title>
</svelte:head>

<!-- Fixed the min-h-screen style configuration string space typo -->
<div class="min-h-screen flex flex-col">
    <Header onMenuClick={toggleSidebar} onThemeClick={toggleTheme} onProfileClick={toggleProfile} />

    <main class="flex-1 w-full mt-5">
        {@render children()}
    </main>

    <Sidebar openMenu={sidebarOpen} closeMenu={toggleSidebar} onThemeClick={toggleTheme}/>
    <ProfileMenu openProfile={ProfileMenuOpen} closeProfile={toggleProfile}/>
</div>
