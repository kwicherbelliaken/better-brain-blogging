import classNames from "classnames";
import type { PropsWithChildren } from "react";

const A = ({
  children,
  styleProps,
  ...props
}: PropsWithChildren<{ href: string; styleProps: Array<string> }>) => (
  <a
    {...props}
    className={classNames(...styleProps)}
    target="_blank"
    rel="noopener noreferrer"
  >
    {children}
  </a>
);

export default A;
