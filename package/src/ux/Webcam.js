import { jsx as _jsx } from "react/jsx-runtime";
import React, { useEffect, useRef, useState } from 'react';
export default function ({ flipHorizontal = false, }) {
    const ref = useRef(null);
    const [style, setStyle] = useState({});
    useEffect(() => {
        let newStyle = {};
        if (flipHorizontal) {
            newStyle.transform = 'scale(-1, 1)';
        }
        setStyle(newStyle);
        return () => {
            setStyle({});
        };
    }, [flipHorizontal]);
    return (_jsx("video", { autoPlay: true, ref: ref, style: style }));
}
