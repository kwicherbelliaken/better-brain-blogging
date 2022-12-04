import classNames from "classnames";
import { PropsWithChildren } from "react";

const H1 = ({
  children,
  styleProps,
}: PropsWithChildren<{ styleProps?: Array<string> }>) => (
  <h1
    className={classNames(
      "font-picnic text-9xl text-midnight-light",
      styleProps?.join(" ")
    )}
  >
    {children}
  </h1>
);

const H2 = ({ children }: PropsWithChildren<{}>) => (
  <h2 className="pb-8 font-nhmb text-8xl">{children}</h2>
);

const H3 = ({
  children,
  styleProps,
}: PropsWithChildren<{ styleProps?: Array<string> }>) => (
  <h3
    className={classNames(
      "font-helvetica text-6xl text-midnight-light",
      styleProps?.join(" ")
    )}
  >
    {children}
  </h3>
);

export default { H1, H2, H3 };
