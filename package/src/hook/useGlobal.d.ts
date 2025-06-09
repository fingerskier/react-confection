declare global {
    interface Window {
        Global: Record<string, any>;
    }
}
export default function useGlobal<T>(name: string, _default: T): [T, React.Dispatch<React.SetStateAction<T>>];
