import { useEffect, useState } from "react";

const useCheckMobileScreen = (breakpoint = 1280) => {
  const [width, setWidth] = useState(0);

  const handleWindowSizeChange = () => {
    if (typeof window !== "undefined") {
      setWidth(window.innerWidth);
    }
  };

  useEffect(() => {
    handleWindowSizeChange();
  }, []);

  useEffect(() => {
    window.addEventListener("resize", handleWindowSizeChange);

    return () => {
      window.removeEventListener("resize", handleWindowSizeChange);
    };
  });

  return width <= breakpoint;
};

export { useCheckMobileScreen };
