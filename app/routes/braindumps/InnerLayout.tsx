import { PropsWithChildren, useEffect, useState } from "react";

const _getRandomisedBorderRadius = () => {
  let borderRadius = "";

  for (let j = 0; j < 8; j++) {
    const nextBorderRadiusEntry = Math.floor(Math.random() * (80 - 20) + 20);

    if (j == 3 || j == 6) {
      borderRadius += j == 3 ? " 0% /" : " 0%";
    } else {
      borderRadius += ` ${nextBorderRadiusEntry}%`;
    }
  }

  return borderRadius;
};

const InnerLayout = ({ children }: PropsWithChildren<{}>) => {
  const [borderRadius, setBorderRadius] = useState(
    _getRandomisedBorderRadius()
  );

  useEffect(() => {
    /* 1. set shape transistion into effect on mount */
    // setBorderRadius(_getRandomisedBorderRadius());

    /* 2. retrigger shape transistion on each batched scroll */
    let debounce = true;
    const onScroll = () => {
      if (debounce) {
        debounce = false;
        setTimeout(() => {
          setBorderRadius(_getRandomisedBorderRadius());
          debounce = true;
        }, 1000);
      }
    };

    window.addEventListener("scroll", () => onScroll());

    /* 3. cleanup */
    return window.removeEventListener("scroll", () => onScroll());
  }, []);

  return (
    <div
      className={`transistion h-full w-full bg-white p-4 duration-1000 ease-out`}
      style={{ borderRadius: borderRadius }}
    >
      {children}
    </div>
  );
};

export default InnerLayout;
