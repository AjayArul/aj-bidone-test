import { PUBLIC_BASE_URL } from '$env/static/public';
import { apiCall } from '$lib/utils/apiCall';
import type { Article, ArticleQuery } from '$lib/utils/types';

const BASE = PUBLIC_BASE_URL ? `${PUBLIC_BASE_URL}/articles` : 'http://localhost:3000/articles';

// Fetch list
export async function fetchArticles(query: ArticleQuery): Promise<Article[]> {
  const params = new URLSearchParams();
  Object.entries(query).forEach(([k, v]) => v !== undefined && params.set(k, String(v)));
  params.append('orderby', 'createdAt');
  params.append('order', 'desc');

  return apiCall<Article[]>(`${BASE}?${params.toString()}`);
}

// Create
export async function createArticle(payload: Omit<Article, 'id'>): Promise<Article> {
  return apiCall<Article>(`${BASE}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });
}
