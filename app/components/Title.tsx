import { PropsWithChildren } from "react";

const H1 = ({ children }: PropsWithChildren<{}>) => (
  <h1 className="font-picnic text-9xl">{children}</h1>
);
const H2 = ({ children }: PropsWithChildren<{}>) => (
  <h2 className="pb-8 font-nhmb text-8xl">{children}</h2>
);
const H3 = ({ children }: PropsWithChildren<{}>) => (
  <h3 className="font-nhmb text-6xl text-graphite-lightest">{children}</h3>
);

export default { H1, H2, H3 };
