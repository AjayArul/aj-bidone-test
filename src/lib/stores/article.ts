import { writable } from 'svelte/store';
import type { Article } from '../utils/types';

export const articles = writable<Article[]>([]);
export const loading = writable(false);
export const error = writable<string | null>(null);

export function addArticle(article: Article) {
  articles.update((list) => [article, ...list]);
}

export function setArticles(list: Article[]) {
  articles.set(list);
}
