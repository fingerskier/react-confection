// src/hook/useContacts.ts
import { useState, useCallback } from "react";
function useContacts() {
  const [contacts, setContacts] = useState([]);
  const [error, setError] = useState(null);
  const pickContacts = useCallback(async () => {
    if (!("contacts" in navigator && "ContactsManager" in window)) {
      setError("Contact Picker API is not supported on this device.");
      return;
    }
    try {
      const props = ["name", "email", "tel", "address", "icon"];
      const opts = { multiple: true };
      const selectedContacts = await navigator.contacts.select(props, opts);
      setContacts(selectedContacts);
    } catch (err) {
      setError(err.message);
    }
  }, []);
  return { contacts, error, pickContacts };
}

// src/hook/useDeviceOrientation.ts
import { useState as useState2, useEffect } from "react";
var useDeviceOrientation = () => {
  const [orientation, setOrientation] = useState2({
    alpha: null,
    beta: null,
    gamma: null
  });
  useEffect(() => {
    const handleOrientation = (event) => {
      setOrientation({
        alpha: event.alpha,
        beta: event.beta,
        gamma: event.gamma
      });
    };
    window.addEventListener("deviceorientation", handleOrientation);
    return () => {
      window.removeEventListener("deviceorientation", handleOrientation);
    };
  }, []);
  return orientation;
};
var useDeviceOrientation_default = useDeviceOrientation;

// src/hook/useGeoLocation.ts
import { useState as useState3, useEffect as useEffect2 } from "react";
var useGeolocation = () => {
  const [position, setPosition] = useState3(void 0);
  const [error, setError] = useState3(null);
  useEffect2(() => {
    if (!navigator.geolocation) {
      setError("Geolocation is not supported by your browser");
      return;
    }
    const onSuccess = (position2) => {
      const pos = position2;
      const result = {
        timestamp: new Date(pos.timestamp),
        latitude: pos.coords.latitude,
        longitude: pos.coords.longitude,
        accuracy: pos.coords.accuracy < 200 ? pos.coords.accuracy : 0,
        altitude: pos.coords.altitude || 0,
        altitudeAccuracy: pos.coords.altitudeAccuracy || 0,
        heading: pos.coords.heading,
        speed: pos.coords.speed
      };
      setPosition(result);
    };
    const onError = (error2) => {
      setError(error2.message);
    };
    navigator.geolocation.getCurrentPosition(onSuccess, onError);
    const watcher = navigator.geolocation.watchPosition(onSuccess, onError);
    return () => {
      navigator.geolocation.clearWatch(watcher);
    };
  }, []);
  return { position, error };
};
var useGeoLocation_default = useGeolocation;

// src/hook/useInterval.ts
import { useEffect as useEffect3, useRef } from "react";
function useInterval(callback, delay = 1e3) {
  const savedCallback = useRef(null);
  const id = useRef(null);
  useEffect3(() => {
    savedCallback.current = callback;
  }, [callback]);
  useEffect3(() => {
    function tick() {
      if (savedCallback.current) savedCallback.current();
    }
    if (delay !== null) {
      id.current = setInterval(tick, delay);
      return () => clearInterval(id.current);
    }
  }, [delay]);
  return function() {
    if (id.current) clearInterval(id.current);
  };
}

