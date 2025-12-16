type BannerImageProps = {
  url: string;
  titulo: string;
};

export default function BannerImage({ url, titulo }: BannerImageProps) {
  return (
    <img
      src={url}
      alt={titulo}
      loading="lazy"
      className="w-full h-full object-cover block"
    />
  );
}
