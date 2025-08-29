<script lang="ts">
  export let open = false;
  export let onClose: () => void;
</script>

{#if open}
  <div class="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
    <div class="w-full max-w-lg rounded-lg bg-white p-6 shadow">
      <button class="float-right text-gray-500" on:click={onClose}>✕</button>
      <slot />
    </div>
  </div>
{/if}
