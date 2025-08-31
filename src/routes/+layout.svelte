<script lang="ts">
  import favicon from '$lib/assets/aj_fav.ico';
  import Nav from '$lib/components/Nav.svelte';
  import NotificationList from '$lib/components/Notifications.svelte';
  import { Menu, X } from 'svelte-heros';
  import '../app.css';
  import { defaultUser, user } from '$lib/stores/user';
  import { Login, Logout, UserCircle } from 'svelte-heros';
  import { loading } from '$lib/stores/global';
  import Loader from '$lib/components/Loader.svelte';

  let isMobileMenuOpen = false;

  const handleClick = () => {
    localStorage.removeItem('user')
    user.set(defaultUser);
  };
</script>

<svelte:head>
  <link rel="icon" href={favicon} />
</svelte:head>

<div class="aj-bg min-h-screen bg-gray-900 font-sans text-gray-100">
  <header class="flex items-center justify-between bg-white/20 py-6 sm:px-8 lg:px-16">
    <div class="flex items-center space-x-2">
      <span class="text-xl font-bold">AJ</span>
    </div>

    <div class="flex gap-12">
      <!-- Desktop Nav -->
      <div class="hidden md:flex">
        <Nav />
      </div>
      {#if $user?.isAuthenticated}
        <span class="flex gap-4">
          <span class="flex gap-2">
            <UserCircle />
            {$user?.userName}
          </span>
          <button on:click={handleClick} class="cursor-pointer hover:text-amber-400"
            ><Logout /></button
          >
        </span>
      {:else}
        <a href="/" class="hover:text-amber-400"><Login /></a>
      {/if}
    </div>
    <!-- Mobile Menu Button -->
    <button class="text-2xl md:hidden" on:click={() => (isMobileMenuOpen = true)}>
      <Menu class="h-6 w-6" />
    </button>
  </header>

  <!-- Mobile Menu -->
  {#if isMobileMenuOpen}
    <div class="fixed inset-0 z-50 flex flex-col bg-gray-800 text-white">
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
  <div class="sm:px-8 lg:px-16">
    <NotificationList />
    {#if $loading}
      <Loader fullScreen={true} />
    {/if}
    <slot />
  </div>
</div>

<style>
  .aj-bg {
    background: linear-gradient(to bottom right, rgba(21, 87, 153, 1), rgba(21, 153, 87, 1));
  }
</style>
