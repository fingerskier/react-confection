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
export default function usePictureInPicture(options?: PiPOptions): PiPResult;
export {};
