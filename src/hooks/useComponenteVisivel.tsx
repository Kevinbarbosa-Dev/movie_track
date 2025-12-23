// hooks/useComponenteVisivel.ts
import { useState, useEffect, useRef } from "react";

export function useComponenteVisivel<T extends Element = HTMLDivElement>(
  options?: IntersectionObserverInit
) {
  const [estaVisivel, setEstaVisivel] = useState(false);
  const [jaCarregado, setJaCarregado] = useState(false);
  const elementoQueSeraObservado = useRef<T | null>(null);

  const optionsRef = useRef<IntersectionObserverInit | undefined>(options);
  useEffect(() => {
    optionsRef.current = options;
  }, [options]);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      // atualiza visibilidade
      setEstaVisivel(entry.isIntersecting);
      // marca como já carregado quando entrar na viewport (apenas uma vez)
      if (entry.isIntersecting) {
        setJaCarregado((prev) => prev || true);
      }
    }, optionsRef.current ?? { threshold: 0.1 });

    const el = elementoQueSeraObservado.current;
    if (el) observer.observe(el);

    return () => {
      if (el) observer.unobserve(el);
      observer.disconnect();
    };
    // observe somente no mount/unmount: não incluir `options` por referência
  }, []);

  return { elementoQueSeraObservado, estaVisivel, jaCarregado };
}
