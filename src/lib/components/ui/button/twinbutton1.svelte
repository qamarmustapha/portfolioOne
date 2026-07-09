<!-- TwinButton.svelte -->
<script lang="ts">
  // 1. Define strict type interfaces for options
  interface Props {
    onclick?: () => void;
    variant?: 'primary' | 'connect';
    leftText?: string;
    leftHref?: string;
    rightText?: string;
    rightHref?: string;
  }

  // 2. Setup your props with matching fallbacks
  let {
    onclick = () => {},
    variant = 'primary',
    leftText = 'Signin',
    leftHref = '/signin',
    rightText = 'Signup',
    rightHref = '/signup'
  }: Props = $props();

  // 3. Dynamic styling mapped cleanly via an object lookup
  const buttonStyles = {
    primary: "bg-primary text-primary-foreground hover:bg-primary/80",
    connect: "bg-secondary text-secondary-foreground hover:bg-secondary/80 border-border border" 
  };
</script>

<div class="flex flex-row gap-2">
      <!-- Left Button/Link -->
      <a
        data-slot="button"
        class="group/button inline-flex items-center justify-center rounded-md border border-transparent bg-clip-padding text-xs font-medium whitespace-nowrap transition-all outline-none select-none focus-visible:border-ring focus-visible:ring-1 focus-visible:ring-ring/50 active:not-aria-[haspopup]:translate-y-px disabled:pointer-events-none disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-1 aria-invalid:ring-destructive/20 dark:aria-invalid:border-destructive/50 dark:aria-invalid:ring-destructive/40 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4 h-8 gap-1.5 px-2.5 has-data-[icon=inline-end]:pr-2 has-data-[icon=inline-start]:pl-2 w-full {buttonStyles[variant]}"
        href={leftHref}
        onclick={onclick}
      >
        {leftText}
      </a>

      <!-- Right Button/Link -->
      <a
        data-slot="button"
        class="group/button inline-flex items-center justify-center rounded-md border border-transparent bg-clip-padding text-xs font-medium whitespace-nowrap transition-all outline-none select-none focus-visible:border-ring focus-visible:ring-1 focus-visible:ring-ring/50 active:not-aria-[haspopup]:translate-y-px disabled:pointer-events-none disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-1 aria-invalid:ring-destructive/20 dark:aria-invalid:border-destructive/50 dark:aria-invalid:ring-destructive/40 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4 h-8 gap-1.5 px-2.5 has-data-[icon=inline-end]:pr-2 has-data-[icon=inline-start]:pl-2 w-full {buttonStyles[variant]}"
        href={rightHref}
        onclick={onclick}
      >
        {rightText}
      </a>
</div>







  <!-- 
  
  <script lang="ts">
  import TwinButton from './TwinButton.svelte';
</script>

<-- Instance 1: Default fallbacks (Signin/Signup) --
<TwinButton />

<-- Instance 2: Connect Variant with custom content labels & URLs --
<TwinButton 
  variant="connect" 
  leftText="GitHub" 
  leftHref="/auth/github"
  rightText="Google" 
  rightHref="/auth/google" 
/>

  -->