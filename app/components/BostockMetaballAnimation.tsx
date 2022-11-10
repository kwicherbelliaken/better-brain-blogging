import BostockMetaballAnimationLibrary from "bostock-metaball-animation";
import { useEffect } from "react";

const BostockMetaballAnimation = () => {
  useEffect(() => {
    if (typeof window !== "undefined") {
      BostockMetaballAnimationLibrary({
        parentDOMNode: "bostock-metaball-animation-container",
      });
    }
  }, []);

  return (
    <div id="bostock-metaball-animation-container" className="absolute z-0" />
  );
};

export default BostockMetaballAnimation;

// TODO: refer to this page https://fontsinuse.com/uses/42929/avaline-wine

// TODO: make notes about the style loader under WEBPACK

// TODO: make a HOC that will detect if the window is loaded

// TODO: have a fallback for when the client hydrates

// TODO: determine if I can dynamically set the size of the canvas
