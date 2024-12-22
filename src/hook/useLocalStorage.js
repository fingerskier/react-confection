import { useEffect, useState } from 'react'


function useLocalStorage(key, defaultValue) {
  const [storedValue, setStoredValue] = useState(() => {
    const item = window.localStorage.getItem(key);
    
    try {
      const existingValue = JSON.parse(item);
      
      if (existingValue) {
        return existingValue;
      } else {
        window.localStorage.setItem(key, JSON.stringify(defaultValue));
        return defaultValue;
      }
    } catch (error) {
      window.localStorage.setItem(key, JSON.stringify(defaultValue));
      return defaultValue;
    }
  })
  
  const setValue = value => {
    try {
      const newValue = value instanceof Function ? value(storedValue) : value;

      setStoredValue(newValue);
      window.localStorage.setItem(key, JSON.stringify(newValue));

      // Dispatch a custom event to notify other components
      window.dispatchEvent(new CustomEvent('localStorageUpdate', { detail: { key, newValue } }));
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const handleStorageChange = event => {
      if (event.key === key) {
        try {
          setStoredValue(event.newValue ? JSON.parse(event.newValue) : defaultValue);
        } catch (error) {
          setStoredValue(defaultValue);
        }
      }
    };

    const handleCustomEvent = event => {
      if (event.detail.key === key) {
        setStoredValue(event.detail.newValue);
      }
    };

    window.addEventListener('storage', handleStorageChange);
    window.addEventListener('localStorageUpdate', handleCustomEvent);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('localStorageUpdate', handleCustomEvent);
    };
  }, [key, defaultValue]);
  
  return [storedValue, setValue]
}


const getItem = key=>{
  return JSON.parse(window.localStorage.getItem(key))
}


export default useLocalStorage

export {getItem}
