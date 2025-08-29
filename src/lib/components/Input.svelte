<script lang="ts">
  export let name: string;
  export let label: string;
  export let value: string = '';
  export let type: 'text' | 'email' | 'password' | 'search' | 'select' = 'text';
  export let required = false;
  export let id = `input-${Math.random().toString(36).slice(2)}`;
  export let className = '';
  export let placeholder = '';
  export let options: { label: string; value: string }[] = [];
  export let error: string | null = null;
</script>

<div class={`mb-4 flex flex-col ${className}`}>
  <label for={id} class="mb-1 text-sm font-medium">{label}</label>

  {#if type === 'select'}
    <select
      {id}
      {name}
      bind:value
      on:select
      {required}
      class="rounded-lg border p-2 text-gray-700 focus:ring-2 focus:ring-blue-400 focus:outline-none"
    >
      {#each options as opt}
        <option value={opt.value}>{opt.label}</option>
      {/each}
    </select>
  {:else}
    <input
      {id}
      {name}
      {type}
      bind:value
      on:input
      {required}
      {placeholder}
      class="rounded-lg border p-2 text-gray-700 focus:ring-2 focus:ring-blue-400 focus:outline-none"
    />
  {/if}
  {#if error}
    <p class="mt-1 text-sm text-red-500">{error}</p>
  {/if}
</div>
