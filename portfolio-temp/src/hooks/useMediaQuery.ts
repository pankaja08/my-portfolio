import { useSyncExternalStore } from "react";

export function useMediaQuery(query: string): boolean {
  const subscribe = (callback: () => void) => {
    if (typeof window === "undefined") return () => {};
    
    const mediaQuery = window.matchMedia(query);
    
    const handler = () => callback();
    
    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener("change", handler);
      return () => mediaQuery.removeEventListener("change", handler);
    } else {
      // Fallback for older Safari
      mediaQuery.addListener(handler);
      return () => mediaQuery.removeListener(handler);
    }
  };

  const getSnapshot = () => {
    if (typeof window === "undefined") return false;
    return window.matchMedia(query).matches;
  };

  const getServerSnapshot = () => false;

  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}