// src/hook/useLocalStorage.ts
import { useEffect as useEffect4, useState as useState4 } from "react";
function useLocalStorage(key, defaultValue) {
  const [storedValue, setStoredValue] = useState4(() => {
    const item = window.localStorage.getItem(key);
    try {
      const existingValue = item ? JSON.parse(item) : void 0;
      if (existingValue !== void 0) {
        return existingValue;
      } else {
        window.localStorage.setItem(key, JSON.stringify(defaultValue));
        return defaultValue;
      }
    } catch (error) {
      window.localStorage.setItem(key, JSON.stringify(defaultValue));
      return defaultValue;
    }
  });
  const setValue = (value) => {
    try {
      const newValue = value instanceof Function ? value(storedValue) : value;
      setStoredValue(newValue);
      window.localStorage.setItem(key, JSON.stringify(newValue));
      window.dispatchEvent(new CustomEvent("localStorageUpdate", { detail: { key, newValue } }));
    } catch (error) {
      console.error(error);
    }
  };
  useEffect4(() => {
    const handleStorageChange = (event) => {
      if (event.key === key) {
        try {
          setStoredValue(event.newValue ? JSON.parse(event.newValue) : defaultValue);
        } catch (error) {
          setStoredValue(defaultValue);
        }
      }
    };
    const handleCustomEvent = (event) => {
      if (event.detail.key === key) {
        setStoredValue(event.detail.newValue);
      }
    };
    window.addEventListener("storage", handleStorageChange);
    window.addEventListener("localStorageUpdate", handleCustomEvent);
    return () => {
      window.removeEventListener("storage", handleStorageChange);
      window.removeEventListener("localStorageUpdate", handleCustomEvent);
    };
  }, [key, defaultValue]);
  return [storedValue, setValue];
}
var useLocalStorage_default = useLocalStorage;

// src/hook/useLocalStore.ts
import { useEffect as useEffect5, useRef as useRef2, useState as useState5 } from "react";
function isJSON(str) {
  if (typeof str !== "string") return false;
  try {
    JSON.parse(str);
    return true;
  } catch {
    return false;
  }
}
function localStore(prefix = "user", underlayment = {}, preload = {}) {
  const lsKey = (k) => `${prefix}.${String(k)}`;
  const listeners = /* @__PURE__ */ new Map();
  const instance = new Proxy(underlayment, {
    set: (_obj, prop, value) => {
      if (typeof window === "undefined" || typeof prop !== "string") return false;
      const key = prop;
      const storageKey = lsKey(key);
      const rawOld = localStorage.getItem(storageKey);
      const oldValue = isJSON(rawOld) ? JSON.parse(rawOld) : rawOld;
      localStorage.setItem(storageKey, JSON.stringify(value));
      window.dispatchEvent(
        new CustomEvent("store:change", {
          detail: { property: key, oldValue, newValue: value, prefix }
        })
      );
      (listeners.get(key) ?? []).forEach((cb) => cb(value, oldValue));
      return true;
    },
    get: (_obj, prop) => {
      if (prop === "on") {
        return (key, cb) => {
          if (!listeners.has(key)) listeners.set(key, []);
          listeners.get(key).push(cb);
        };
      }
      if (prop === "off") {
        return (key, cb) => {
          const list = listeners.get(key);
          if (!list) return;
          const i = list.indexOf(cb);
          if (i > -1) list.splice(i, 1);
        };
      }
      if (typeof prop !== "string") return void 0;
      const raw = localStorage.getItem(lsKey(prop));
      return isJSON(raw) ? JSON.parse(raw) : raw;
    }
  });
  Object.entries(preload).forEach(([k, v]) => {
    const key = k;
    if (instance[key] === void 0 || instance[key] === null) {
      instance[key] = v;
    }
  });
  return instance;
}
function _default(key, value, instance) {
  if (instance[key] === void 0 || instance[key] === null) {
    instance[key] = value;
  }
  return value;
}
function useLocalStore(prefix = "user", preload = {}) {
  const [, forceRender] = useState5(0);
  const storeRef = useRef2(null);
  if (!storeRef.current && typeof window !== "undefined") {
    storeRef.current = localStore(prefix, {}, preload);
  }
  useEffect5(() => {
    const rerender = () => forceRender((n) => n + 1);
    const onStoreChange = (e) => {
      if (e.detail?.prefix === prefix) rerender();
    };
    const onStorage = (e) => {
      if (e.key?.startsWith(prefix + ".")) rerender();
    };
    window.addEventListener("store:change", onStoreChange);
    window.addEventListener("storage", onStorage);
    return () => {
      window.removeEventListener("store:change", onStoreChange);
      window.removeEventListener("storage", onStorage);
    };
  }, [prefix]);
  return storeRef.current ?? new Proxy(
    {},
    {
      get: () => void 0,
      set: () => true
    }
  );
}

