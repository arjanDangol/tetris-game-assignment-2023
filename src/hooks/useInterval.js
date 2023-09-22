import { useEffect, useRef } from "react";

export const useInterval = (callback, delay) => {
  const savedCallback = useRef();
  // Recall the most recent callback..
  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  // Sets the interval.
  useEffect(() => {
    const tick = () => {
      savedCallback.current();
    };
    if (delay !== null) {
      const id = setInterval(tick, delay);
      return () => {
        clearInterval(id);
      };
    }
  }, [delay]);
};
