import { fetchArticles } from '$lib/api/articleService';
import { articles, error, loading } from '$lib/stores/articleStore';
import { parseStatus } from '$lib/utils/helper';
import type { ArticleQuery } from '$lib/utils/types';
import type { PageLoad } from './$types';

export const load: PageLoad = async ({ url }) => {
  const search = url.searchParams.get('search') ?? undefined;
  const status = parseStatus(url.searchParams.get('status'));
  const pageParam = Number(url.searchParams.get('page') ?? '1');
  const perPageParam = Number(url.searchParams.get('perPage') ?? '10');
  const page = Number.isFinite(pageParam) && pageParam > 0 ? pageParam : 1;
  const limit = Number.isFinite(perPageParam) && perPageParam > 0 ? perPageParam : 10;

  try {
    loading.set(true);
    const filterQuery: ArticleQuery = { search, status, page, limit };
    const items = await fetchArticles(filterQuery);
    const total = items?.length;
    const totalPages = Math.max(1, Math.ceil(total / limit));
    const currentPage = Math.min(Math.max(1, page), totalPages);
    const start = (currentPage - 1) * limit;
    // const articles = all.slice(start, start + perPage);
    articles.set(items ?? []);
    error && error.set(null);
  } catch (err) {
    error.set(String(err));
    articles.set([]);
  } finally {
    loading.set(false);
  }
};