// src/hook/useNotification.ts
import { useState as useState6 } from "react";
function useNotification() {
  const [permission, setPermission] = useState6(null);
  function notify(msg, options) {
    if (!("Notification" in window)) return;
    if (permission === "granted") {
      new Notification(msg, options);
    } else if (permission !== "denied") {
      Notification.requestPermission().then((result) => {
        setPermission(result);
        if (result === "granted") {
          new Notification(msg, options);
        }
      }).catch(console.error);
    }
  }
  return [notify, permission];
}

// src/hook/usePictureInPicture.ts
import { useState as useState7, useEffect as useEffect6, useCallback as useCallback2 } from "react";
function usePictureInPicture(options = { width: 320, height: 240 }) {
  const [isPiP, setIsPiP] = useState7(false);
  const [pipWindow, setPipWindow] = useState7(null);
  const [isSupported, setIsSupported] = useState7(false);
  useEffect6(() => {
    setIsSupported("documentPictureInPicture" in window);
  }, []);
  const enterPiP = useCallback2(async (element) => {
    if (!isSupported) return;
    try {
      const newPipWindow = await documentPictureInPicture.requestWindow(options);
      const styles = Array.from(document.styleSheets);
      styles.forEach((styleSheet) => {
        try {
          if (styleSheet.href) {
            const link = newPipWindow.document.createElement("link");
            link.rel = "stylesheet";
            link.href = styleSheet.href;
            newPipWindow.document.head.appendChild(link);
          } else {
            const style = newPipWindow.document.createElement("style");
            Array.from(styleSheet.cssRules).forEach((rule) => {
              style.appendChild(newPipWindow.document.createTextNode(rule.cssText));
            });
            newPipWindow.document.head.appendChild(style);
          }
        } catch (e) {
          console.warn("Could not copy stylesheet:", e);
        }
      });
      const clone = element.cloneNode(true);
      newPipWindow.document.body.appendChild(clone);
      setPipWindow(newPipWindow);
      setIsPiP(true);
      newPipWindow.addEventListener("pagehide", () => {
        setIsPiP(false);
        setPipWindow(null);
      });
    } catch (error) {
      console.error("Failed to enter PiP mode:", error);
    }
  }, [isSupported, options]);
  const exitPiP = useCallback2(async () => {
    if (!isPiP) return;
    try {
      await document.exitPictureInPicture();
      setIsPiP(false);
      setPipWindow(null);
    } catch (error) {
      console.error("Failed to exit PiP mode:", error);
    }
  }, [isPiP]);
  const togglePiP = useCallback2(async (element) => {
    if (isPiP) {
      await exitPiP();
    } else {
      await enterPiP(element);
    }
  }, [isPiP, enterPiP, exitPiP]);
  return {
    isPiP,
    isSupported,
    pipWindow,
    enterPiP,
    exitPiP,
    togglePiP
  };
}

// src/hook/useScreenOrientation.ts
import { useState as useState8, useEffect as useEffect7 } from "react";
var useScreenOrientation = () => {
  const [orientation, setOrientation] = useState8({
    angle: window.screen.orientation?.angle || 0,
    type: window.screen.orientation?.type || "unknown"
  });
  useEffect7(() => {
    const handleOrientationChange = () => {
      setOrientation({
        angle: window.screen.orientation.angle,
        type: window.screen.orientation.type
      });
    };
    window.screen.orientation?.addEventListener("change", handleOrientationChange);
    return () => {
      window.screen.orientation?.removeEventListener("change", handleOrientationChange);
    };
  }, []);
  return orientation;
};
var useScreenOrientation_default = useScreenOrientation;

// src/hook/useTimeout.ts
import { useEffect as useEffect8, useRef as useRef3 } from "react";
function useTimeout(callback, delay = 1e3) {
  const id = useRef3(null);
  const start = () => {
    id.current = setTimeout(callback, delay);
  };
  const stop = () => {
    if (id.current) clearTimeout(id.current);
  };
  useEffect8(() => {
    return () => {
      stop();
    };
  }, []);
  return [start, stop];
}

