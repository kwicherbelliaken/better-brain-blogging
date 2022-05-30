import { PropsWithChildren } from "react";

type RichTextProps = {
  isBold: boolean;
  isUnderlined: boolean;
  isItalic: boolean;
};

const RichText = ({
  children,
  ...styleProps
}: PropsWithChildren<RichTextProps>) => {
  // [TODO]:
  // [ ]: appropriately interpret the styles here
  // [ ]: decide on a generic style choice here that will be interpreted in SCSS
  return <div {...styleProps}>{children}</div>;
};

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
