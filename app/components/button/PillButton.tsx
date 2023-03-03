import classNames from "classnames";
import type { PropsWithChildren } from "react";

const PillButton = ({
  children,
  styleProps,
}: PropsWithChildren<{ styleProps?: Array<string> }>) => (
  <button
    className={classNames(
      "relative block w-fit rounded-full py-2 px-2 outline outline-midnight-dark",
      styleProps?.join(" ")
    )}
  >
    {children}
  </button>
);

export default PillButton;
