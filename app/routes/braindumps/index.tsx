import P from "~/components/P";
import { Link } from "@remix-run/react";
import { useCatch, useLoaderData } from "@remix-run/react";
import { json } from "@remix-run/server-runtime";
import notionClient from "~/integrations/notion";
import { retrieveBraindumpsFromNotionDatabase } from "./braindumps-helpers";
import Title from "~/components/Title";

import type { ThrownResponse } from "@remix-run/react";
import type {
  HeadersFunction,
  LoaderFunction,
} from "@remix-run/server-runtime";
import type { QueryDatabaseResponse } from "@notionhq/client/build/src/api-endpoints";
import type { NotionDatabaseAPIMapperResponse } from "./braindumps-helpers";

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

export function CatchBoundary() {
  const caught = useCatch<BraindumpsNotFoundResponse>();

  switch (caught.status) {
    case 404:
      return <div>{caught.statusText}</div>;
    default:
      throw new Error(`Unaccounted for Error: ${caught.statusText}`);
  }
}

export default function BraindumpsIndex() {
  const braindumps = useLoaderData() as ReturnType<
    typeof retrieveBraindumpsFromNotionDatabase
  >;

  if (!braindumps) return null;

  return (
    <div className="p-24">
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
                    keyOfBraindumps: number
                  ) => {
                    return (
                      <div
                        key={keyOfBraindumps}
                        className="before:border-blue-900 relative flex justify-between before:absolute before:bottom-[calc(50%-1px)] before:w-full before:border-b-[2px] before:border-dotted before:blur-[0.5px]"
                      >
                        <P styleProps={["z-10", "pr-2", "bg-white"]}>
                          {braindump.created_at}
                        </P>
                        <div className="z-10 float-right bg-white pl-2">
                          {braindump["Markdown"] ? (
                            <Link to={braindump["Markdown"]}>
                              <P>{braindump["Name"]}</P>
                            </Link>
                          ) : (
                            <P>{braindump["Name"]}</P>
                          )}
                        </div>
                      </div>
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
