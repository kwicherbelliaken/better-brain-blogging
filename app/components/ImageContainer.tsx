const ImageContainer = ({ src }: { src: string }) => (
  <img className="h-auto max-w-full" alt="..." src={src} loading="lazy" />
);

export default ImageContainer;
