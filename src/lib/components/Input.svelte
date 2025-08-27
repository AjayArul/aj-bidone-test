<script lang="ts">
  export let label: string;
  export let value = '';
  export let type = 'text';
  export let required = false;
  export let id = `input-${Math.random().toString(36).slice(2)}`; // auto-generate unique id
</script>

<div class="mb-4 flex flex-col">
  <label for={id} class="mb-1 font-semibold">{label}</label>
  <input
    {id}
    {type}
    bind:value
    {required}
    class="rounded border p-2 focus:ring-2 focus:ring-blue-400 focus:outline-none"
  />
</div>
