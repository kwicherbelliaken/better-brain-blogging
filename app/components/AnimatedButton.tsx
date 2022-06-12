import { PropsWithChildren } from "react";

const AnimatedButton = ({ children }: PropsWithChildren<{}>) => (
  <button
    className={`relative block w-fit rounded-full py-2 px-2 shadow-[inset_0px_0px_0px_0.09px_rgba(255,247,153,1)] outline outline-midnight-dark transition delay-150 duration-[600ms] ease-in-out hover:shadow-[inset_300px_0px_0px_0px_rgba(255,247,153,1)]`}
  >
    {children}
  </button>
);

export default AnimatedButton;
