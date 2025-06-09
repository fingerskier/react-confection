import { Dispatch, SetStateAction, RefObject, ReactNode } from 'react';
import * as react_jsx_runtime from 'react/jsx-runtime';

declare global {
    interface Navigator {
        contacts?: {
            select: (props: string[], opts: {
                multiple: boolean;
            }) => Promise<any[]>;
        };
    }
}
declare function useContacts(): {
    contacts: never[];
    error: string | null;
    pickContacts: () => Promise<void>;
};

declare const useDeviceOrientation: () => {
    alpha: number | null;
    beta: number | null;
    gamma: number | null;
};

declare const useGeolocation: () => {
    position: {
        timestamp: Date;
        latitude: number;
        longitude: number;
        accuracy: number;
        altitude: number;
        altitudeAccuracy: number;
        heading: number | null;
        speed: number | null;
    } | undefined;
    error: string | null;
};

declare function useInterval(callback: () => void, delay?: number): () => void;

declare function useLocalStorage<T>(key: string, defaultValue: T): [T, Dispatch<SetStateAction<T>>];

/**
 * Generic listener callback signature.
 */
type Listener<V> = (newValue: V, oldValue: V) => void;
/**
 * Store instance = dynamic record of values **plus** `on/off` helpers.
 */
type StoreInstance<T extends Record<string, unknown>> = {
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
declare function localStore<T extends Record<string, unknown> = Record<string, unknown>>(prefix?: string, underlayment?: Partial<T>, preload?: Partial<T>): StoreInstance<T>;
/**
 * Convenience setter: write a default if no value exists yet.
 */
declare function _default<T extends Record<string, unknown>, K extends keyof T>(key: K, value: T[K], instance: StoreInstance<T>): T[K];
/**
 * React hook wrapper that forces re‑render when the underlying store changes.
 */
declare function useLocalStore<T extends Record<string, unknown> = Record<string, unknown>>(prefix?: string, preload?: Partial<T>): StoreInstance<T>;

declare function useNotification(): readonly [(msg: string, options?: NotificationOptions) => void, NotificationPermission | null];

type PiPOptions = {
    width?: number;
    height?: number;
};
type PiPResult = {
    isPiP: boolean;
    isSupported: boolean;
    pipWindow: Window | null;
    enterPiP: (element: HTMLElement) => Promise<void>;
    exitPiP: () => Promise<void>;
    togglePiP: (element: HTMLElement) => Promise<void>;
};
declare function usePictureInPicture(options?: PiPOptions): PiPResult;

type Orientation = {
    angle: number;
    type: string;
};
declare const useScreenOrientation: () => Orientation;

declare function useTimeout(callback: () => void, delay?: number): (() => void)[];

declare function useWait(condition: boolean, timeoutSeconds?: number, intervalMilliseconds?: number): Promise<void>;

interface WebcamResult {
    picBase64: string;
    update: (event?: Event) => void;
}
declare function useWebcam(videoRef: RefObject<HTMLVideoElement | null>): WebcamResult;

interface WebSocketState {
    [key: string]: any;
    type?: string;
    code?: number;
    eventPhase?: number;
    isTrusted?: boolean;
    readyState?: number;
    reason?: string;
    returnValue?: any;
    timeStamp?: number;
    wasClean?: boolean;
}
interface WebSocketResult {
    data: any;
    error: any;
    state: WebSocketState;
    transmit: (data: any) => void;
}
declare function useWebSocket(url: string, altUrl?: string): WebSocketResult;

interface UseUrlQuery {
    [k: string]: string;
}
interface UseUrlReturn {
    context: string | string[];
    query: UseUrlQuery;
    goto: (path?: string | null, newQuery?: UseUrlQuery | null, replace?: boolean) => void;
}
interface UrlProviderProps {
    children: ReactNode;
}
declare function UrlProvider({ children }: UrlProviderProps): react_jsx_runtime.JSX.Element;
declare function useUrl(): UseUrlReturn;

type PictureInPictureProps = {
    children: ReactNode;
    width?: number;
    height?: number;
    onPiPEnter?: () => void;
    onPiPExit?: () => void;
    className?: string;
    controls?: boolean;
};
declare function PictureInPicture({ children, width, height, onPiPEnter, onPiPExit, className, controls }: PictureInPictureProps): react_jsx_runtime.JSX.Element;

declare function export_default({ flipHorizontal, }: {
    flipHorizontal?: boolean | undefined;
}): react_jsx_runtime.JSX.Element;

export { PictureInPicture, UrlProvider, export_default as Webcam, localStore, _default as localStoreDefault, useContacts, useDeviceOrientation, useGeolocation as useGeoLocation, useInterval, useLocalStorage, useLocalStore, useNotification, usePictureInPicture, useScreenOrientation, useTimeout, useUrl, useWait, useWebcam, useWebSocket as useWebsocket };
