export default function Avatar({
  src,
  alt,
  className,
}: {
  src: string;
  alt: string;
  className?: string;
}) {
      return <img className={className} alt={alt} src={src} />;
}
