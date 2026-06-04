/**
 * src/design/state/store.ts
 * A zero-dependency, vanilla TypeScript reactive state management system.
 * Uses a simple Publish-Subscribe (Observer) pattern.
 */

export type Subscriber<T> = (value: T) => void;
export type Unsubscriber = () => void;

export interface Store<T> {
  get: () => T;
  set: (value: T) => void;
  update: (updater: (value: T) => T) => void;
  subscribe: (subscriber: Subscriber<T>) => Unsubscriber;
}

/**
 * Creates a basic reactive store.
 */
export function createStore<T>(initialValue: T): Store<T> {
  let value = initialValue;
  const subscribers = new Set<Subscriber<T>>();

  const get = () => value;

  const set = (newValue: T) => {
    if (value !== newValue) {
      value = newValue;
      subscribers.forEach((sub) => sub(value));
    }
  };

  const update = (updater: (value: T) => T) => {
    set(updater(value));
  };

  const subscribe = (subscriber: Subscriber<T>) => {
    // Immediately call subscriber with current value upon subscription
    subscriber(value);
    subscribers.add(subscriber);

    // Return an unsubscribe function
    return () => {
      subscribers.delete(subscriber);
    };
  };

  return { get, set, update, subscribe };
}

/**
 * Creates a reactive store that persists its value to localStorage.
 */
export function createPersistedStore<T>(key: string, initialValue: T): Store<T> {
  // Try to load initial value from localStorage if in a browser environment
  let startingValue = initialValue;
  if (typeof window !== 'undefined') {
    try {
      const stored = window.localStorage.getItem(key);
      if (stored !== null) {
        startingValue = JSON.parse(stored);
      }
    } catch (err) {
      console.warn(`Could not read localStorage key "${key}":`, err);
    }
  }

  const store = createStore<T>(startingValue);

  // Subscribe to changes and persist them
  if (typeof window !== 'undefined') {
    store.subscribe((val) => {
      try {
        window.localStorage.setItem(key, JSON.stringify(val));
      } catch (err) {
        console.warn(`Could not save localStorage key "${key}":`, err);
      }
    });
    
    // Optional: listen for storage events from other tabs
    window.addEventListener('storage', (e) => {
      if (e.key === key && e.newValue !== null) {
        try {
          store.set(JSON.parse(e.newValue));
        } catch (err) {}
      }
    });
  }

  return store;
}

/**
 * Creates a store derived from one or more other stores.
 * Currently implemented for deriving from a single store for simplicity.
 */
export function createDerived<T, U>(
  store: Store<T>,
  deriver: (value: T) => U
): Store<U> {
  // Initialize with the derived value
  const derivedStore = createStore<U>(deriver(store.get()));

  // Update the derived store whenever the source store changes
  store.subscribe((val) => {
    derivedStore.set(deriver(val));
  });

  // Override set/update to throw errors, as derived stores should be read-only
  const readOnlySet = () => {
    console.warn("Cannot 'set' a value on a derived store.");
  };

  return {
    get: derivedStore.get,
    set: readOnlySet,
    update: readOnlySet,
    subscribe: derivedStore.subscribe,
  };
}
