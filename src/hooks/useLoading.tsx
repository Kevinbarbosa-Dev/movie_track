import { useCallback, useEffect, useState } from "react";
import { useLoadingTimer } from "./useLoadingTimer";

export function useLoading(
  intervalo: number,
  iniciarSeForVerdadeiro: boolean = false
) {
  const [estaCarregando, setEstaCarregando] = useState<boolean>(
    iniciarSeForVerdadeiro
  );

  const { ativarCarregamento: ativarTimer, limparTimer } =
    useLoadingTimer(intervalo);

  const ativarCarregamento = useCallback(
    (callback?: () => void) => {
      setEstaCarregando(true);
      ativarTimer(() => {
        setEstaCarregando(false);
        if (callback) callback();
      });
    },
    [ativarTimer]
  );

  useEffect(() => {
    if (iniciarSeForVerdadeiro) {
      ativarCarregamento();
    }

    return () => {
      limparTimer();
    };
  }, [iniciarSeForVerdadeiro, ativarCarregamento]);

  return { estaCarregando, ativarCarregamento };
}
