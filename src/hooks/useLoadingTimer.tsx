import { useCallback, useRef } from "react";

export function useLoadingTimer(intervalo: number) {
  const referenciaDeTimerAtual = useRef<number | null>(null);

  const ativarCarregamento = useCallback(
    (callback?: () => void) => {
      if (referenciaDeTimerAtual.current) {
        window.clearTimeout(referenciaDeTimerAtual.current);
      }

      referenciaDeTimerAtual.current = window.setTimeout(() => {
        referenciaDeTimerAtual.current = null;
        if (callback) callback();
      }, intervalo);
    },
    [intervalo]
  );

  const limparTimer = useCallback(() => {
    if (referenciaDeTimerAtual.current) {
      clearTimeout(referenciaDeTimerAtual.current);
      referenciaDeTimerAtual.current = null;
    }
  }, []);

  return { ativarCarregamento, limparTimer };
}
