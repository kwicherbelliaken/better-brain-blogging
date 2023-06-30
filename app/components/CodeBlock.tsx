import hljs from "highlight.js";
import { type PropsWithChildren, useEffect } from "react";
import P from "./P";

const preClassName =
  "px-4 text-sm leading-6 bg-[#dfe2e5]/[.314] border border-[#dfe2e5]/[.333] rounded-md";

const CodeBlock = ({
  content: { caption, code },
}: PropsWithChildren<{
  content: { caption: string; code: string };
}>) => {
  useEffect(() => {
    // [TODO]:
    // [ ]: execute this closer to the root of the project (NB: it depends on browser based APIs)
    hljs.highlightAll();
  }, []);

  return (
    <div className="mb-5">
      <pre
        className={preClassName}
        style={{
          wordWrap: "normal",
          wordBreak: "normal",
        }}
      >
        <code
          class="typescript"
          style={{
            background: "transparent",
            whiteSpace: "pre",
            wordBreak: "normal",
          }}
        >
          {code}
        </code>
      </pre>
      <P styleProps={["italic"]}>{caption}</P>
    </div>
  );
};

export default CodeBlock;
