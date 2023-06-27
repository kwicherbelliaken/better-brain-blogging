import React, { useEffect, useState } from "react";
import anime from "animejs";

import type { PropsWithChildren } from "react";

const DOM_NODES = Object.freeze({
  ANIMATION_CONTENT: "to-be-hidden",
});

const ANIMATION_PRESETS = Object.freeze({
  SCALE_TRANSLATION_ROTATION: {
    translateX: [
      { value: 250, duration: 2400 },
      { value: 0, duration: 1000 },
    ],
    translateY: [
      { value: -120, duration: 1200, delay: 1200 },
      { value: 0, duration: 2000, delay: 600 },
    ],
    scaleX: [
      { value: [1, 1.2], duration: 1200, easing: "easeOutExpo" },
      {
        value: [1.2, 1.6],
        duration: 1200,
        easing: "easeOutExpo",
      },
      { value: [1.6, 0.4], duration: 3000, delay: 1600 },
    ],
    scaleY: [
      { value: [1, 1.2], duration: 1200 },
      {
        value: [1.2, 1.6],
        duration: 1000,
        easing: "easeOutExpo",
      },
      { value: [1.6, 0.4], duration: 3000, delay: 1600 },
    ],
    rotate: [
      {
        value: -20,
        duration: 2400,
        delay: 1600,
      },
      {
        value: 0,
        duration: 1200,
        delay: 100,
      },
    ],
  },
  SCALE_TRANSLATION_SCALE: {
    translateX: [{ value: 250, duration: 2400 }],
    translateY: [{ value: 120, duration: 1200, delay: 800 }],
    scaleX: [
      { value: [1, 2.4], duration: 1200, easing: "easeOutExpo", delay: 2800 },
    ],
    scaleY: [{ value: [1, 2.4], duration: 1200, delay: 2800 }],
    rotate: [
      {
        value: 20,
        duration: 2400,
        delay: 1800,
      },
    ],
  },
});

