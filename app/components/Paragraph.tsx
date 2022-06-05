import A from "./A";
import P from "./P";
import RichText from "./RichText";

type ParagraphProps<BlockType> = {
  block: BlockType;
};

const Paragraph = <BlockType extends object>({
  block,
}: ParagraphProps<BlockType>) => {
  console.log("LOGGING INSIDE THE PARAGRAPH BLOCK: ", { block });

  return (
    <P>
      {block.paragraph.rich_text.map((text, index: number) => {
        const isBold = text.annotations.bold;
        const isUnderlined = text.annotations.underline;
        const isItalic = text.annotations.italic;

        const richProps = {
          className: `font-nhmb text-xl text-midnight-light inline 
          ${isBold ? "font-bold" : ""} 
          ${isItalic ? "italic" : ""} 
          ${isUnderlined ? "underline" : ""}`,
        };

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
