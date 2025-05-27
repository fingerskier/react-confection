import type { ReactNode } from 'react';
type PictureInPictureProps = {
    children: ReactNode;
    width?: number;
    height?: number;
    onPiPEnter?: () => void;
    onPiPExit?: () => void;
    className?: string;
    controls?: boolean;
};
export declare const PictureInPicture: ({ children, width, height, onPiPEnter, onPiPExit, className, controls }: PictureInPictureProps) => import("react/jsx-runtime").JSX.Element;
export {};
