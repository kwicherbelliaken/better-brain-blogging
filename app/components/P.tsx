import classNames from "classnames";
import type { PropsWithChildren } from "react";

const P = ({
  children,
  styleProps,
}: PropsWithChildren<{ styleProps?: Array<string> }>) => (
  <div
    className={classNames(
      "mb-8 font-nhmb text-graphite-dark",
      styleProps?.join(" ")
    )}
  >
    {children}
  </div>
);

export default P;
