import { PropsWithChildren } from "react";

const P = ({ children }: PropsWithChildren<{}>) => (
  <div className="mb-5 inline">{children}</div>
);

export default P;
