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
            return (
              <ImageContainer key={block.id} src={block.image.external.url} />
            );

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

  return json({ braindumpMeta: response, braindumpContent: blocks });
};

export default function BraindumpIndex() {
  // [TODO]:
  // [ ]: I need to extract information about the page to display
  // [ ]: add highlighter effect to some sections
  // [ ]: determine the colours that I want to use
  // [ ]: how could I use this peeling sticky? https://codepen.io/patrickkunka/details/DeZQXw
  // [ ]: design a layout component (or does Tailwind offer one)?

  // [TYPEFACE]:
  // https://fontsinuse.com/uses/47122/paul-and-the-microcosm-wenzel-rehbach
  // https://fontsinuse.com/uses/46970/frow
  // https://fontsinuse.com/uses/43980/ekin-fil-aquarius-pisces-single-cover
  // https://fontsinuse.com/uses/45808/futurissimo-l-utopie-du-design-italien

  // [IRREGULAR CSS SHAPES]:
  // https://stackoverflow.com/questions/23711059/trapezium-shape-with-rounded-corners-and-pure-css
  // http://jsfiddle.net/webtiki/umV38/
  // https://www.w3.org/TR/2010/WD-css3-background-20100612/Overview.src.html
  //

  // [ADVANCED CSS]:
  // https://developpaper.com/css-advanced-use-css-gradient-to-make-gorgeous-gradient-texture-background-effect/
  // peelable sticker (with animation): https://codepen.io/patrickkunka/details/DeZQXw
  // http://www.coding-dude.com/wp/css/highlight-text-css/
  // https://alvarotrigo.com/blog/css-highlight-text/

  const { braindumpMeta, braindumpContent } = useLoaderData();

  const content = useNotionInterpretBlocks(braindumpContent.results);

  if (!braindumpContent || !braindumpMeta) return null;

  console.log("LOGGING THE CONTENT: ", { braindumpContent });

  const pseudoElementStyles =
    "before:absolute before:z-[-1] before:h-full before:w-full before:bg-red before: block before:rounded-tl-lg";

  const Header = (
    <div className="mb-12 flex flex-col">
      <Title.H1>
        {braindumpMeta["properties"]["title"]["title"][0]["plain_text"]}
      </Title.H1>
      <div className="space-between flex w-full flex-row justify-around pt-6">
        <div className="w-fit rounded-full py-2 px-2 outline outline-midnight-dark">
          {braindumpMeta["created_time"]}
        </div>
        <div className="w-fit rounded-full py-2 px-2 outline outline-midnight-dark">
          Uncategorised
        </div>
      </div>
    </div>
  );

  const References = (
    <div className="flex w-1/4 flex-col bg-midnight-light">
      <div className="text-m grid-row-gap-0 m-4 grid grid-cols-4 grid-rows-5 overflow-hidden text-clip font-sim uppercase text-graphite-lightest outline outline-graphite-lightest">
        <div className="col-span-4">
          <p>article title</p>
        </div>
        <div className="col-span-1 col-end-5">
          <p>author name</p>
        </div>
        <div className="col-span-3 row-start-3">
          <p>article url</p>
        </div>
        <div className="col-span-2 row-start-4">
          <p>publish date</p>
        </div>
        <div className="col-span-1 col-start-3 row-start-5">
          <p>media</p>
        </div>
      </div>
    </div>
  );

  return (
    <div className="h-full w-full bg-pink">
      <div className={`absolute m-4 bg-white p-4`}>
        {Header}
        <div className="flex flex-row justify-center">
          {References}
          <div className="flex w-3/4 flex-col px-4">{content}</div>
        </div>
      </div>
    </div>
  );
}
