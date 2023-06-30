// @ts-nocheck
// INFO: exported type defs for Notion API aren't deep enough

import A from "./A";
import P from "./P";
import RichText from "./RichText";

type ParagraphProps<BlockType> = {
  block: BlockType;
};

const Paragraph = <BlockType extends object>({
  block,
}: ParagraphProps<BlockType>) => {
  return (
    <P styleProps={["mb-5 inline"]}>
      {block.paragraph.rich_text.map((text, index: number) => {
        const {
          bold: isBold,
          underline: isUnderlined,
          italic: isItalic,
          code: isCode,
        } = text.annotations;

        const richProps = {
          className: `font-sim text-lg text-black-pearl inline selection:bg-yellow-meringue  
          ${isBold ? "font-bold" : ""} 
          ${isItalic ? "italic" : ""} 
          ${isUnderlined ? "underline" : ""},
          ${
            isCode
              ? "text-red-500 rounded-sm leading-normal bg-slate-200 py-1 px-1.5 text-base"
              : ""
          }`,
        };

        if (isCode) {
          return (
            <span
              key={`text.text.content.${index}`}
              className="rounded-sm bg-slate-300 py-1 px-1.5 text-base leading-normal text-red-500"
            >
              {text.text.content}
            </span>
          );
        }

        if (text.href) {
          return (
            <A key={`text.text.content.${index}`} href={text.href}>
              <RichText {...richProps}> {text.text.content}</RichText>
            </A>
          );
        }

        return (
          <RichText key={`text.text.content.${index}`} {...richProps}>
            {text.text.content}{" "}
          </RichText>
        );
      })}
    </P>
  );
};

export default Paragraph;
