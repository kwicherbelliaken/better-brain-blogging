import classNames from "classnames";
import { PropsWithChildren } from "react";

const P = ({
  children,
  styleProps,
}: PropsWithChildren<{ styleProps?: Array<string> }>) => (
  <div
    className={classNames(
      styleProps?.join(" "),
      "font-nhmb text-graphite-dark"
    )}
  >
    {children}
  </div>
);

export default P;
