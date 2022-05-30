import { PropsWithChildren } from "react";

const H1 = ({ children }: PropsWithChildren<{}>) => (
  <h1 className="font-picnic text-9xl">{children}</h1>
);
const H2 = ({ children }: PropsWithChildren<{}>) => (
  <h2 className="pb-8 font-nhmb text-8xl">{children}</h2>
);
const H3 = ({ children }: PropsWithChildren<{}>) => (
  <h3 className="pb-8 text-6xl">{children}</h3>
);

export default { H1, H2, H3 };
