// src/design/state/toasts.ts

import { createStore } from './store';

export interface Toast {
  id: string;
  title?: string;
  message: string;
  theme?: 'default' | 'primary' | 'success' | 'warning' | 'danger' | 'accent';
  duration?: number;
}

export type ToastOptions = Omit<Toast, 'id'>;

export const toasts = createStore<Toast[]>([]);

export function notify(options: ToastOptions) {
  const toast: Toast = {
    id: crypto.randomUUID(),
    duration: 5000,
    theme: 'default',
    ...options,
  };

  toasts.update(current => [...current, toast]);

  if (toast.duration && toast.duration > 0) {
    setTimeout(() => {
      dismiss(toast.id);
    }, toast.duration);
  }
}

export function dismiss(id: string) {
  toasts.update(current => current.filter(t => t.id !== id));
}