// src/hook/useWait.ts
import { useEffect as useEffect9, useState as useState9 } from "react";
function useWait(condition, timeoutSeconds = 60, intervalMilliseconds = 100) {
  const [done, setDone] = useState9(false);
  const [timeout, setTimeoutState] = useState9(false);
  let ticker;
  const [startSafety, cancelSafety] = useTimeout(() => {
    setTimeoutState(true);
  }, timeoutSeconds * 1e3);
  useEffect9(() => {
    return () => {
      cancelSafety();
      clearInterval(ticker);
    };
  }, []);
  useEffect9(() => {
    if (condition) {
      setDone(true);
    }
  }, [condition]);
  return done;
}

// src/hook/useWebcam.ts
import { useEffect as useEffect10, useState as useState10 } from "react";
function useWebcam(videoRef) {
  const [picBase64, setPicBase64] = useState10("");
  useEffect10(() => {
    if (navigator.mediaDevices.getUserMedia) {
      navigator.mediaDevices.getUserMedia({ video: true }).then(function(stream) {
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          requestAnimationFrame(() => {
            update();
          });
        }
      }).catch(function(err0r) {
        console.error("Something went wrong!", err0r);
      });
    }
  }, []);
  const update = () => {
    if (!videoRef.current) return;
    const canvas = document.createElement("canvas");
    canvas.width = videoRef.current.videoWidth;
    canvas.height = videoRef.current.videoHeight;
    canvas.getContext("2d")?.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);
    setPicBase64(canvas.toDataURL().slice("data:image/png;base64,".length));
  };
  return { picBase64, update };
}

// src/hook/useWebSocket.ts
import { useEffect as useEffect11, useRef as useRef4, useState as useState11 } from "react";
function useWebSocket(url, altUrl) {
  const ws = useRef4(null);
  const [data, setData] = useState11("");
  const [error, setError] = useState11(0);
  const [state, setState] = useState11({});
  const cancelInterval = useInterval(() => {
    if (state.type === "open") {
      cancelInterval();
    } else if (altUrl) {
      fetch(altUrl).then((res) => res.json()).then((res) => setData(JSON.parse(res))).catch(() => {
        cancelInterval();
      });
    }
  }, 250);
  function transmit(data2) {
    const msg = JSON.stringify(data2);
    try {
      if (ws.current && ws.current.readyState === 1) {
        try {
          ws.current.send(msg);
        } catch (error2) {
          console.error(error2);
        }
      }
    } catch (err) {
      console.error(err);
    }
  }
  useEffect11(() => {
    try {
      ws.current = new WebSocket(url);
      ws.current.onerror = function(event) {
        console.error("error", event);
        setError(event);
      };
      ws.current.onclose = function(event) {
        const newState = { ...state };
        newState.code = event.code || state.code;
        newState.eventPhase = event.eventPhase || state.eventPhase;
        newState.isTrusted = event.isTrusted || state.isTrusted;
        newState.readyState = ws.current?.readyState ?? state.readyState;
        newState.reason = event.reason || state.reason;
        newState.returnValue = event.returnValue || state.returnValue;
        newState.timeStamp = event.timeStamp || state.timeStamp;
        newState.type = event.type || state.type;
        newState.wasClean = event.wasClean || state.wasClean;
        setState(newState);
        console.error("attempting web-socket reconnect");
        setTimeout(() => {
          ws.current = new WebSocket(url);
        }, 357);
      };
      ws.current.onopen = function(event) {
        const newState = { ...state };
        newState.isTrusted = event.isTrusted || state.isTrusted;
        newState.readyState = ws.current?.readyState ?? state.readyState;
        newState.returnValue = event.returnValue || state.returnValue;
        newState.timeStamp = event.timeStamp || state.timeStamp;
        newState.type = event.type || state.type;
        setState(newState);
      };
      ws.current.onmessage = function(event) {
        setData(JSON.parse(event.data));
      };
    } catch (err) {
      console.error(err);
    }
    return () => {
      try {
        if (ws.current) {
          ws.current.onclose = null;
          ws.current.close();
        }
        cancelInterval();
      } catch (err) {
        console.error(err);
      }
    };
  }, []);
  return { data, error, state, transmit };
}

