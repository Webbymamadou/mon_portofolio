import { useState, useEffect } from 'react';

export default function useScroll() {
  const [scrollY, setScrollY] = useState(0);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isAwake, setIsAwake] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setScrollY(currentScrollY);
      
      // Port of jQuery scroll window logic in main.js:
      // currentScrollY > 150 -> scrolled
      // currentScrollY > 350 -> awake
      setIsScrolled(currentScrollY > 150);
      setIsAwake(currentScrollY > 350);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Trigger initial scroll check
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return { scrollY, isScrolled, isAwake };
}
