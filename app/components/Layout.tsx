import React from "react";
import classNames from "classnames";
import type { PropsWithChildren } from "react";

// todo: if classNameProp is not an array then make it an array

//! NB: h-[calc(100vh-4rem)] needed to explicitly set the height otherwise we get scrollbars
//! https://github.com/slackermorris/better-brain-blogging/issues/10#issuecomment-1437429507

const FullHeight = ({
  children,
  classNameProp,
}: PropsWithChildren<{ classNameProp: Array<string> }>) => (
  <div
    className={classNames(
      "relative h-[calc(100vh-4rem)]",
      classNameProp?.join(" ")
    )}
  >
    {children}
  </div>
);

export default { FullHeight };
