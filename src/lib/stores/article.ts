import { writable } from 'svelte/store';
import type { Article } from '../utils/types';

export const articles = writable<Article[]>([]);
export const loading = writable(false);
export const error = writable<string | null>(null);

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
    return [article, ...list];
  });
}

export function setArticles(list: Article[]) {
  articles.set(list);
}
