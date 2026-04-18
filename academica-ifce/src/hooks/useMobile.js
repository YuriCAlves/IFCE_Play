import { useState, useEffect } from 'react';

/**
 * Hook para detectar se a tela está em modo mobile (< 768px)
 * @returns {boolean} isMobile
 */
export function useMobile() {
  const [isMobile, setIsMobile] = useState(
    typeof window !== 'undefined' ? window.innerWidth < 768 : false
  );

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return isMobile;
}
