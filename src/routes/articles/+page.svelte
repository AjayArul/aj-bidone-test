<script lang="ts">
  import { goto } from '$app/navigation';
  import type { Article } from '$lib/utils/types';
  import { fetchArticles } from '$lib/api/articleService';
  import { articles, error, limit, loading, page } from '$lib/stores/articleStore';
  import Button from '$lib/components/Button.svelte';
  import Input from '$lib/components/Input.svelte';
  import { STATUS_DRAFT, STATUS_PUBLISHED } from '$lib/utils/constants';
  import { PencilAlt, Plus, Trash } from 'svelte-heros';

  let search = '';

  function setStatusFilter(status: string | undefined) {
    console.log('Setting status filter to:', status);
    const params = new URLSearchParams();
    if (status) params.set('status', status);
    goto(`?${params.toString()}`);
  }

  async function handlePageChange(newPage: number) {
    const data = await fetchArticles({ page: newPage, limit: $limit });
    articles.set(data);
    page.set(newPage);
  }

  function openAdd() {
    // TODO: Implement add article functionality
  }

  function openEdit(article: Article) {
    // TODO: Implement edit article functionality
  }

  async function deleteArticle(id: number) {
    // TODO: Implement delete article functionality
  }
</script>

<div class="p-6">
  <div class="mb-4 flex items-center justify-between">
    <Input label="Search" bind:value={search} />
    <Button variant="success" className="flex items-center gap-2 h-10" on:click={openAdd}>
      <Plus class="h-5 w-5" /> Add Article
    </Button>
  </div>

  <div class="mb-4 flex justify-end gap-2">
    <Button variant="outline" className="text-white" on:click={() => setStatusFilter('')}
      >All</Button
    >
    <Button
      variant="outline"
      className="text-white"
      on:click={() => setStatusFilter(STATUS_PUBLISHED)}>Published</Button
    >
    <Button variant="outline" className="text-white" on:click={() => setStatusFilter(STATUS_DRAFT)}
      >Draft</Button
    >
  </div>

  <!-- TODO: Implement loading and error handling component -->
  {#if $loading}
    <p>Loading...</p>
  {/if}
  {#if $error}
    <p class="text-red-500">{$error}</p>
  {/if}

  <ul class="grid gap-4 md:grid-cols-1 xl:grid-cols-2">
    {#each $articles as article}
      <li
        class="mb-2 flex items-center justify-between rounded-lg border border-gray-100 bg-white/40 p-4 shadow-sm backdrop-blur-md"
      >
        <div>
          <h3 class="font-semibold">{article.title}</h3>
          <p>{article.status} - {article.author}</p>
        </div>
        <div class="flex gap-2">
          <Button variant="primary" on:click={() => openEdit(article)}><PencilAlt /></Button>
          <Button variant="danger" on:click={() => deleteArticle(article.id)}><Trash /></Button>
        </div>
      </li>
    {/each}
  </ul>
</div>
