const ImageContainer = ({ src }: { src: string }) => (
  <div className="h-auto w-full p-12">
    <img className="h-auto max-w-full" alt="..." src={src} loading="lazy" />
  </div>
);

export default ImageContainer;
