import { useEffect, useRef, useState } from 'react'

/**
 * Generic listener callback signature.
 */
export type Listener<V> = (newValue: V, oldValue: V) => void

/**
 * Store instance = dynamic record of values **plus** `on/off` helpers.
 */
export type StoreInstance<T extends Record<string, unknown>> = {
  on<K extends keyof T>(key: K, cb: Listener<T[K]>): void
  off<K extends keyof T>(key: K, cb: Listener<T[K]>): void
} & {
  [K in keyof T]: T[K]
}

function isJSON(str: unknown): str is string {
  if (typeof str !== 'string') return false
  try {
    JSON.parse(str)
    return true
  } catch {
    return false
  }
}

/**
 * Create a reactive wrapper around `localStorage`.
 *
 * @param prefix  Key‑namespace inside `localStorage` (default "user")
 * @param underlayment  Optional seed object (rarely needed)
 * @param preload  Values to write **once** if missing
 */
export function localStore<
  T extends Record<string, unknown> = Record<string, unknown>,
>(
  prefix = 'user',
  underlayment: Partial<T> = {},
  preload: Partial<T> = {},
): StoreInstance<T> {
  // --- internal helpers ----------------------------------------------------
  type Key = keyof T
  const lsKey = (k: Key) => `${prefix}.${String(k)}`

  const listeners = new Map<Key, Listener<any>[]>()

  // --- Proxy traps ---------------------------------------------------------
  const instance = new Proxy(underlayment as StoreInstance<T>, {
    set: (_obj, prop: string | symbol, value: unknown) => {
      if (typeof window === 'undefined' || typeof prop !== 'string') return false

      const key = prop as Key
      const storageKey = lsKey(key)

      const rawOld = localStorage.getItem(storageKey)
      const oldValue = isJSON(rawOld) ? JSON.parse(rawOld) : rawOld

      localStorage.setItem(storageKey, JSON.stringify(value))

      // broadcast change to other tabs/components
      window.dispatchEvent(
        new CustomEvent('store:change', {
          detail: { property: key, oldValue, newValue: value, prefix },
        }),
      )

      // local listeners
      ;(listeners.get(key) ?? []).forEach((cb) => cb(value, oldValue))

      return true
    },

    get: (_obj, prop: string | symbol) => {
      if (prop === 'on') {
        return <K extends Key>(key: K, cb: Listener<T[K]>) => {
          if (!listeners.has(key)) listeners.set(key, [])
          listeners.get(key)!.push(cb as Listener<any>)
        }
      }
      if (prop === 'off') {
        return <K extends Key>(key: K, cb: Listener<T[K]>) => {
          const list = listeners.get(key)
          if (!list) return
          const i = list.indexOf(cb as Listener<any>)
          if (i > -1) list.splice(i, 1)
        }
      }

      if (typeof prop !== 'string') return undefined

      const raw = localStorage.getItem(lsKey(prop as Key))
      return isJSON(raw) ? JSON.parse(raw) : raw
    },
  })

  // --- preload defaults ----------------------------------------------------
  Object.entries(preload).forEach(([k, v]) => {
    const key = k as Key
    if (instance[key] === undefined || instance[key] === null) {
      instance[key] = v as T[Key]
    }
  })

  return instance
}

/**
 * Convenience setter: write a default if no value exists yet.
 */
export function _default<
  T extends Record<string, unknown>,
  K extends keyof T,
>(key: K, value: T[K], instance: StoreInstance<T>): T[K] {
  if (instance[key] === undefined || instance[key] === null) {
    instance[key] = value
  }
  return value
}

/**
 * React hook wrapper that forces re‑render when the underlying store changes.
 */
export default function useLocalStore<
  T extends Record<string, unknown> = Record<string, unknown>,
>(
  prefix = 'user',
  preload: Partial<T> = {},
): StoreInstance<T> {
  const [, forceRender] = useState(0)
  const storeRef = useRef<StoreInstance<T>>(null)

  // instantiate exactly once (client‑side only)
  if (!storeRef.current && typeof window !== 'undefined') {
    storeRef.current = localStore<T>(prefix, {}, preload)
  }

  useEffect(() => {
    const rerender = () => forceRender((n) => n + 1)

    const onStoreChange = (e: any) => {
      if (e.detail?.prefix === prefix) rerender()
    }
    const onStorage = (e: StorageEvent) => {
      if (e.key?.startsWith(prefix + '.')) rerender()
    }

    window.addEventListener('store:change', onStoreChange)
    window.addEventListener('storage', onStorage)

    return () => {
      window.removeEventListener('store:change', onStoreChange)
      window.removeEventListener('storage', onStorage)
    }
  }, [prefix])

  // During SSR we still return a typed stub so callers compile fine.
  return (
    storeRef.current ??
    (new Proxy(
      {},
      {
        get: () => undefined,
        set: () => true,
      },
    ) as StoreInstance<T>)
  )
}
