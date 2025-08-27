<script lang="ts">
  import '../app.css';
  import favicon from '$lib/assets/aj_fav.ico';
  import { Menu, X } from 'svelte-heros';
  import Nav from '$lib/components/Nav.svelte';

  let isMobileMenuOpen = false;
</script>

<svelte:head>
  <link rel="icon" href={favicon} />
</svelte:head>

<div class="min-h-screen bg-gray-900 font-sans text-gray-100 sm:px-8 lg:px-16">
  <header class="flex items-center justify-between px-4 py-6">
    <div class="flex items-center space-x-2">
      <span class="text-xl font-bold">AJ</span>
    </div>

    <!-- Desktop Nav -->
    <div class="hidden md:flex">
      <Nav />
    </div>

    <!-- Mobile Menu Button -->
    <button class="text-2xl md:hidden" on:click={() => (isMobileMenuOpen = true)}>
      <Menu class="h-6 w-6" />
    </button>
  </header>

  <!-- Mobile Menu -->
  {#if isMobileMenuOpen}
    <div class="fixed inset-0 z-50 flex flex-col bg-gray-800 p-6 text-white">
      <button
        class="mb-6 flex w-full items-center justify-between rounded bg-gray-700 px-4 py-2 text-2xl"
        on:click={() => (isMobileMenuOpen = false)}
      >
        <span class="text-xl font-bold">AJ</span>
        <X class="h-6 w-6" />
      </button>

      <Nav onClick={() => (isMobileMenuOpen = false)} />
    </div>
  {/if}

  <slot />
</div>
