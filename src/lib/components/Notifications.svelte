<script lang="ts">
  import { notifications } from '$lib/stores/notifications';
  import { BadgeCheck, ExclamationCircle, InformationCircle, X } from 'svelte-heros';
  import { fly } from 'svelte/transition';
</script>

{#if $notifications.length > 0}
  <div class="fixed top-4 left-1/2 z-50 w-80 -translate-x-1/2 transform space-y-2 p-4">
    {#each $notifications as n (n.id)}
      <div
        in:fly={{ x: 100, duration: 250 }}
        out:fly={{ x: 100, duration: 250 }}
        class="flex items-center gap-2 rounded-lg px-4 py-3 text-white shadow-lg"
        class:bg-green-600={n.type === 'success'}
        class:bg-red-600={n.type === 'error'}
        class:bg-yellow-500={n.type === 'warning'}
        class:bg-blue-600={n.type === 'info'}
      >
        {#if n.type === 'success'}
          <BadgeCheck />
        {/if}
        {#if n.type === 'error'}
          <X />
        {/if}
        {#if n.type === 'warning'}
          <ExclamationCircle />
        {/if}
        {#if n.type === 'info'}
          <InformationCircle />
        {/if}
        <span>{n.message}</span>
      </div>
    {/each}
  </div>
{/if}
