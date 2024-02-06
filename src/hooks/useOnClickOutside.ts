import { useEffect, RefObject } from "react";

type Event = MouseEvent | TouchEvent;

const useOnClickOutside = <T extends HTMLElement = HTMLElement>(
  
  ref: RefObject<T>,
  callback: (event: Event) => void
) => {
  useEffect(() => {
    const listener = (event: Event) => {
      if (!event.isTrusted) {
        return; // Игнорировать неявные (автоматические) события, например, из кода
      }
      const el = ref.current;
      if (!el || el.contains((event.target as Node) || null)) {
        return;
      }

      callback(event); // Call the callback only if the click is outside of the element passed.
    };
    // document.addEventListener("mouseup", listener)
    // document.addEventListener("touchcancel", listener)
    document.addEventListener("mousedown", listener, { passive: false });
    document.addEventListener("touchstart", listener, { passive: false });

    return () => {
      console.log("removeEventListener");
      // document.removeEventListener("mouseup", listener)
      // document.removeEventListener("touchcancel", listener)
      document.removeEventListener("mousedown", listener);
      document.removeEventListener("touchstart", listener);
    };
  }, [ref, callback]); // Reload only if ref or callback changes
};

export default useOnClickOutside;
