/**
 * src/design/state/createStore.ts
 */

export interface Store<T> {
  get(): T;
  set(value: T): void;
  subscribe(callback: (value: T) => void): () => void;
}

export function createStore<T>(initial: T): Store<T> {
  let value = initial;
  const listeners = new Set<(value: T) => void>();

  return {
    get: () => value,

    set(next) {
      value = next;
      listeners.forEach(fn => fn(value));
    },

    subscribe(fn) {
      listeners.add(fn);
      return () => listeners.delete(fn);
    }
  };
}