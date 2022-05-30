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
    <P>
      {block.paragraph.rich_text.map((text) => {
        const isBold = text.annotations.bold;
        const isUnderlined = text.annotations.underline;
        const isItalic = text.annotations.italic;

        const richProps = {
          isBold,
          isUnderlined,
          isItalic,
          className: "font-nhmb text-xl text-midnight-light",
        };

        if (text.href) {
          return (
            <A key={text.text.content} href={text.href}>
              <RichText {...richProps}> {text.text.content}</RichText>
            </A>
          );
        }

        return (
          <RichText key={text.text.content} {...richProps}>
            {text.text.content}
          </RichText>
        );
      })}
    </P>
  );
};

export default Paragraph;
