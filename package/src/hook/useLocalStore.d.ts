/**
 * Generic listener callback signature.
 */
export type Listener<V> = (newValue: V, oldValue: V) => void;
/**
 * Store instance = dynamic record of values **plus** `on/off` helpers.
 */
export type StoreInstance<T extends Record<string, unknown>> = {
    on<K extends keyof T>(key: K, cb: Listener<T[K]>): void;
    off<K extends keyof T>(key: K, cb: Listener<T[K]>): void;
} & {
    [K in keyof T]: T[K];
};
/**
 * Create a reactive wrapper around `localStorage`.
 *
 * @param prefix  Key‑namespace inside `localStorage` (default "user")
 * @param underlayment  Optional seed object (rarely needed)
 * @param preload  Values to write **once** if missing
 */
export declare function localStore<T extends Record<string, unknown> = Record<string, unknown>>(prefix?: string, underlayment?: Partial<T>, preload?: Partial<T>): StoreInstance<T>;
/**
 * Convenience setter: write a default if no value exists yet.
 */
export declare function _default<T extends Record<string, unknown>, K extends keyof T>(key: K, value: T[K], instance: StoreInstance<T>): T[K];
/**
 * React hook wrapper that forces re‑render when the underlying store changes.
 */
export default function useLocalStore<T extends Record<string, unknown> = Record<string, unknown>>(prefix?: string, preload?: Partial<T>): StoreInstance<T>;
