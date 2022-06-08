import hljs from "highlight.js";
import { PropsWithChildren, useEffect } from "react";
import P from "./P";

const CodeBlock = ({
  content: { caption, code },
}: PropsWithChildren<{
  content: { caption: string; code: string };
}>) => {
  useEffect(() => {
    // [TODO]:
    // [ ]: execute this closer to the root of the project (NB: it depends on browser based APIs)
    hljs.highlightAll();
  });

  return (
    <div className="mb-5">
      <pre>
        <code>{code}</code>
      </pre>
      <P className="italic">{caption}</P>
    </div>
  );
};
export default CodeBlock;
