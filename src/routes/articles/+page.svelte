<script lang="ts">
  import { onMount } from 'svelte';
  import { enhance } from '$app/forms';
  import { deleteArticleApi } from '$lib/api/articleService';
  import Button from '$lib/components/button/Button.svelte';
  import Input from '$lib/components/Input.svelte';
  import Modal from '$lib/components/Modal.svelte';
  import { addArticle, articles, error, loading, setArticles } from '$lib/stores/article';
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
    statusFilter = status || '';
    updateQueryParams({ status: status || undefined });
  }

  function openAdd() {
    editingArticle = null;
    showModal = true;
    formData = { ...formDataIni };
  }

  function closeAdd() {
    editingArticle = null;
    showModal = false;
    formData = { ...formDataIni };
  }

  function openEdit(article: Article) {
    editingArticle = article;
    formData = { ...article };
    showModal = true;
  }

  async function deleteArticle(id: number) {
    if (!confirm('Are you sure?')) return;
    const res = await deleteArticleApi(id);
    setArticles($articles?.filter((data) => data.id != id));
    addNotification('success', 'Article deleted successfully!');
  }
  
  onMount(() => {
    // This will only run on the client
    console.log('Component mounted in the client');
  });
</script>

<div class="p-6">
  <div class="mb-4 flex flex-col justify-end gap-2 md:flex-row md:items-center">
    <Button
      data-testid="addArticle"
      title="add article"
      variant="secondary" 
      className="flex items-center justify-center gap-2 h-10 w-full md:w-40"
      on:click={openAdd}
    >
      <Plus class="h-5 w-5" /> Add Article
    </Button>
  </div>

  <div class="mb-4 flex flex-col items-end gap-2 md:flex-row md:justify-between">
    <Input
      name="search"
      className="w-full md:w-auto"
      label="Search"
      type="search"
      placeholder="Search articles..."
      bind:value={search}
      on:input={handleInput}
    />
    <div class="mb-4 w-full md:w-auto">
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
  </div>

  <!-- TODO: Implement loading and error handling component -->
  {#if $loading}
    <p>Loading...</p>
  {/if}
  {#if $error}
    <p class="text-red-500">{$error}</p>
  {/if}

  {#if $articles?.length === 0}
    <p class="text-gray-500">No Articles!</p>
  {/if}

  <ul class="grid gap-4 md:grid-cols-1 xl:grid-cols-2">
    {#each $articles as article}
      <li
        class="mb-2 flex items-start justify-between gap-4 rounded-xl border border-gray-200 bg-white/60 p-5 shadow-md backdrop-blur-lg transition hover:shadow-lg"
      >
        <div class="flex-1">
          <h3 class="mb-1 text-lg font-semibold text-gray-900">{article.title}</h3>
          <p class="text-sm text-gray-700">
            <span
              class={`inline-block rounded-full px-3 py-0.5 text-xs font-medium text-white
          ${article.status === STATUS_PUBLISHED ? 'bg-green-500' : 'bg-sky-500'}`}
            >
              {article.status}
            </span>
            <span class="mx-2 text-gray-800">|</span>
            <span class="text-gray-500">{new Date(article.createdAt).toLocaleDateString()}</span>
            <span class="mx-2 text-gray-800">|</span>
            <span class="font-medium text-gray-800">{article.author}</span>
          </p>
        </div>

        <div class="flex items-center gap-2">
          <Button
            variant="primary"
            title="Edit article"
            aria-label="Edit article"
            on:click={() => openEdit(article)}
          >
            <PencilAlt class="h-5 w-5" />
          </Button>
          <Button
            variant="danger"
            title="Delete article"
            aria-label="Delete article"
            on:click={() => deleteArticle(article.id)}
          >
            <Trash class="h-5 w-5" />
          </Button>
        </div>
      </li>
    {/each}
  </ul>
</div>

<Modal bind:open={showModal} onClose={closeAdd}>
  <h2 class="mb-4 text-xl font-bold text-gray-700 modal">{editingArticle ? 'Edit' : 'Add'} Articless</h2>
  <form
    method="POST"
    class="mx-auto max-w-lg space-y-6 rounded-lg bg-white p-6 text-gray-700 shadow"
    use:enhance={(submit) => {
      return async ({ result }) => {
        if (result.type === 'success' && result?.data?.success) {
          addArticle(result?.data?.data as Article);
          closeAdd();
          addNotification('success', String(result?.data?.message) ?? '');
        } else if (result.type === 'failure') {
          formErrors = (result?.data as { errors: { [key: string]: string | null } }).errors;
        } else if (result.type === 'error') {
          addNotification('error', 'Server error');
        }
      };
    }}
  >
    <Input
      label="id"
      name="id"
      type="hidden"
      value={editingArticle ? String(editingArticle.id) : ''}
    />
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
    <Button type="submit" variant="primary">{editingArticle ? 'Update' : 'Create'}</Button>
    <Button on:click={closeAdd}>Cancel</Button>
  </form>
</Modal>
