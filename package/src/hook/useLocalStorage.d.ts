import type { Dispatch, SetStateAction } from 'react';
declare function useLocalStorage<T>(key: string, defaultValue: T): [T, Dispatch<SetStateAction<T>>];
declare function getItem<T>(key: string): T | null;
export default useLocalStorage;
export { getItem };
