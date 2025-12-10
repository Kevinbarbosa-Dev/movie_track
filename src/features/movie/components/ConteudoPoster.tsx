import { CardTitle } from "@/components/ui/card";
import { generoStyleBadge, tituloStyle } from "@/styles/Reutilizaveis";
import type { ReactNode } from "react";

type ConteudoPosterProps = {
  children?: React.ReactNode;
  className?: string;
};

export function ConteudoTitulo({
  children,
  className = "",
}: ConteudoPosterProps) {
  return (
    <CardTitle className={`${tituloStyle}  ${className}`}>
      {children ?? "-"}
    </CardTitle>
  );
}

export function ConteudoSinopse({
  children,
  className = "",
}: ConteudoPosterProps) {
  return (
    <p
      className={`mt-2 text-sm text-gray-200 leading-relaxed max-h-[4.5rem] overflow-hidden ${className}`}
    >
      {children}
    </p>
  );
}

export function ConteudoNota({
  children,
  className = "",
}: ConteudoPosterProps) {
  return (
    <div
      className={`inline-flex items-center gap-2 pointer-events-auto ${className}`}
    >
      <span className="text-[10px] text-gray-300">Nota</span>
      <span className="text-xs font-semibold bg-black/50 px-2 py-0.5 rounded-md border border-white/10 text-white">
        {children ?? "—"}
      </span>
    </div>
  );
}

export function ConteudoGenero({
  children,
  className = "",
}: ConteudoPosterProps) {
  return <span className={`${generoStyleBadge} ${className}`}>{children}</span>;
}

export function ConteudoContainer({
  children,
  className = "",
}: ConteudoPosterProps) {
  return (
    <div
      className={`absolute bottom-0 left-0 right-0 p-2 z-10 space-y-4 rounded-md bg-black/30 ${className}`}
    >
      {children}
    </div>
  );
}

type ConteudoFooterProps = {
  nota?: ReactNode;
  generos?: string[];
  className?: string;
};

export function ConteudoFooter({
  nota,
  generos = [],
  className = "",
}: ConteudoFooterProps) {
  return (
    <div
      className={`mt-2 flex items-center justify-between gap-2 ${className}`}
    >
      {nota && <ConteudoNota>{nota}</ConteudoNota>}
      <div className="flex space-x-1">
        <div className="flex space-x-1">
          {generos.length > 0 ? (
            generos.map((g, idx) => (
              <ConteudoGenero key={idx}>{g}</ConteudoGenero>
            ))
          ) : (
            <span className={`${generoStyleBadge}`}>—</span>
          )}
        </div>
      </div>
    </div>
  );
}
