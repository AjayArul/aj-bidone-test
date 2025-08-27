<script lang="ts">
  export let onClick: () => void = () => {}; // optional click handler for mobile links
</script>

<nav class="flex flex-col space-y-4 md:flex-row md:space-y-0 md:space-x-8">
  <a href="/" class="transition hover:text-amber-400" on:click={onClick}>Home</a>
  <a href="/articles" class="transition hover:text-amber-400" on:click={onClick}>Articles</a>
</nav>
