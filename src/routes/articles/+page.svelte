<script lang="ts">
  import { enhance } from '$app/forms';
  import Button from '$lib/components/Button.svelte';
  import Input from '$lib/components/Input.svelte';
  import Modal from '$lib/components/Modal.svelte';
  import { addArticle, articles, error, loading } from '$lib/stores/article';
  import { addNotification } from '$lib/stores/notifications';
  import { STATUS_DRAFT, STATUS_PUBLISHED } from '$lib/utils/constants';
  import { debounce, updateQueryParams } from '$lib/utils/helper';
  import type { Article } from '$lib/utils/types';
  import type { ArticleFormData } from '$lib/utils/validators';
  import { PencilAlt, Plus, Trash } from 'svelte-heros';

  export let data: { search: string; status: string };

  let formDataIni = {
    title: '',
    status: STATUS_DRAFT,
    author: '',
    content: '',
  };

  let formData: ArticleFormData = formDataIni;
  let formErrors: Record<string, string | null> | null = null;
  let search = data?.search || '';
  let statusFilter = data?.status || '';
  let showModal = false;
  let editingArticle: Article | null = null;

  let statusOptions = [
    { label: STATUS_PUBLISHED, value: STATUS_PUBLISHED },
    { label: STATUS_DRAFT, value: STATUS_DRAFT },
  ];

  const updateSearch = debounce((val: string) => {
    search = val;
    updateQueryParams({ search: val || undefined });
  }, 1000);

  function handleInput(event: Event) {
    updateSearch((event.target as HTMLInputElement).value);
  }

  function setStatusFilter(status: typeof STATUS_DRAFT | typeof STATUS_PUBLISHED | undefined) {
    console.log('Setting status filter to:', status);
    statusFilter = status || '';
    updateQueryParams({ status: status || undefined });
  }

  function openAdd() {
    editingArticle = null;
    showModal = true;
  }
  function closeAdd() {
    editingArticle = null;
    showModal = false;
    formData = { ...formDataIni };
  }

  function openEdit(article: Article) {
    // TODO: Implement edit article functionality
  }

  async function deleteArticle(id: number) {
    // TODO: Implement delete article functionality
  }
</script>

<div class="p-6">
  <div class="mb-4 flex flex-col items-start gap-2 sm:flex-row sm:items-center sm:justify-between">
    <Input
      name="search"
      className="w-full md:w-80"
      label="Search"
      type="search"
      placeholder="Search articles..."
      bind:value={search}
      on:input={handleInput}
    />
    <Button
      variant="secondary"
      className="flex items-center justify-center gap-2 h-10 w-full md:w-40"
      on:click={openAdd}
    >
      <Plus class="h-5 w-5" /> Add Article
    </Button>
  </div>

  <div class="mb-4 flex justify-end gap-2">
    <Button
      variant="outline"
      className={`${statusFilter === '' ? 'text-orange-400' : 'text-white'}`}
      on:click={() => setStatusFilter(undefined)}>All</Button
    >
    <Button
      variant="outline"
      className={`${statusFilter === STATUS_PUBLISHED ? 'text-orange-400' : 'text-white'}`}
      on:click={() => setStatusFilter(STATUS_PUBLISHED)}>Published</Button
    >
    <Button
      variant="outline"
      className={`${statusFilter === STATUS_DRAFT ? 'text-orange-400' : 'text-white'}`}
      on:click={() => setStatusFilter(STATUS_DRAFT)}>Draft</Button
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

<Modal bind:open={showModal} onClose={closeAdd}>
  <h2 class="mb-4 text-xl font-bold text-gray-700">{editingArticle ? 'Edit' : 'Add'} Article</h2>
  <form
    method="POST"
    class="mx-auto max-w-lg space-y-6 rounded-lg bg-white p-6 text-gray-700 shadow"
    use:enhance={(submit) => {
      return async ({ result }) => {
        if (result.type === 'success') {
          addArticle(result?.data?.data as Article);
          closeAdd();
          addNotification('success', 'Article saved successfully!');
        } else if (result.type === 'failure') {
          formErrors = (result?.data as { errors: { [key: string]: string | null } }).errors;
        } else if (result.type === 'error') {
          addNotification('error', 'Server error');
        }
      };
    }}
  >
    <Input
      label="Title"
      name="title"
      bind:value={formData.title}
      error={formErrors?.title || ''}
      required
    />
    <Input
      label="Author"
      name="author"
      bind:value={formData.author}
      error={formErrors?.author || ''}
      required
    />
    <Input
      name="status"
      type="select"
      options={statusOptions}
      label="Author"
      bind:value={formData.status}
      error={formErrors?.status || ''}
      required
    />
    <Button type="submit" variant="primary">Save</Button>
    <Button on:click={closeAdd}>Cancel</Button>
  </form>
</Modal>
