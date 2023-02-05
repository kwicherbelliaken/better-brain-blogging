import classNames from "classnames";
import type { PropsWithChildren } from "react";

const H1 = ({
  children,
  styleProps,
}: PropsWithChildren<{ styleProps?: Array<string> }>) => (
  <h1 className={classNames(styleProps?.join(" "))}>{children}</h1>
);

const H2 = ({ children }: PropsWithChildren<{}>) => <h2>{children}</h2>;

const H3 = ({
  children,
  styleProps,
}: PropsWithChildren<{ styleProps?: Array<string> }>) => (
  <h3 className={classNames(styleProps?.join(" "))}>{children}</h3>
);

const H4 = ({
  children,
  styleProps,
}: PropsWithChildren<{ styleProps?: Array<string> }>) => (
  <h4 className={classNames(styleProps?.join(" "))}>{children}</h4>
);

export default { H1, H2, H3, H4 };