// src/lib/UrlProvider.tsx
import { createContext, useContext, useEffect as useEffect12, useState as useState12 } from "react";
import { jsx } from "react/jsx-runtime";
var UrlContext = createContext(void 0);
function UrlProvider({ children }) {
  const [context, setContext] = useState12("");
  const [query, setQuery] = useState12({});
  const goto = (path, Q, replaceQuery = false) => {
    let newQuery;
    if (replaceQuery) {
      newQuery = Q ?? null;
    } else {
      newQuery = {
        ...query,
        ...Q ?? {}
      };
    }
    const queryString = newQuery ? new URLSearchParams(newQuery).toString() : "";
    let newUrl = queryString ? `?${queryString}` : "";
    if (path) {
      newUrl += `#${path}`;
    } else {
      newUrl += `#${context}`;
    }
    window.history.pushState({}, "", newUrl);
    handleHashChange();
  };
  const handleHashChange = () => {
    const hash = window.location.hash.slice(1);
    const queryString = window.location.search;
    const newContext = hash.includes("/") ? hash.split("/") : hash;
    const newQuery = new URLSearchParams(queryString);
    const trimmedContext = Array.isArray(newContext) ? newContext.map((item) => item.trim()).join("/") : newContext.trim();
    const queryObj = Object.fromEntries(newQuery.entries());
    setContext(trimmedContext);
    setQuery(queryObj);
  };
  useEffect12(() => {
    window.addEventListener("hashchange", handleHashChange);
    handleHashChange();
    return () => {
      window.removeEventListener("hashchange", handleHashChange);
    };
  }, []);
  const value = { context, query, goto };
  return /* @__PURE__ */ jsx(UrlContext.Provider, { value, children });
}
function useUrl() {
  const context = useContext(UrlContext);
  if (context === void 0) {
    throw new Error("useUrl must be used within a UrlProvider");
  }
  return context;
}

// src/ux/PictureInPicture.tsx
import { useRef as useRef5 } from "react";
import { jsx as jsx2, jsxs } from "react/jsx-runtime";
function PictureInPicture({
  children,
  width = 320,
  height = 240,
  onPiPEnter,
  onPiPExit,
  className = "",
  controls = true
}) {
  const containerRef = useRef5(null);
  const { isPiP, isSupported, togglePiP } = usePictureInPicture({ width, height });
  const handleToggle = async () => {
    if (!containerRef.current) return;
    await togglePiP(containerRef.current);
    if (!isPiP && onPiPEnter) onPiPEnter();
    if (isPiP && onPiPExit) onPiPExit();
  };
  if (!isSupported) {
    return /* @__PURE__ */ jsxs("div", { className, children: [
      children,
      controls && /* @__PURE__ */ jsx2("button", { disabled: true, children: "PiP Not Supported" })
    ] });
  }
  return /* @__PURE__ */ jsxs("div", { ref: containerRef, className, children: [
    children,
    controls && /* @__PURE__ */ jsx2("button", { onClick: handleToggle, children: isPiP ? "Exit PiP Mode" : "Enter PiP Mode" })
  ] });
}

// src/ux/Webcam.tsx
import { useEffect as useEffect13, useRef as useRef6, useState as useState13 } from "react";
import { jsx as jsx3 } from "react/jsx-runtime";
function Webcam_default({
  flipHorizontal = false
}) {
  const ref = useRef6(null);
  const [style, setStyle] = useState13({});
  useEffect13(() => {
    let newStyle = {};
    if (flipHorizontal) {
      newStyle.transform = "scale(-1, 1)";
    }
    setStyle(newStyle);
    return () => {
      setStyle({});
    };
  }, [flipHorizontal]);
  return /* @__PURE__ */ jsx3(
    "video",
    {
      autoPlay: true,
      ref,
      style
    }
  );
}
export {
  PictureInPicture,
  UrlProvider,
  Webcam_default as Webcam,
  localStore,
  _default as localStoreDefault,
  useContacts,
  useDeviceOrientation_default as useDeviceOrientation,
  useGeoLocation_default as useGeoLocation,
  useInterval,
  useLocalStorage_default as useLocalStorage,
  useLocalStore,
  useNotification,
  usePictureInPicture,
  useScreenOrientation_default as useScreenOrientation,
  useTimeout,
  useUrl,
  useWait,
  useWebcam,
  useWebSocket as useWebsocket
};
