import type { PropsWithChildren } from "react";

type RichTextProps = {
  className: string;
};

const RichText = ({
  children,
  ...styleProps
}: PropsWithChildren<RichTextProps>) => <p {...styleProps}>{children}</p>;

export default RichText;