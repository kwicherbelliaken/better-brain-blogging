import React, { useEffect } from "react";
import classNames from "classnames";
import anime from "animejs";

import type { PropsWithChildren } from "react";

const MorphingTransition = ({
  children,
  classNameProps,
}: PropsWithChildren<{ classNameProps?: Array<string> }>) => {
  useEffect(() => {
    const domNodes = {};

    domNodes["introduction"] = document.getElementById("to-be-hidden");
    domNodes["shape"] = document.getElementById("shape");
    domNodes["path"] = document.querySelector("path");

    anime({
      targets: domNodes["introduction"],
      duration: 1100 * 2.5,
      easing: "easeInOutSine",
      translateY: "-200vh",
    });

    anime({
      targets: domNodes["shape"],
      scaleY: [{ value: 2.4, duration: 550 * 10, easing: "easeOutCirc" }],
    });

    anime({
      targets: domNodes["path"],
      duration: 1100,
      easing: "easeOutQuad",
      d: domNodes["path"].getAttribute("pathdata:id"),
    });

    return () => {
      /* 1. remove animejs bindings */
      anime.remove(domNodes["introduction"]);
      anime.remove(domNodes["shape"]);
      anime.remove(domNodes["path"]);
    };
  }, []);

  return (
    <>
      {/*<!-- before animation runs --> */}

      <div id="to-be-hidden" className="relative z-20 h-full w-full bg-black">
        <div className="relative flex h-full w-full flex-col flex-wrap items-center justify-center text-center" />

        <div className="relative">
          <svg
            id="shape"
            className="block w-full"
            preserveAspectRatio="none"
            viewBox="0 0 1440 800"
          >
            <path
              d="M -44,-50 C -52.71,28.52 15.86,8.186 184,14.69 383.3,22.39 462.5,12.58 638,14 835.5,15.6 987,6.4 1194,13.86 1661,30.68 1652,-36.74 1582,-140.1 1512,-243.5 15.88,-589.5 -44,-50 Z"
              pathdata:id="M -44,-50 C -137.1,117.4 67.86,445.5 236,452 435.3,459.7 500.5,242.6 676,244 873.5,245.6 957,522.4 1154,594 1593,753.7 1793,226.3 1582,-126 1371,-478.3 219.8,-524.2 -44,-50 Z"
            ></path>
          </svg>
        </div>
      </div>

      {/*<!-- after animation runs --> */}
      <div className="absolute top-0 left-0 h-full w-full">
        <div className="relative  h-full w-full ">{children}</div>
      </div>
    </>
  );
};

export default MorphingTransition;
