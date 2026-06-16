import { useEffect, useRef } from 'react';

export const usePolling = (callback: () => Promise<void> | void, interval: number) => {
  const savedCallback = useRef(callback);

  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  useEffect(() => {
    const tick = () => {
      savedCallback.current();
    };

    if (interval > 0) {
      const id = setInterval(tick, interval);
      // Initial call
      tick();
      return () => clearInterval(id);
    }
  }, [interval]);
};
