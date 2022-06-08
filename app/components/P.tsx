import { PropsWithChildren } from "react";

const P = ({
  children,
  className,
}: PropsWithChildren<{ className?: string }>) => (
  <div className={`mb-5 inline ${className}`}>{children}</div>
);

export default P;
