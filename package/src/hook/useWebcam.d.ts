import type { RefObject } from 'react';
interface WebcamResult {
    picBase64: string;
    update: (event?: Event) => void;
}
export default function useWebcam(videoRef: RefObject<HTMLVideoElement | null>): WebcamResult;
export {};
