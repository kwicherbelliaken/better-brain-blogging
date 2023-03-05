import React from "react";
import { useEffect, useState, Fragment, useMemo } from "react";
import { HeadersFunction, json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import notionClient from "~/integrations/notion";

//? COMPONENTS
import ImageContainer from "~/components/ImageContainer";
import Paragraph from "~/components/Paragraph";
import Title from "~/components/Title";
import CodeBlock from "~/components/CodeBlock";
import A from "~/components/A";

//? TYPES
import type { PropsWithChildren } from "react";
import type { GetBlockResponse } from "@notionhq/client/build/src/api-endpoints";

//? STYLES
import styles from "highlight.js/styles/base16/zenburn.css";
import { PillButton } from "../components/button";

const getRandomisedBorderRadius = () => {
  let borderRadius = "";

  for (let j = 0; j < 8; j++) {
    const nextBorderRadiusEntry = Math.floor(Math.random() * (80 - 20) + 20);

    if (j == 3 || j == 6) {
      borderRadius += j == 3 ? " 0% /" : " 0%";
    } else {
      borderRadius += ` ${nextBorderRadiusEntry}%`;
    }
  }

  return borderRadius;
};

const InnerLayout = ({ children }: PropsWithChildren<{}>) => {
  const [borderRadius, setBorderRadius] = useState(getRandomisedBorderRadius());

  useEffect(() => {
    /* 1. set shape transistion into effect on mount */
    setBorderRadius(getRandomisedBorderRadius());

    /* 2. retrigger shape transistion on each batched scroll */
    let debounce = true;
    const onScroll = () => {
      if (debounce) {
        debounce = false;
        setTimeout(() => {
          setBorderRadius(getRandomisedBorderRadius());
          debounce = true;
        }, 1000);
      }
    };

    window.addEventListener("scroll", () => onScroll());

    /* 3. cleanup */
    return window.removeEventListener("scroll", () => onScroll());
  }, []);

  return (
    <div
      className={`transistion h-full w-full bg-white p-4 duration-1000 ease-out`}
      style={{ borderRadius: borderRadius }}
    >
      {children}
    </div>
  );
};

const useNotionInterpretBlocks = (
  blocks: GetBlockResponse[]
): React.ReactNode => {
  const braindumps = useMemo(() => {
    return blocks?.map((block) => {
      if ("type" in block) {
        switch (block.type) {
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
            if ("external" in block.image) {
              return (
                <ImageContainer key={block.id} src={block.image.external.url} />
              );
            }
            return null;

          case "code":
            return (
              <CodeBlock
                key={block.id}
                content={{
                  caption: block.code.caption[0].plain_text,
                  code: block.code.rich_text[0].plain_text,
                }}
              />
            );

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

  /* 2. retrieve the blocks of content for this Notion Page Braindump */
  const blocks = await notionClient.blocks.children.list({
    block_id: params.braindumpId,
  });

  /* 3. retrieve, in particular, the reference(s) section (topmost block) */
  const blockReferences = blocks.results[0];
  const references = await notionClient.blocks.children.list({
    block_id: blockReferences.id,
  });

  if (!response) {
    throw json(
      `No Braindump found at Notion Page address: ${params.braindumpId}`,
      { status: 404 }
    );
  }

  const headers = { "Cache-Control": "max-age=3600" };

  return json(
    {
      braindumpMeta: response,
      braindumpContent: blocks,
      braindumpContentReferences: references,
    },
    { headers }
  );
};

export const headers: HeadersFunction = ({ loaderHeaders }) => {
  return { "Cache-Control": loaderHeaders.get("Cache-Control")! };
};

export const links = () => {
  return [
    {
      rel: "stylesheet",
      href: styles,
    },
  ];
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

  const { braindumpMeta, braindumpContent, braindumpContentReferences } =
    useLoaderData();

  const content = useNotionInterpretBlocks(braindumpContent.results);

  if (!braindumpContent || !braindumpMeta) return null;

  const Header = (
    <div className="mb-12 flex flex-col">
      <Title.H1 styleProps={["text-8xl"]}>
        {braindumpMeta["properties"]["title"]["title"][0]["plain_text"]}
      </Title.H1>
      <div className="space-between flex w-full flex-row justify-around pt-6">
        <PillButton>{braindumpMeta["created_time"]}</PillButton>
        <PillButton>Uncategorised</PillButton>
      </div>
    </div>
  );

  const REFERENCES_FIELD_TITLE_CN = "self-baseline pb-1 font-bold lowercase";

  const References = (
    <div className="flex w-1/4 flex-col text-graphite-lightest">
      <div className="m-4">
        {braindumpContentReferences.results.map((entry: GetBlockResponse) => {
          if ("table_row" in entry) {
            const cells = entry["table_row"]["cells"];

            if (cells.length) {
              const [
                [articleTitle],
                [articleAuthor],
                [articleUrl],
                [articlePublishDate],
                [articleMediaType],
              ] = cells;
              return (
                <div
                  key={entry.id}
                  className="grid-row-gap-0 grid-rows-[repeat(5, minmax(0, auto))] mb-4 grid grid-cols-4 content-center overflow-hidden text-clip bg-midnight-light p-2 font-sim text-xs uppercase outline outline-white"
                >
                  <Fragment key={entry.id}>
                    <div className="col-span-4 flex flex-col py-2">
                      <p className={REFERENCES_FIELD_TITLE_CN}>title</p>
                      <A
                        href={articleUrl["plain_text"]}
                        styleProps={["opacity-75"]}
                      >
                        {articleTitle["plain_text"]}
                      </A>
                    </div>
                    <div className="col-span-1 col-end-4 flex flex-col py-2">
                      <p className={REFERENCES_FIELD_TITLE_CN}>author</p>
                      <p className="opacity-75">
                        {articleAuthor["plain_text"]}
                      </p>
                    </div>
                    <div className="col-span-4 row-start-3 flex flex-col py-2">
                      <p className={REFERENCES_FIELD_TITLE_CN}>url</p>
                      <A
                        href={articleUrl["plain_text"]}
                        styleProps={["opacity-75"]}
                      >
                        {articleUrl["plain_text"]}
                      </A>
                    </div>
                    <div className="col-span-2 row-start-4 flex flex-col py-2">
                      <p className={REFERENCES_FIELD_TITLE_CN}>
                        published date
                      </p>
                      <p className="opacity-75">
                        {articlePublishDate["plain_text"]}
                      </p>
                    </div>
                    <div className="col-span-1 col-start-3 row-start-5 flex flex-col py-2">
                      <p className={REFERENCES_FIELD_TITLE_CN}>media type</p>
                      <p className="opacity-75">
                        {articleMediaType["plain_text"]}
                      </p>
                    </div>
                  </Fragment>
                </div>
              );
            }
          }

          return null;
        })}
      </div>
    </div>
  );

  return (
    <div className="h-full w-full bg-pink pt-24">
      <InnerLayout>
        {Header}
        <div className="flex flex-row justify-center">
          {References}
          <div className="flex w-3/4 flex-col px-4">{content}</div>
        </div>
      </InnerLayout>
    </div>
  );
}
