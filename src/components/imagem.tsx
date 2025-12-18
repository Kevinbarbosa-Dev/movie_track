type imagemProps = {
  urlImage: string;
  title?: string;
  className?: string;
};

export default function Imagem({ urlImage, title, className }: imagemProps) {
  return (
    <img
      src={urlImage}
      alt={title}
      className={`w-full h-full object-cover ${className}`}
      loading="lazy"
    />
  );
}
