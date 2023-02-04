import { useEffect, useState } from "react";

const useCheckMobileScreen = (breakpoint = 1280) => {
  const [width, setWidth] = useState(0);
  const handleWindowSizeChange = () => {
    if (typeof window !== "undefined") {
      setWidth(window.innerWidth);
    }
  };

  useEffect(() => {
    window.addEventListener("resize", handleWindowSizeChange);
    window.addEventListener("load", handleWindowSizeChange);
    return () => {
      window.removeEventListener("resize", handleWindowSizeChange);
      window.removeEventListener("load", handleWindowSizeChange);
    };
  }, []);

  return width <= breakpoint;
};

export { useCheckMobileScreen };
