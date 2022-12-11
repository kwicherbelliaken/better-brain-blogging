import { useEffect, useState } from "react";
import { useLoaderData, useCatch } from "@remix-run/react";
import { json } from "@remix-run/server-runtime";
import notionClient from "~/integrations/notion";
import { retrieveBraindumpsFromNotionDatabase } from "./notion-crm";

//? COMPONENTS
import { Link } from "@remix-run/react";
import P from "~/components/P";
import Title from "~/components/Title";
// @ts-ignore
// ! EXPORT PROPER TYPE DEFINITONS
import FuzzyScrawl from "fuzzy-scrawl";

//? TYPES
import type { ThrownResponse } from "@remix-run/react";
import type {
  HeadersFunction,
  LoaderFunction,
} from "@remix-run/server-runtime";
import type { QueryDatabaseResponse } from "@notionhq/client/build/src/api-endpoints";
import type { NotionDatabaseAPIMapperResponse } from "./notion-crm";

//? STYLES
// @ts-ignore
// ! EXPORT PROPER TYPE DEFINITONS
import fuzzyScrawlStyles from "fuzzy-scrawl-styles";

type ThrownResponses = ThrownResponse<404, string>;

export const headers: HeadersFunction = ({ loaderHeaders }) => {
  return { "Cache-Control": loaderHeaders.get("Cache-Control")! };
};

export const loader: LoaderFunction = async () => {
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
};

export function ErrorBoundary({ error }: { error: Error }) {
  return (
    <div className="flex h-full w-2/3 flex-row items-center justify-center p-24">
      {error.message}
    </div>
  );
}

export function CatchBoundary() {
  const caught = useCatch<ThrownResponses>();

  switch (caught.status) {
    case 404:
      return (
        <div className="flex h-full w-2/3 flex-row items-center justify-center p-24">
          No braindumps were found
        </div>
      );
    default:
      throw new Error(
        "Unknown Server error. Likely an unhandled status in 'Catch Boundary'"
      );
  }
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
                {relatedBraindumps.map(
                  (
                    braindump: NotionDatabaseAPIMapperResponse[0],
                    index: number,
                    braindumps: NotionDatabaseAPIMapperResponse
                  ) => {
                    const showFuzzyScrawl =
                      index === Math.floor(Math.random() * braindumps.length);

                    return (
                      <BraindumpDetails
                        key={index}
                        braindump={braindump}
                        showFuzzyScrawl={showFuzzyScrawl}
                      />
                    );
                  }
                )}
              </div>
            </div>
          );
        }
      )}
    </div>
  );
}

function BraindumpDetails({
  braindump,
  showFuzzyScrawl,
}: {
  braindump: any;
  showFuzzyScrawl: boolean;
}) {
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
}