const ANIMATION_TARGETS = Object.freeze({
  ROUNDED_STAR_SHAPE: {
    Component: (
      <path
        fill="red"
        d="M 652.195312 0.824219 C 646.875 1.125 630.167969 2.25 615.109375 3.296875 L 587.761719 5.246094 L 579.144531 8.996094 C 547.003906 23.164062 525.953125 36.507812 509.46875 53.152344 C 498.378906 64.398438 492.238281 73.09375 484.445312 88.835938 C 472.082031 113.652344 465.414062 135.917969 458.972656 174.300781 C 455.152344 196.792969 449.757812 240.199219 448.332031 259.242188 C 448.03125 263.0625 447.582031 265.914062 447.207031 265.613281 C 445.859375 264.265625 414.394531 181.347656 405.703125 156.234375 C 398.507812 135.46875 395.0625 128.121094 385.023438 112.300781 C 370.488281 89.4375 351.535156 67.769531 332.128906 51.953125 C 311.824219 35.386719 294.519531 26.988281 273.464844 23.464844 C 256.832031 20.691406 225.289062 22.714844 200.191406 28.1875 C 172.019531 34.335938 150.070312 46.03125 116.878906 72.792969 L 106.015625 81.566406 L 101.292969 93.109375 C 88.632812 123.847656 84.660156 146.714844 84.660156 189.070312 C 84.660156 206.089844 84.8125 208.414062 86.535156 216.582031 C 90.730469 236.449219 96.5 253.09375 105.265625 271.011719 C 115.902344 292.675781 128.339844 309.769531 147.222656 328.8125 C 181.160156 362.996094 217.5 385.9375 273.613281 408.578125 C 278.035156 410.378906 281.554688 411.953125 281.480469 412.027344 C 281.40625 412.101562 274.738281 411.203125 266.722656 410.078125 C 231.734375 404.90625 203.488281 402.582031 175.839844 402.582031 C 136.882812 402.582031 123.472656 405.730469 101.894531 420.046875 C 78.519531 435.640625 58.066406 459.707031 36.113281 497.492188 C 22.925781 520.28125 19.105469 528.226562 8.617188 555.441406 C -1.199219 580.628906 -2.324219 601.320312 4.195312 633.859375 C 6.816406 647.203125 14.535156 671.792969 21.652344 689.558594 C 35.289062 723.746094 48.472656 735.441406 88.183594 748.484375 C 111.410156 756.058594 109.011719 755.683594 130.8125 755.683594 C 181.085938 755.605469 214.5 751.109375 243.945312 740.3125 C 254.136719 736.566406 275.339844 725.996094 284.105469 720.222656 C 304.257812 706.953125 323.511719 687.160156 347.789062 654.847656 C 356.179688 643.679688 373.710938 617.964844 379.03125 608.894531 C 380.828125 605.894531 382.402344 603.570312 382.625 603.722656 C 382.925781 604.09375 380.976562 616.765625 369.964844 686.335938 L 361.648438 738.8125 L 361.574219 784.167969 C 361.5 816.707031 361.796875 831.851562 362.472656 837.773438 C 364.945312 859.214844 368.839844 875.257812 374.160156 886.5 C 376.855469 892.125 378.355469 894.148438 383.300781 898.945312 C 403.230469 918.0625 437.917969 935.53125 474.628906 944.976562 C 491.335938 949.25 497.855469 950.074219 507.445312 949.101562 C 552.097656 944.828125 585.289062 936.054688 616.15625 920.539062 C 634.511719 911.316406 633.390625 912.140625 644.101562 898.421875 C 657.664062 880.953125 662.535156 873.683594 667.929688 862.511719 C 676.621094 844.667969 681.414062 826.226562 685.386719 795.789062 C 686.507812 786.867188 686.585938 784.46875 685.835938 779.820312 C 682.613281 761.15625 673.847656 737.613281 658.1875 705.828125 C 640.65625 670.292969 624.175781 642.179688 586.265625 582.878906 C 585.441406 581.605469 587.988281 583.628906 591.957031 587.378906 C 615.78125 609.941406 645.902344 634.308594 681.789062 659.871094 C 706.363281 677.339844 716.027344 683.5625 727.117188 688.960938 C 745.546875 697.957031 760.605469 701.328125 786.304688 702.378906 C 798.816406 702.902344 827.210938 702.230469 834.328125 701.328125 C 836.429688 701.03125 843.019531 697.582031 856.058594 689.859375 C 901.835938 662.722656 912.023438 653.726562 938.921875 616.464844 C 946.039062 606.570312 946.113281 606.496094 946.9375 600.347656 C 947.460938 596.898438 949.484375 582.953125 951.507812 569.386719 C 956.304688 537.074219 957.277344 529.726562 958.324219 515.78125 C 960.199219 490.96875 957.351562 464.28125 950.609375 443.8125 C 949.035156 439.089844 948.585938 438.492188 930.605469 420.574219 C 919.742188 409.777344 909.625 400.40625 906.105469 397.933594 C 898.464844 392.535156 886.101562 386.386719 875.011719 382.488281 C 853.359375 374.917969 802.9375 364.570312 772.070312 361.347656 C 742.476562 358.273438 699.769531 358.273438 676.171875 361.347656 C 673.324219 361.722656 670.851562 361.871094 670.699219 361.722656 C 670.550781 361.574219 672.425781 360.898438 674.820312 360.222656 C 677.21875 359.546875 687.933594 355.949219 698.570312 352.203125 L 717.976562 345.453125 L 725.542969 339.382812 C 750.867188 318.839844 766.824219 303.847656 774.691406 293.125 C 786.378906 277.234375 798.667969 251.445312 804.585938 230.679688 C 808.632812 216.285156 812.152344 200.765625 814.027344 188.921875 C 815.75 178.273438 816.347656 152.261719 815.148438 141.464844 C 812.675781 118.449219 806.085938 94.234375 794.023438 64.023438 C 789.75 53.378906 788.851562 51.726562 783.234375 44.679688 C 754.386719 8.621094 718.949219 -3.222656 652.195312 0.824219 Z M 652.195312 0.824219"
        data-morph-path-one="M 170.479 65.6059 C 121.12 74.8021 67.1549 18.9678 26.3518 72.8315 C -2.6052 117.499 49.3857 152.614 49.3858 189.098 C 49.3859 234.423 -23.6648 259.384 7.9247 306.022 C 39.5141 352.66 111.248 294.198 156 306.022 C 200.752 317.846 208.649 378.935 247.478 373.68 C 286.307 368.425 277.093 302.081 308.682 288.286 C 340.272 274.492 375.152 301.424 392.921 265.296 C 410.69 229.168 346.195 203.55 348.169 172.02 C 350.144 140.49 426.485 122.097 406.741 89.2534 C 386.998 56.4096 331.716 100.42 308.682 80.0571 C 285.648 59.694 311.973 7.8009 261.956 0.5752 C 211.94 -6.6504 219.837 56.4096 170.479 65.6059 Z"
        data-morph-path-two="M 189,80.37 C 232.6,46.67 352.5,67.06 350.9,124.1 349.5,173.4 311.7,168 312.4,248.1 312.9,301.1 382.5,319.2 368.5,379.1 349.4,460.6 137.7,467.5 117.6,386.3 98.68,309.7 171.5,292.2 183.6,240.1 195.7,188.2 123.8,130.7 189,80.37 Z"
      />
    ),
    animate: (domNodes) => {
      anime({
        targets: domNodes["path"],
        ...ANIMATION_PRESETS.SCALE_TRANSLATION_ROTATION,
        easing: "easeOutElastic(1, .8)",
        loop: true,
      });

      // todo: perhaps go bright with a gradient map or something
      anime({
        targets: domNodes[DOM_NODES.ANIMATION_CONTENT],
        duration: 10,
        delay: 5000,
        opacity: 0,
        easing: "easeInOutQuad",
      });
    },
  },
  PEAR_SHAPE: {
    Component: (
      <path
        fill="red"
        d="M 189,80.37 C 232.6,46.67 352.5,67.06 350.9,124.1 349.5,173.4 311.7,168 312.4,248.1 312.9,301.1 382.5,319.2 368.5,379.1 349.4,460.6 137.7,467.5 117.6,386.3 98.68,309.7 171.5,292.2 183.6,240.1 195.7,188.2 123.8,130.7 189,80.37 Z"
      />
    ),
    animate: (domNodes) => {
      anime({
        targets: domNodes["path"],
        ...ANIMATION_PRESETS.SCALE_TRANSLATION_SCALE,
        easing: "easeOutElastic(1, .8)",
        loop: true,
      });
    },
  },
});

