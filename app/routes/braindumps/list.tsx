import P from "~/components/P";
import { useEffect, useState } from "react";
import { Link } from "@remix-run/react";
import { useLoaderData } from "@remix-run/react";
import { json } from "@remix-run/server-runtime";
import notionClient from "~/integrations/notion";
import { retrieveBraindumpsFromNotionDatabase } from "./braindumps-helpers";
import Title from "~/components/Title";
import FuzzyScrawl from "fuzzy-scrawl";
import fuzzyScrawlStyles from "fuzzy-scrawl-styles";

// TODO: load the typings for fuzzy-scrawl

import type { ThrownResponse } from "@remix-run/react";
import type {
  HeadersFunction,
  LoaderFunction,
} from "@remix-run/server-runtime";
import type { QueryDatabaseResponse } from "@notionhq/client/build/src/api-endpoints";
import type { NotionDatabaseAPIMapperResponse } from "./braindumps-helpers";

const getRandomIndex = (maxIndex: number) => (index: number) =>
  index === Math.floor(Math.random() * maxIndex);

const renderBraindumps = (
  braindump: NotionDatabaseAPIMapperResponse[0],
  index: number,
  braindumps: NotionDatabaseAPIMapperResponse
) => {
  const braindumpsLength = braindumps.length;

  const showFuzzyScrawl = getRandomIndex(braindumpsLength)(index);

  return (
    <BraindumpDetails
      key={index}
      braindump={braindump}
      showFuzzyScrawl={showFuzzyScrawl}
    />
  );
};

const BraindumpDetails = ({
  braindump,
  showFuzzyScrawl,
}: {
  braindump: any;
  showFuzzyScrawl: boolean;
}) => {
  const [canUseDOM, setCanUseDOM] = useState(false);

  useEffect(() => setCanUseDOM(true), []);

  const BraindumpName = () => (
    <P styleProps={["mb-0", "hover:cursor-pointer"]}>{braindump["Name"]}</P>
  );

  const LinkToBraindump = () => (
    <Link to={braindump["Markdown"]}>
      <BraindumpName />
    </Link>
  );

  return (
    <div className="before:border-blue-900 relative mb-2 flex justify-between before:absolute before:bottom-[calc(50%-1px)] before:w-full before:border-b-[2px] before:border-dotted before:blur-[0.5px]">
      <P styleProps={["z-10", "pr-2", "bg-white", "mb-0"]}>
        {braindump.created_at}
      </P>
      <div className="z-10  bg-white pl-2">
        {showFuzzyScrawl && canUseDOM ? (
          braindump["Markdown"] ? (
            <FuzzyScrawl.ScrawlComponent
              content={<LinkToBraindump />}
              svgFxFilterIndex={3}
              filterType="circle"
            />
          ) : (
            <FuzzyScrawl.ScrawlComponent
              content={<BraindumpName />}
              svgFxFilterIndex={0}
              filterType="line"
            />
          )
        ) : braindump["Markdown"] ? (
          <LinkToBraindump />
        ) : (
          <BraindumpName />
        )}
      </div>
    </div>
  );
};

type BraindumpsNotFoundResponse = ThrownResponse<404, string>;

export const headers: HeadersFunction = ({ loaderHeaders }) => {
  return { "Cache-Control": loaderHeaders.get("Cache-Control")! };
};

export const loader: LoaderFunction = async () => {
  try {
    let httpHeaders = { "Cache-Control": "max-age=3600" };

    const response: QueryDatabaseResponse = await notionClient.databases.query({
      database_id: process.env.NOTION_DATABASE_ID ?? "",
    });

    if (!response) {
      throw json("No Braindumps Found", { status: 404 });
    }

    return json(retrieveBraindumpsFromNotionDatabase(response), {
      headers: httpHeaders,
    });
  } catch (error) {
    // [TODO]:
    // > appropriately handle possible errors here
  }
};

export function ErrorBoundary() {
  // const caught = useCatch<BraindumpsNotFoundResponse>();
  // console.log("LOGGING INSIDE THE ERROR BOUNDARY: ", { caught });
  // switch (caught.status) {
  //   case 404:
  //     return <div>{caught.statusText}</div>;
  //   default:
  //     throw new Error(`Unaccounted for Error: ${caught.statusText}`);
  // }
}

// TODO: write note about how remix handles styles, particularly for a component library
export const links = () => {
  return [
    {
      rel: "stylesheet",
      href: fuzzyScrawlStyles,
    },
  ];
};

// TODO: relocate all code relevant to this route to this component
export default function BraindumpsList() {
  const braindumps = useLoaderData() as ReturnType<
    typeof retrieveBraindumpsFromNotionDatabase
  >;

  if (!braindumps) return null;

  return (
    <div className="h-full w-2/3 p-24">
      <Title.H1 styleProps={["pb-12"]}>braindumps</Title.H1>

      {Object.entries(braindumps).map(
        (
          [category, relatedBraindumps]: [
            category: string,
            relatedBraindumps: NotionDatabaseAPIMapperResponse
          ],
          keyOfCategories: number
        ) => {
          return (
            <div key={keyOfCategories} className="w-full pb-8">
              <Title.H3
                styleProps={[
                  "py-3.5",
                  "text-4xl",
                  "font-extrabold",
                  "uppercase",
                  "tracking-tight",
                ]}
              >
                {category}
              </Title.H3>

              <div className="bg-white pl-3.5">
                {relatedBraindumps.map(renderBraindumps)}
              </div>
            </div>
          );
        }
      )}
    </div>
  );
}
