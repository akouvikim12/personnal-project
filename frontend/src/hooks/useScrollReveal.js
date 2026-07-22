import { useEffect, useRef, useState } from 'react';

export default function useScrollReveal(threshold = 0.2) {
  const ref = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return undefined;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          // Attend deux frames avant de révéler l'élément : garantit que le
          // navigateur a bien peint l'état initial (opacity: 0) au moins une
          // fois. Sans ce délai, un élément déjà dans le viewport au montage
          // (ex: page courte, contenu au-dessus de la ligne de flottaison)
          // bascule à opacity: 1 avant le premier paint et la transition
          // CSS ne joue jamais.
          requestAnimationFrame(() => {
            requestAnimationFrame(() => setIsVisible(true));
          });
          observer.unobserve(node);
        }
      },
      { threshold }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [threshold]);

  return [ref, isVisible];
}
