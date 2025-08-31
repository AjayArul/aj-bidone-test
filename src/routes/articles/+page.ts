import { fetchArticles } from '$lib/api/articleService';
import { articles, error, fetchArticlesStore } from '$lib/stores/article';
import { loading } from '$lib/stores/global';
import { pageLimit } from '$lib/utils/configs';
import { parseStatus } from '$lib/utils/helper';
import type { ArticleQuery } from '$lib/utils/types';
import type { PageLoad } from './$types';

export const load: PageLoad = async ({ url }) => {
  const search = url.searchParams.get('search') ?? undefined;
  const status = parseStatus(url.searchParams.get('status'));
  const pageParam = Number(url.searchParams.get('page') ?? '1');
  const perPageParam = Number(url.searchParams.get('perPage') ?? pageLimit);
  const page = Number.isFinite(pageParam) && pageParam > 0 ? pageParam : 1;
  const limit = Number.isFinite(perPageParam) && perPageParam > 0 ? perPageParam : pageLimit;

  try {
    loading.set(true);
    const filterQuery: ArticleQuery = { search, status, page, limit };
    await fetchArticlesStore(filterQuery);
  } catch (err) {
    error.set(String(err));
    articles.set([]);
  } finally {
    loading.set(false);
    return {
      search,
      status,
      page,
      limit,
    };
  }
};
