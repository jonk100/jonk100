/**
 * src/lib/toast.ts
 * Global Toast API for triggering transient feedback.
 */

export interface ToastOptions {
  title?: string;
  message: string;
  theme?: 'default' | 'primary' | 'success' | 'warning' | 'danger' | 'accent';
  duration?: number;
}

class ToastManager {
  private container: HTMLElement | null = null;

  constructor() {
    // We delay container check until first notify call since it might not be in DOM yet
  }

  private ensureContainer() {
    if (this.container) return;
    this.container = document.querySelector('.toast-container');
    if (!this.container) {
      this.container = document.createElement('div');
      this.container.className = 'toast-container';
      document.body.appendChild(this.container);
    }
  }

  notify(options: ToastOptions) {
    if (typeof document === 'undefined') return;
    this.ensureContainer();

    const { title, message, theme = 'default', duration = 5000 } = options;
    const toast = document.createElement('div');
    
    // Reuse Alert classes for consistent styling
    toast.className = `toast-item alert variant--${theme} animate-slide-up`;
    toast.innerHTML = `
      <div class="alert-body">
        ${title ? `<h5 class="alert-title">${title}</h5>` : ''}
        <div class="alert-content">${message}</div>
      </div>
    `;

    this.container!.appendChild(toast);

    setTimeout(() => {
      toast.classList.add('animate-fade-out');
      setTimeout(() => toast.remove(), 300);
    }, duration);
  }
}

export const toast = new ToastManager();

// Attach to window for easy access in non-module scripts
if (typeof window !== 'undefined') {
  (window as any).toast = toast;
}
