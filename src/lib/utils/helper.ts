import { goto } from '$app/navigation';
import type { ArticleStatus } from '$lib/utils/types';
import type { ZodError } from 'zod';

// Parse and validate ArticleStatus from string
export function parseStatus(value: string | null): ArticleStatus | undefined {
  return value === 'Published' || value === 'Draft' ? value : undefined;
}

// Safely parse error message from fetch Response
export async function safeParseError(res: Response): Promise<string> {
  try {
    const data = await res.json();
    return data?.message || res.statusText;
  } catch {
    return res.statusText || 'Unknown error';
  }
}

// Debounce function to limit the rate of function calls
export function debounce<T extends (...args: any[]) => void>(fn: T, delay = 300) {
  let timeout: ReturnType<typeof setTimeout>;
  return (...args: Parameters<T>) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => fn(...args), delay);
  };
}

// Update URL query parameters without reloading the page
interface QueryParamUpdates {
  [key: string]: string | undefined;
}
export function updateQueryParams(updates: QueryParamUpdates): void {
  const params = new URLSearchParams(window.location.search);

  Object.entries(updates).forEach(([key, value]) => {
    if (value) params.set(key, value);
    else params.delete(key);
  });

  goto(`?${params.toString()}`);
}

// Form validation with Zod
export function getZodFieldErrors(issues: ZodError['issues']) {
  const errors: Record<string, string> = {};

  for (const issue of issues) {
    const path = issue.path[0];
    if (typeof path === 'string' && !errors[path]) {
      errors[path] = issue.message;
    }
  }

  return errors;
}
