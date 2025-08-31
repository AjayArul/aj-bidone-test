import { user } from '$lib/stores/user';

interface LoginResponse {
  token: string;
  role: 'admin' | 'user' | null;
  userName: string;
}

export async function login(username: string, password: string): Promise<void> {
  const res = await fetch('/api/login', {
    method: 'POST',
    body: JSON.stringify({ username, password }),
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (!res.ok) throw new Error('Login failed');

  const data: LoginResponse = await res.json();

  user.set({
    isAuthenticated: true,
    token: data.token,
    role: data.role,
    userName: data.userName,
  });

  localStorage.setItem('auth', JSON.stringify(data));
}
