<script lang="ts">
  import { enhance } from '$app/forms';
  import { deleteArticleApi } from '$lib/api/articleService';
  import Button from '$lib/components/button/Button.svelte';
  import Input from '$lib/components/Input.svelte';
  import Modal from '$lib/components/Modal.svelte';
  import {
    addArticle,
    articles,
    error,
    fetchArticlesStore,
    setArticles,
  } from '$lib/stores/article';
  import { loading } from '$lib/stores/global';
  import { addNotification } from '$lib/stores/notifications';
  import { user } from '$lib/stores/user';
  import { pageLimit } from '$lib/utils/configs';
  import { STATUS_DRAFT, STATUS_PUBLISHED } from '$lib/utils/constants';
  import { debounce, updateQueryParams } from '$lib/utils/helper';
  import type { Article } from '$lib/utils/types';
  import type { ArticleFormData } from '$lib/utils/validators';
  import { onMount } from 'svelte';
  import { ChevronLeft, ChevronRight, PencilAlt, Plus, Refresh, Trash } from 'svelte-heros';

  export let data: { search: string; status: string; page: string; limit: string };

  const ALERT_WARNING = 'Are you sure?';
  const MSG_ARTICLE_DEL_SUCC = 'Article deleted successfully!';
  let formDataIni = {
    title: '',
    status: STATUS_DRAFT,
    author: '',
  };
  let formData: ArticleFormData = formDataIni;
  let formErrors: Record<string, string | null> | null = null;
  let search = data?.search || '';
  let statusFilter = data?.status || '';
  let showModal = false;
  let editingArticle: Article | null = null;
  let page = data?.page || '';
  let limit = data?.limit || String(pageLimit);
  let inputRef: HTMLInputElement;
  let debounceDelay = 500;

  let statusOptions = [
    { label: STATUS_PUBLISHED, value: STATUS_PUBLISHED },
    { label: STATUS_DRAFT, value: STATUS_DRAFT },
  ];

  const updateSearch = debounce((val: string) => {
    search = val;
    page = '1';
    fetchArticlesStore({ search: val?.trim(), page: '1' });
  }, debounceDelay);

  function handleInput(event: Event) {
    updateSearch((event.target as HTMLInputElement).value);
  }

  function handleBlur() {
    updateSearch.flush();
  }

  function handleKeydown(event: Event) {
    const keyboardEvent = event as KeyboardEvent;
    if (keyboardEvent.key === 'Enter') {
      updateSearch.flush();
    }
  }

  function setStatusFilter(status: typeof STATUS_DRAFT | typeof STATUS_PUBLISHED | undefined) {
    statusFilter = status || '';
    search = '';
    page = '1';
    updateQueryParams({ status: status || undefined, search: '', page: '1' });
  }

  async function handlePageChange(newPage: number) {
    page = newPage.toString();
    updateQueryParams({ page: newPage.toString(), limit });
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
    if (!confirm(ALERT_WARNING)) return;
    const res = await deleteArticleApi(id);
    setArticles($articles?.filter((data) => data.id != id));
    addNotification('success', MSG_ARTICLE_DEL_SUCC);
  }

  function refreshArticles() {
    fetchArticlesStore({});
  }

  onMount(() => {
    // TODO: Lazy-load for list component once move to reuseable component.
  });
</script>

<div class="p-6">
  {#if $user?.isAuthenticated}
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
  {/if}
  <div class="mb-4 flex flex-col items-end gap-2 md:flex-row md:justify-between">
    <Input
      name="search"
      className="w-full md:w-80"
      label="Search"
      type="search"
      placeholder="Search articles..."
      bind:value={search}
      on:input={handleInput}
      on:blur={handleBlur}
      on:keydown={handleKeydown}
      bind:ref={inputRef}
    />
    <div class="mb-4 w-full md:w-auto">
      <Button
        variant="outline"
        className={`${statusFilter === '' ? 'text-yellow-500' : 'text-white'}`}
        on:click={() => setStatusFilter(undefined)}>All</Button
      >
      <Button
        variant="outline"
        className={`${statusFilter === STATUS_PUBLISHED ? 'text-yellow-500' : 'text-white'}`}
        on:click={() => setStatusFilter(STATUS_PUBLISHED)}>Published</Button
      >
      <Button
        variant="outline"
        className={`${statusFilter === STATUS_DRAFT ? 'text-yellow-500' : 'text-white'}`}
        on:click={() => setStatusFilter(STATUS_DRAFT)}>Draft</Button
      >
    </div>
  </div>

  <!-- TODO: Move to reuseable commponent -->
  {#if $error || $articles?.length === 0}
    {#if $error}
      <p class="text-red-400">{$error}</p>
    {:else}
      <p class="text-gray-500">No Articles!</p>
    {/if}
  {:else}
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
          {#if $user.isAuthenticated && article?.id}
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
          {/if}
          {#if !article?.id}
            <Button
              title="Refresh to load new data"
              aria-label="Refresh to load new data"
              on:click={refreshArticles}
            >
              <Refresh class="h-5 w-5" />
            </Button>
          {/if}
        </li>
      {/each}
    </ul>
    <div class="flex justify-between">
      <Button on:click={() => handlePageChange(Number(page) - 1)} disabled={Number(page) <= 1}
        ><ChevronLeft class="h-10 w-5" /></Button
      >
      <Button
        on:click={() => {
          handlePageChange(Number(page) + 1);
        }}
        disabled={$articles?.length < Number(limit)}><ChevronRight class="h-10 w-5" /></Button
      >
    </div>
  {/if}
</div>

<Modal bind:open={showModal} onClose={closeAdd}>
  <h2 class="modal mb-4 text-xl font-bold text-gray-700">
    {editingArticle ? 'Edit' : 'Add'} Articless
  </h2>
  <form
    method="POST"
    class="mx-auto max-w-lg space-y-6 rounded-lg bg-white p-6 text-gray-700 shadow"
    use:enhance={(submit) => {
      loading.set(true);
      return async ({ result }) => {
        try {
          if (result.type === 'success' && result?.data?.success) {
            addArticle(result.data.data as Article);
            closeAdd();
            addNotification('success', String(result.data.message) ?? '');
          } else if (result.type === 'failure') {
            formErrors = (result?.data as { errors: Record<string, string | null> }).errors;
          } else if (result.type === 'error') {
            addNotification('error', 'Server error');
          }
        } finally {
          loading.set(false);
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
