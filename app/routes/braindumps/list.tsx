import React, { useEffect, useMemo, useState } from "react";
import { useLoaderData, useCatch } from "@remix-run/react";
import { json } from "@remix-run/server-runtime";
import notionClient from "~/integrations/notion";
import { retrieveBraindumpsFromNotionDatabase } from "./notion-crm";

//? COMPONENTS
import { P, Title, Layout, PageTransition } from "~/components";
import { Link } from "@remix-run/react";

//? LIBRARIES
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

type LoaderData = Awaited<
  ReturnType<typeof retrieveBraindumpsFromNotionDatabase>
>;

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

export const links = () => {
  return [
    {
      rel: "stylesheet",
      href: fuzzyScrawlStyles,
    },
  ];
};

export default function BraindumpsList() {
  const braindumps = useLoaderData<LoaderData>();

  const [filteredCategory, setFilteredCategory] = useState<
    keyof typeof braindumps | "ALL"
  >("ALL");

  const CategoriesMemo = useMemo(() => {
    // todo: maybe better to return a loading spinner or something
    if (!braindumps) return null;

    const Categories = () => {
      const availableColours = [
        "text-categories-violet outline-categories-violet",
        "text-categories-pink outline-categories-pink",
        "text-categories-yellow outline-categories-yellow",
        "text-categories-orange outline-categories-orange",
      ];

      const colourMap = Object.keys(braindumps).reduce((map, category) => {
        if (availableColours.length === 0) {
          map[category] = "text-categories-default outline-categories-default";
        } else {
          const colourIndex = Math.floor(
            Math.random() * availableColours.length
          );

          map[category] = availableColours[colourIndex];

          availableColours.splice(colourIndex, 1);
        }

        return map;
      }, {});

      return (
        <div className="flex flex-row gap-3 pb-6">
          <button
            className="relative block w-fit rounded-full py-1 px-2 text-sm font-medium text-graphite-huy outline outline-graphite-huy hover:bg-stone-100 focus:bg-stone-200"
            onClick={() => setFilteredCategory("ALL")}
          >
            ALL
          </button>
          {Object.entries(braindumps).map(
            (
              [category, _]: [
                category: keyof typeof braindumps,
                relatedBraindumps: NotionDatabaseAPIMapperResponse
              ],
              keyOfCategories: number
            ) => {
              return (
                <button
                  key={keyOfCategories}
                  className={`${colourMap[category]} relative block w-fit rounded-full py-1 px-2 text-sm font-medium  outline hover:bg-stone-100 focus:bg-stone-200`}
                  // @ts-ignore: we know this is a valid category
                  onClick={() => setFilteredCategory(category)}
                >
                  {category}
                </button>
              );
            }
          )}
        </div>
      );
    };

    return <Categories />;
  }, [braindumps]);

  if (!braindumps) return null;

  return (
    <PageTransition.GradientMapTransition
      classNameProps={["h-[calc(100vh-4rem)]", "w-2/3", "overflow-hidden"]}
    >
      <Layout.FullHeight classNameProp={["w-2/3"]}>
        <PageTransition.MorphingTransition>
          <div className="p-24 4xl:p-64">
            {CategoriesMemo}
            {Object.entries(braindumps).map(
              (
                [category, relatedBraindumps]: [
                  category: string,
                  relatedBraindumps: NotionDatabaseAPIMapperResponse
                ],
                keyOfCategories: number
              ) => {
                if (filteredCategory === "ALL") {
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
                              index ===
                              Math.floor(Math.random() * braindumps.length);

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
                } else if (filteredCategory === category) {
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
                              index ===
                              Math.floor(Math.random() * braindumps.length);

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

                return null;
              }
            )}
          </div>
        </PageTransition.MorphingTransition>
      </Layout.FullHeight>
    </PageTransition.GradientMapTransition>
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
        {new Date(braindump.created_at).toLocaleDateString()}
      </P>
      <div className="z-10  bg-white pl-2">
        {showFuzzyScrawl && canUseDOM ? (
          braindump["Markdown"] ? (
            <FuzzyScrawl.ScrawlComponent
              content={<LinkToBraindump />}
              svgFxFilterIndex={Math.floor(Math.random() * 7)}
              filterType={Math.floor(Math.random() * 2) ? "circle" : "line"}
            />
          ) : (
            <FuzzyScrawl.ScrawlComponent
              content={<BraindumpName />}
              svgFxFilterIndex={Math.floor(Math.random() * 7)}
              filterType={Math.floor(Math.random() * 2) ? "circle" : "line"}
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
