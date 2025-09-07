import { useEffect, useRef } from 'react';

type Measure<T> = () => T;
type Mutate<T> = (snap: T) => void;

export default function useScrollEvent(a: any, b?: any) {
  const ticking = useRef(false);
  const hasMeasureMutate = typeof b === 'function';
  const measure: Measure<any> = hasMeasureMutate ? a : () => null;
  const mutate: Mutate<any> = hasMeasureMutate ? b : a;

  useEffect(() => {
    let lastSnap: any;

    const handleScroll = () => {
      if (ticking.current) return;
      ticking.current = true;

      lastSnap = measure();

      requestAnimationFrame(() => {
        mutate(lastSnap);
        ticking.current = false;
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [measure, mutate]);
}
