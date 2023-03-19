import React from "react";
import type { PropsWithChildren } from "react";
import { useTransition } from "@remix-run/react";
import classNames from "classnames";

const GradientMapTransition = ({
  children,
  classNameProps,
}: PropsWithChildren<{ classNameProps?: Array<string> }>) => {
  const transition = useTransition();

  if (transition.state === "loading") {
    return (
      <div className={classNames(classNameProps?.join(" "))}>
        <div className="h-full w-full animate-ping bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-rose-100 to-teal-100" />
      </div>
    );
  }

  return <>{children}</>;
};

export default GradientMapTransition;
