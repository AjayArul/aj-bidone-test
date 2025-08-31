import { fetchArticles } from '$lib/api/articleService';
import { pageLimit } from '$lib/utils/configs';
import { writable } from 'svelte/store';
import type { Article, ArticleQuery } from '../utils/types';

export const articles = writable<Article[]>([]);
export const error = writable<string | null>(null);

export async function fetchArticlesStore(payload: ArticleQuery | {}) {
  let defaultPayload = {
    page: '1',
    limit: pageLimit,
  };
  try {
    const filterQuery: ArticleQuery | {} = { ...defaultPayload, ...payload };
    const items = await fetchArticles(filterQuery);
    articles.set(items ?? []);
    error && error.set(null);
  } catch (err) {
    error.set(String(err));
    articles.set([]);
  }
}

export function addArticle(article: Article) {
  articles.update((list) => {
    const index = list.findIndex((a) => a.id === article.id);
    if (article?.id && index !== -1) {
      // update existing
      const updated = [...list];
      updated[index] = article;
      return updated;
    }
    // add new
    let updated = [article, ...list];
    if (updated.length > pageLimit) {
      updated = updated.slice(0, pageLimit);
    }
    return updated;
  });
}

export function setArticles(list: Article[]) {
  articles.set(list);
}
