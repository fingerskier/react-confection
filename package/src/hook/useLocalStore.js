import { useEffect, useRef, useState } from 'react';
function isJSON(str) {
    if (typeof str !== 'string')
        return false;
    try {
        JSON.parse(str);
        return true;
    }
    catch {
        return false;
    }
}
/**
 * Create a reactive wrapper around `localStorage`.
 *
 * @param prefix  Key‑namespace inside `localStorage` (default "user")
 * @param underlayment  Optional seed object (rarely needed)
 * @param preload  Values to write **once** if missing
 */
export function localStore(prefix = 'user', underlayment = {}, preload = {}) {
    const lsKey = (k) => `${prefix}.${String(k)}`;
    const listeners = new Map();
    // --- Proxy traps ---------------------------------------------------------
    const instance = new Proxy(underlayment, {
        set: (_obj, prop, value) => {
            if (typeof window === 'undefined' || typeof prop !== 'string')
                return false;
            const key = prop;
            const storageKey = lsKey(key);
            const rawOld = localStorage.getItem(storageKey);
            const oldValue = isJSON(rawOld) ? JSON.parse(rawOld) : rawOld;
            localStorage.setItem(storageKey, JSON.stringify(value));
            // broadcast change to other tabs/components
            window.dispatchEvent(new CustomEvent('store:change', {
                detail: { property: key, oldValue, newValue: value, prefix },
            }));
            (listeners.get(key) ?? []).forEach((cb) => cb(value, oldValue));
            return true;
        },
        get: (_obj, prop) => {
            if (prop === 'on') {
                return (key, cb) => {
                    if (!listeners.has(key))
                        listeners.set(key, []);
                    listeners.get(key).push(cb);
                };
            }
            if (prop === 'off') {
                return (key, cb) => {
                    const list = listeners.get(key);
                    if (!list)
                        return;
                    const i = list.indexOf(cb);
                    if (i > -1)
                        list.splice(i, 1);
                };
            }
            if (typeof prop !== 'string')
                return undefined;
            const raw = localStorage.getItem(lsKey(prop));
            return isJSON(raw) ? JSON.parse(raw) : raw;
        },
    });
    // --- preload defaults ----------------------------------------------------
    Object.entries(preload).forEach(([k, v]) => {
        const key = k;
        if (instance[key] === undefined || instance[key] === null) {
            instance[key] = v;
        }
    });
    return instance;
}
/**
 * Convenience setter: write a default if no value exists yet.
 */
export function _default(key, value, instance) {
    if (instance[key] === undefined || instance[key] === null) {
        instance[key] = value;
    }
    return value;
}
/**
 * React hook wrapper that forces re‑render when the underlying store changes.
 */
export default function useLocalStore(prefix = 'user', preload = {}) {
    const [, forceRender] = useState(0);
    const storeRef = useRef(null);
    // instantiate exactly once (client‑side only)
    if (!storeRef.current && typeof window !== 'undefined') {
        storeRef.current = localStore(prefix, {}, preload);
    }
    useEffect(() => {
        const rerender = () => forceRender((n) => n + 1);
        const onStoreChange = (e) => {
            if (e.detail?.prefix === prefix)
                rerender();
        };
        const onStorage = (e) => {
            if (e.key?.startsWith(prefix + '.'))
                rerender();
        };
        window.addEventListener('store:change', onStoreChange);
        window.addEventListener('storage', onStorage);
        return () => {
            window.removeEventListener('store:change', onStoreChange);
            window.removeEventListener('storage', onStorage);
        };
    }, [prefix]);
    // During SSR we still return a typed stub so callers compile fine.
    return (storeRef.current ??
        new Proxy({}, {
            get: () => undefined,
            set: () => true,
        }));
}
