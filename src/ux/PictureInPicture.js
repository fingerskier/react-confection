import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useRef } from 'react';
import { usePictureInPicture } from '@hook/usePictureInPicture';
export const PictureInPicture = ({ children, width = 320, height = 240, onPiPEnter, onPiPExit, className = '', controls = true }) => {
    const containerRef = useRef(null);
    const { isPiP, isSupported, togglePiP } = usePictureInPicture({ width, height });
    const handleToggle = async () => {
        if (!containerRef.current)
            return;
        await togglePiP(containerRef.current);
        if (!isPiP && onPiPEnter)
            onPiPEnter();
        if (isPiP && onPiPExit)
            onPiPExit();
    };
    if (!isSupported) {
        return (_jsxs("div", { className: className, children: [children, controls && (_jsx("button", { disabled: true, children: "PiP Not Supported" }))] }));
    }
    return (_jsxs("div", { ref: containerRef, className: className, children: [children, controls && (_jsx("button", { onClick: handleToggle, children: isPiP ? 'Exit PiP Mode' : 'Enter PiP Mode' }))] }));
};
