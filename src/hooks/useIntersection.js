import { useState, useEffect, useRef } from 'react';

export default function useIntersection(options = { threshold: 0.1, triggerOnce: true }) {
  const [isIntersecting, setIsIntersecting] = useState(false);
  const elementRef = useRef(null);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    const observer = new IntersectionObserver(([entry]) => {
      setIsIntersecting(entry.isIntersecting);
      
      if (entry.isIntersecting && options.triggerOnce) {
        observer.unobserve(element);
      }
    }, options);

    observer.observe(element);

    return () => {
      if (element && !options.triggerOnce) {
        observer.unobserve(element);
      }
    };
  }, [options.threshold, options.triggerOnce]);

  return [elementRef, isIntersecting];
}
