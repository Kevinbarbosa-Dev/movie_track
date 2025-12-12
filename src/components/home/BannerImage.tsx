type BannerImageProps = {
  url: string;
  titulo: string;
};

export default function BannerImage({ url, titulo }: BannerImageProps) {
  return (
    <div className="w-full h-full relative">
      <img
        src={url}
        alt={titulo}
        loading="lazy"
        className="w-full h-full object-center block"
      />
    </div>
  );
}
