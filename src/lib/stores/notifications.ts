import { writable } from 'svelte/store';

export type NotificationType = 'success' | 'error' | 'warning' | 'info';

export interface Notification {
  id: number;
  type: NotificationType;
  message: string;
}

export const notifications = writable<Notification[]>([]);

let counter = 0;

export function addNotification(type: NotificationType, message: string, timeout = 3000) {
  console.log('Adding notification:', { type, message });
  const id = counter++;
  notifications.update((all) => [...all, { id, type, message }]);

  if (timeout > 0) {
    setTimeout(() => {
      notifications.update((all) => all.filter((n) => n.id !== id));
    }, timeout);
  }
}