const FlowerBlobTransition = ({
  children,
  animationKey,
  classNamesProp,
}: PropsWithChildren<{
  animationKey: string;
  classNamesProp?: Array<string>;
}>) => {
  const randomisedAnimationType =
    Math.floor(Math.random() * 2) === 0 ? "ROUNDED_STAR_SHAPE" : "PEAR_SHAPE";

  const BackgroundImage = useGetBackgroundImage();

  const [animationType, setAnimationType] = useState<
    keyof typeof ANIMATION_TARGETS | null
  >(randomisedAnimationType);

  useEffect(() => {
    // only play the animation if this if the first time the page has loaded
    if (typeof window !== "undefined") {
      const animationHasPlayed = window.sessionStorage.getItem(
        `flowerBlobTransition-${animationKey}`
      );

      if (animationHasPlayed === "true") {
        setAnimationType(null);
      } else {
        window.sessionStorage.setItem(
          `flowerBlobTransition-${animationKey}`,
          "true"
        );
      }
    }

    // instantiate the animation
    const domNodes = {};

    domNodes["svg"] = document.querySelector("svg");
    domNodes["path"] = document.querySelector("path");

    domNodes[DOM_NODES.ANIMATION_CONTENT] =
      document.getElementById("to-be-hidden");

    // invoke the relevant animation
    animationType && ANIMATION_TARGETS[animationType].animate(domNodes);

    setTimeout(() => {
      // todo: determine a more accurate animation delay time (should be a composite)

      // remove animejs bindings
      anime.remove(domNodes["path"]);
      anime.remove(domNodes[DOM_NODES.ANIMATION_CONTENT]);

      // through a conditional render, don't show the animation content
      setAnimationType(null);
    }, 5000);
  }, []);

  return (
    <>
      {animationType ? (
        <>
          {/*<!-- before animation runs --> */}

          <div
            id={DOM_NODES.ANIMATION_CONTENT}
            className={"relative z-20 h-full w-full bg-black"}
          >
            <div className="relative">
              <svg
                id="shape"
                className="block w-full"
                preserveAspectRatio="none"
                viewBox="0 0 1280 1267"
              >
                <clipPath id="clip-shape">
                  {ANIMATION_TARGETS[animationType].Component}
                </clipPath>

                <g clipPath="url(#clip-shape)">{BackgroundImage}</g>
              </svg>
            </div>
          </div>
        </>
      ) : (
        <>{children}</>
      )}
    </>
  );
};

const useGetBackgroundImage = () => {
  const availableImages = [
    "../../_static/images/robot-baptism-head-in-towel.png",
    "../../_static/images/robot-baptism-head-in-bowl.png",
  ];

  const imageIndex = Math.floor(Math.random() * availableImages.length);

  return (
    <image
      className="block h-auto w-full"
      href={availableImages[imageIndex]}
      x="0"
      y="0"
    />
  );
};

export default FlowerBlobTransition;
