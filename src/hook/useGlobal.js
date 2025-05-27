import { useState } from 'react';
if (!window.Global) {
    window.Global = {};
}
export default function useGlobal(name, _default) {
    if (!window.Global[name]) {
        const state = useState(_default);
        window.Global[name] = state;
    }
    return window.Global[name];
}
