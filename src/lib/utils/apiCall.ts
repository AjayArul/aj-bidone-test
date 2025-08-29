import { ERROR_NOT_FOUND_404, ERROR_SERVER_500, ERROR_UNAUTHORIZED_401 } from './constants';

// API call with error handling
export async function apiCall<T>(req: RequestInfo, init?: RequestInit): Promise<T> {
  try {
    const res = await fetch(req, init);

    if (!res.ok) {
      if (res.status === 404) {
        throw new NotFoundError(ERROR_NOT_FOUND_404);
      }
      if (res.status === 401) {
        throw new UnauthorizedError(ERROR_UNAUTHORIZED_401);
      }
      if (res.status >= 500) {
        throw new ServerError(ERROR_SERVER_500);
      }

      // fallback
      const text = await res.text();
      throw new Error(text || res.statusText);
    }

    // parse JSON safely
    return (await res.json()) as T;
  } catch (err) {
    if (err instanceof Error) throw err;
    throw new Error('Unknown fetch error');
  }
}

// Custom error classes for better type checking
export class NotFoundError extends Error {}
export class UnauthorizedError extends Error {}
export class ServerError extends Error {}
