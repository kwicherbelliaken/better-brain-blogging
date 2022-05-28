import { GetBlockResponse } from "@notionhq/client/build/src/api-endpoints";
import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { useMemo } from "react";
import ImageContainer from "~/components/ImageContainer";
import Paragraph from "~/components/Paragraph";
import Title from "~/components/Title";
import notionClient from "~/integrations/notion";

const useNotionInterpretBlocks = (
  blocks: GetBlockResponse[]
): React.ReactNode => {
  const braindumps = useMemo(() => {
    return blocks?.map((block) => {
      if ("type" in block) {
        switch (block.type) {
          // [TODO]:
          // [ ]: add a type guard here
          case "paragraph":
            return <Paragraph<GetBlockResponse> key={block.id} block={block} />;

          case "heading_1":
            return (
              <Title.H2 key={block.id}>
                {block.heading_1.rich_text[0]?.plain_text}
              </Title.H2>
            );

          case "heading_2":
            return (
              <Title.H3 key={block.id}>
                {block.heading_2.rich_text[0]?.plain_text}
              </Title.H3>
            );

          // case "bulleted_list_item":
          //   return <ListItem block={block} key={block.id} />;

          case "image":
            return <ImageContainer src={block.image.external.url} />;

          // case "code":
          //   return (
          //     <CodeBlock
          //       key={block.id}
          //       text={block.code.text[0].plain_text}
          //       language={block.code.language}
          //     />
          //   );

          default:
            return null;
        }
      }
      return null;
    });
  }, [blocks]);

  return braindumps;
};

export const loader = async ({
  params,
}: {
  params: { braindumpId: string };
}) => {
  /* 1. retrieve the Notion Page equivalent of this Braindump */
  const response = await notionClient.pages.retrieve({
    page_id: params.braindumpId,
  });

  const blocks = await notionClient.blocks.children.list({
    block_id: params.braindumpId,
  });

  if (!response) {
    throw json(
      `No Braindump found at Notion Page address: ${params.braindumpId}`,
      { status: 404 }
    );
  }

  return json(blocks);
};

export default function BraindumpIndex() {
  const { results: blocks } = useLoaderData();

  console.log("LOGGING THE BLOCKS: ", { blocks });

  const content = useNotionInterpretBlocks(blocks);

  // is it a good idea to return markdown from the loader?

  if (!blocks) return null;

  return <div>{content}</div>;
}
