import { STATUS_DRAFT, STATUS_PUBLISHED } from '$lib/utils/constants';

export type ArticleStatus = typeof STATUS_DRAFT | typeof STATUS_PUBLISHED;

export type ButtonVariant =
  | 'primary'
  | 'secondary'
  | 'default'
  | 'danger'
  | 'success'
  | 'warning'
  | 'info'
  | 'outline';

export interface Article {
  id: number;
  title: string;
  status: ArticleStatus;
  author: string;
  createdAt: number;
}

export interface ArticleQuery {
  page?: number;
  limit?: number;
  search?: string;
  status?: ArticleStatus | '';
}

export interface TableColumn<T> {
  key: keyof T;
  label: string;
  class?: string;
}
