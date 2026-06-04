// src/lib/toast.ts
export { notify, dismiss, toasts } from '../design/state/toasts';
export type { Toast, ToastOptions } from '../design/state/toasts';

// keep window attachment for non-module scripts like MDX onClick attributes
import { notify } from '../design/state/toasts';
if (typeof window !== 'undefined') {
  (window as any).toast = { notify };
}
