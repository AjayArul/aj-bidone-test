import { writable } from 'svelte/store';

export interface User {
  isAuthenticated: boolean;
  role: 'admin' | 'user' | null;
  token: string | null; // i will do in future - JWT token support.
  userName: string | null;
}

export const defaultUser: User = {
  isAuthenticated: false,
  role: null,
  token: null,
  userName: null,
};

export const user = writable<User>({ ...defaultUser });

if (typeof window !== 'undefined') {
  const stored = localStorage.getItem('user');
  if (stored) {
    try {
      const parsed = JSON.parse(stored);
      user.set({ ...defaultUser, ...parsed, isAuthenticated: true });
    } catch (err) {
      console.error('Invalid user data');
    }
  }
}
