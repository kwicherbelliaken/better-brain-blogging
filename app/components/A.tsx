import { PropsWithChildren } from "react";

const A = ({ children, ...props }: PropsWithChildren<{ href: string }>) => (
  <a {...props}>{children}</a>
);

export default A;
