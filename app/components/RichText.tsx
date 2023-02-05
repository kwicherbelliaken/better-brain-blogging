import type { PropsWithChildren } from "react";

type RichTextProps = {
  className: string;
};

const RichText = ({
  children,
  ...styleProps
}: PropsWithChildren<RichTextProps>) => <p {...styleProps}>{children}</p>;

export default RichText;

// type Apple = {
//   hasSeeds: boolean;
//   name: string;
// };

// type Banana = {
//   name: string;
// };

// type Fruit = Banana | Apple;

// const isApple = (check: Fruit): check is Apple => {
//   return (check as Apple).hasSeeds !== "undefined";
// };

// function pluck<DataType, KeyType extends keyof DataType>(
//   items: DataType[],
//   key: KeyType
// ) {}
