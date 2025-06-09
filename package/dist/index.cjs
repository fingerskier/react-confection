"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/index.tsx
var index_exports = {};
__export(index_exports, {
  PictureInPicture: () => PictureInPicture,
  UrlProvider: () => UrlProvider,
  Webcam: () => Webcam_default,
  localStore: () => localStore,
  localStoreDefault: () => _default,
  useContacts: () => useContacts,
  useDeviceOrientation: () => useDeviceOrientation_default,
  useGeoLocation: () => useGeoLocation_default,
  useInterval: () => useInterval,
  useLocalStorage: () => useLocalStorage_default,
  useLocalStore: () => useLocalStore,
  useNotification: () => useNotification,
  usePictureInPicture: () => usePictureInPicture,
  useScreenOrientation: () => useScreenOrientation_default,
  useTimeout: () => useTimeout,
  useUrl: () => useUrl,
  useWait: () => useWait,
  useWebcam: () => useWebcam,
  useWebsocket: () => useWebSocket
});
module.exports = __toCommonJS(index_exports);

// src/hook/useContacts.ts
var import_react = require("react");
function useContacts() {
  const [contacts, setContacts] = (0, import_react.useState)([]);
  const [error, setError] = (0, import_react.useState)(null);
  const pickContacts = (0, import_react.useCallback)(async () => {
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
var import_react2 = require("react");
var useDeviceOrientation = () => {
  const [orientation, setOrientation] = (0, import_react2.useState)({
    alpha: null,
    beta: null,
    gamma: null
  });
  (0, import_react2.useEffect)(() => {
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
var import_react3 = require("react");
var useGeolocation = () => {
  const [position, setPosition] = (0, import_react3.useState)(void 0);
  const [error, setError] = (0, import_react3.useState)(null);
  (0, import_react3.useEffect)(() => {
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
var import_react4 = require("react");
function useInterval(callback, delay = 1e3) {
  const savedCallback = (0, import_react4.useRef)(null);
  const id = (0, import_react4.useRef)(null);
  (0, import_react4.useEffect)(() => {
    savedCallback.current = callback;
  }, [callback]);
  (0, import_react4.useEffect)(() => {
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
var import_react5 = require("react");
function useLocalStorage(key, defaultValue) {
  const [storedValue, setStoredValue] = (0, import_react5.useState)(() => {
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
  (0, import_react5.useEffect)(() => {
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
var import_react6 = require("react");
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
  const [, forceRender] = (0, import_react6.useState)(0);
  const storeRef = (0, import_react6.useRef)(null);
  if (!storeRef.current && typeof window !== "undefined") {
    storeRef.current = localStore(prefix, {}, preload);
  }
  (0, import_react6.useEffect)(() => {
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
var import_react7 = require("react");
function useNotification() {
  const [permission, setPermission] = (0, import_react7.useState)(null);
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
var import_react8 = require("react");
function usePictureInPicture(options = { width: 320, height: 240 }) {
  const [isPiP, setIsPiP] = (0, import_react8.useState)(false);
  const [pipWindow, setPipWindow] = (0, import_react8.useState)(null);
  const [isSupported, setIsSupported] = (0, import_react8.useState)(false);
  (0, import_react8.useEffect)(() => {
    setIsSupported("documentPictureInPicture" in window);
  }, []);
  const enterPiP = (0, import_react8.useCallback)(async (element) => {
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
  const exitPiP = (0, import_react8.useCallback)(async () => {
    if (!isPiP) return;
    try {
      await document.exitPictureInPicture();
      setIsPiP(false);
      setPipWindow(null);
    } catch (error) {
      console.error("Failed to exit PiP mode:", error);
    }
  }, [isPiP]);
  const togglePiP = (0, import_react8.useCallback)(async (element) => {
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
var import_react9 = require("react");
var useScreenOrientation = () => {
  const [orientation, setOrientation] = (0, import_react9.useState)({
    angle: window.screen.orientation?.angle || 0,
    type: window.screen.orientation?.type || "unknown"
  });
  (0, import_react9.useEffect)(() => {
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
var import_react10 = require("react");
function useTimeout(callback, delay = 1e3) {
  const id = (0, import_react10.useRef)(null);
  const start = () => {
    id.current = setTimeout(callback, delay);
  };
  const stop = () => {
    if (id.current) clearTimeout(id.current);
  };
  (0, import_react10.useEffect)(() => {
    return () => {
      stop();
    };
  }, []);
  return [start, stop];
}

// src/hook/useWait.ts
var import_react11 = require("react");
function useWait(condition, timeoutSeconds = 60, intervalMilliseconds = 100) {
  const [done, setDone] = (0, import_react11.useState)(false);
  const [timeout, setTimeoutState] = (0, import_react11.useState)(false);
  let ticker;
  const [startSafety, cancelSafety] = useTimeout(() => {
    setTimeoutState(true);
  }, timeoutSeconds * 1e3);
  (0, import_react11.useEffect)(() => {
    return () => {
      cancelSafety();
      clearInterval(ticker);
    };
  }, []);
  (0, import_react11.useEffect)(() => {
    if (condition) {
      setDone(true);
    }
  }, [condition]);
  return done;
}

// src/hook/useWebcam.ts
var import_react12 = require("react");
function useWebcam(videoRef) {
  const [picBase64, setPicBase64] = (0, import_react12.useState)("");
  (0, import_react12.useEffect)(() => {
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
var import_react13 = require("react");
function useWebSocket(url, altUrl) {
  const ws = (0, import_react13.useRef)(null);
  const [data, setData] = (0, import_react13.useState)("");
  const [error, setError] = (0, import_react13.useState)(0);
  const [state, setState] = (0, import_react13.useState)({});
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
  (0, import_react13.useEffect)(() => {
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
var import_react14 = require("react");
var import_jsx_runtime = require("react/jsx-runtime");
var UrlContext = (0, import_react14.createContext)(void 0);
function UrlProvider({ children }) {
  const [context, setContext] = (0, import_react14.useState)("");
  const [query, setQuery] = (0, import_react14.useState)({});
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
  (0, import_react14.useEffect)(() => {
    window.addEventListener("hashchange", handleHashChange);
    handleHashChange();
    return () => {
      window.removeEventListener("hashchange", handleHashChange);
    };
  }, []);
  const value = { context, query, goto };
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(UrlContext.Provider, { value, children });
}
function useUrl() {
  const context = (0, import_react14.useContext)(UrlContext);
  if (context === void 0) {
    throw new Error("useUrl must be used within a UrlProvider");
  }
  return context;
}

// src/ux/PictureInPicture.tsx
var import_react15 = require("react");
var import_jsx_runtime2 = require("react/jsx-runtime");
function PictureInPicture({
  children,
  width = 320,
  height = 240,
  onPiPEnter,
  onPiPExit,
  className = "",
  controls = true
}) {
  const containerRef = (0, import_react15.useRef)(null);
  const { isPiP, isSupported, togglePiP } = usePictureInPicture({ width, height });
  const handleToggle = async () => {
    if (!containerRef.current) return;
    await togglePiP(containerRef.current);
    if (!isPiP && onPiPEnter) onPiPEnter();
    if (isPiP && onPiPExit) onPiPExit();
  };
  if (!isSupported) {
    return /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { className, children: [
      children,
      controls && /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("button", { disabled: true, children: "PiP Not Supported" })
    ] });
  }
  return /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { ref: containerRef, className, children: [
    children,
    controls && /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("button", { onClick: handleToggle, children: isPiP ? "Exit PiP Mode" : "Enter PiP Mode" })
  ] });
}

// src/ux/Webcam.tsx
var import_react16 = require("react");
var import_jsx_runtime3 = require("react/jsx-runtime");
function Webcam_default({
  flipHorizontal = false
}) {
  const ref = (0, import_react16.useRef)(null);
  const [style, setStyle] = (0, import_react16.useState)({});
  (0, import_react16.useEffect)(() => {
    let newStyle = {};
    if (flipHorizontal) {
      newStyle.transform = "scale(-1, 1)";
    }
    setStyle(newStyle);
    return () => {
      setStyle({});
    };
  }, [flipHorizontal]);
  return /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(
    "video",
    {
      autoPlay: true,
      ref,
      style
    }
  );
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  PictureInPicture,
  UrlProvider,
  Webcam,
  localStore,
  localStoreDefault,
  useContacts,
  useDeviceOrientation,
  useGeoLocation,
  useInterval,
  useLocalStorage,
  useLocalStore,
  useNotification,
  usePictureInPicture,
  useScreenOrientation,
  useTimeout,
  useUrl,
  useWait,
  useWebcam,
  useWebsocket
});
