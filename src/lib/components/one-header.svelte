<script lang="ts">
  let { onMenuClick, onThemeClick, onProfileClick } = $props();
  import { getProfileContext } from "$lib/context/profile";
  const { name, avatar } = getProfileContext();
</script>

<header
  class="top-0 bg-background/70 backdrop-blur-3xl sticky lg:px-8 border-b-border border-b z-50 w-full"
>
  <!-- The class structure uses an outer evaluation for shared scrolled traits -->
  <div
    class="top-0 px-3 bg-transparent relative max-w-7xl mx-auto flex h-16 items-center justify-between gap-2 transition-all duration-300 ease-out dark:bg-[radial-gradient(55%_80%_at_85%_0%,--theme(--color-foreground/.04),transparent)]"
  >
    <div class="flex items-center">
      <div
        class="group flex items-center gap-1.5 capitalize transition-opacity hover:opacity-80"
      >
        <a
          href="/"
          class="font-display text-foreground text font-bold tracking-tight text-text-primary"
        >
          {name[0]}
        </a>
      </div>
    </div>

    <nav class="hidden md:flex items-center">
      <ul class="flex items-center">
        <li>
          <a
            href="/#projects"
            class="py-2 text-sm font-medium text-gray-900 dark:text-gray-50 dark:hover:text-primary/30 px-3 lg:py-0 hover:text-accent/90"
            >Projects</a
          >
        </li>
        <li>
          <a
            href="/about"
            class="py-2 text-sm font-medium text-gray-900 dark:text-gray-50 dark:hover:text-primary/30 px-3 lg:py-0 hover:text-accent/90"
            >About</a
          >
        </li>
        <li>
          <a
            href="/#contact"
            class="py-2 text-sm font-medium text-gray-900 dark:text-gray-50 dark:hover:text-primary/30 px-3 lg:py-0 hover:text-accent/90"
            >Contact</a
          >
        </li>
        <li>
          <a
            href="/docs"
            class="py-2 text-sm font-medium text-gray-900 dark:text-gray-50 dark:hover:text-primary/30 px-3 lg:py-0 hover:text-accent/90"
            >Docs</a
          >
        </li>
      </ul>
    </nav>

    <div class="flex items-center gap-3">
      <!-- Toggle theme If you like--> 
       {#if false}
      <button
      type="button"
      tabindex="0"
      data-slot="tooltip-trigger"
      data-base-ui-tooltip-trigger=""
      onclick={onThemeClick}
      class="group/button cursor-pointer inline-flex shrink-0 items-center justify-center rounded-none border border-transparent bg-clip-padding text-xs font-medium whitespace-nowrap transition-all outline-none select-none focus-visible:border-ring focus-visible:ring-1 focus-visible:ring-ring/50 active:not-aria-[haspopup]:translate-y-px disabled:pointer-events-none disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-1 aria-invalid:ring-destructive/20 dark:aria-invalid:border-destructive/50 dark:aria-invalid:ring-destructive/40 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4 hover:bg-muted hover:text-foreground aria-expanded:bg-muted aria-expanded:text-foreground dark:hover:bg-muted/50 gap-1.5 has-data-[icon=inline-end]:pr-2 has-data-[icon=inline-start]:pl-2 group/toggle px-0 size-7"
      >
      <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" class="remixicon hidden dark:block"><path d="M12 18C8.68629 18 6 15.3137 6 12C6 8.68629 8.68629 6 12 6C15.3137 6 18 8.68629 18 12C18 15.3137 15.3137 18 12 18ZM12 16C14.2091 16 16 14.2091 16 12C16 9.79086 14.2091 8 12 8C9.79086 8 8 9.79086 8 12C8 14.2091 9.79086 16 12 16ZM11 1H13V4H11V1ZM11 20H13V23H11V20ZM3.51472 4.92893L4.92893 3.51472L7.05025 5.63604L5.63604 7.05025L3.51472 4.92893ZM16.9497 18.364L18.364 16.9497L20.4853 19.0711L19.0711 20.4853L16.9497 18.364ZM19.0711 3.51472L20.4853 4.92893L18.364 7.05025L16.9497 5.63604L19.0711 3.51472ZM5.63604 16.9497L7.05025 18.364L4.92893 20.4853L3.51472 19.0711L5.63604 16.9497ZM23 11V13H20V11H23ZM4 11V13H1V11H4Z"></path></svg>
      <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" class="remixicon block dark:hidden"><path d="M10 7C10 10.866 13.134 14 17 14C18.9584 14 20.729 13.1957 21.9995 11.8995C22 11.933 22 11.9665 22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C12.0335 2 12.067 2 12.1005 2.00049C10.8043 3.27098 10 5.04157 10 7ZM4 12C4 16.4183 7.58172 20 12 20C15.0583 20 17.7158 18.2839 19.062 15.7621C18.3945 15.9187 17.7035 16 17 16C12.0294 16 8 11.9706 8 7C8 6.29648 8.08133 5.60547 8.2379 4.938C5.71611 6.28423 4 8.9417 4 12Z"></path></svg>
      <span class="sr-only">Toggle theme</span>
    </button>
    {/if}

      <!-- menu button -->
      <button
        type="button"
        tabindex="0"
        data-slot="sheet-trigger"
        aria-label="Open menu"
        data-base-ui-click-trigger=""
        aria-haspopup="dialog"
        aria-expanded="false"
        class="group/button cursor-pointer inline-flex md:hidden shrink-0 items-center justify-center border border-transparent bg-clip-padding text-xs font-medium whitespace-nowrap transition-all outline-none select-none focus-visible:border-ring focus-visible:ring-1 focus-visible:ring-ring/50 active:not-aria-[haspopup]:translate-y-px disabled:pointer-events-none disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-1 aria-invalid:ring-destructive/20 dark:aria-invalid:border-destructive/50 dark:aria-invalid:ring-destructive/40 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4 hover:bg-muted hover:text-foreground aria-expanded:bg-muted aria-expanded:text-foreground dark:hover:bg-muted/50 size-7 rounded-none"
        onclick={onMenuClick}
      >
        <svg
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          fill="currentColor"
          class="remixicon size-5"
          ><path d="M3 4H21V6H3V4ZM3 11H21V13H3V11ZM3 18H21V20H3V18Z"
          ></path></svg
        >
      </button>

      <button
        class="items-center cursor-pointer gap-2 w-7 h-7 rounded-sm overflow-hidden bg-muted"
        onclick={onProfileClick}
      >
        <img class="w-full h-full" src={avatar} alt="Avatar" />
      </button>
    </div>
  </div>
</header>
