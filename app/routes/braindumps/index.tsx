import { Link, ThrownResponse } from "@remix-run/react";
import { useCatch, useLoaderData } from "@remix-run/react";
import type {
  HeadersFunction,
  LoaderFunction,
} from "@remix-run/server-runtime";
import { json } from "@remix-run/server-runtime";
import notionClient from "~/integrations/notion";
import { QueryDatabaseResponse } from "@notionhq/client/build/src/api-endpoints";
import {
  retrieveBraindumpsFromNotionDatabase,
  NotionDatabaseAPIMapperResponse,
} from "./braindumps-helpers";

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

  // [TODO]:
  // [x]: clean up TS errors in helpers.ts
  // [x]: add styling to this page
  // [ ]: think about better naming conventions for the helper functionality
  // [ ]: some TS tutorials and add to notes
  // [ ]: some design pattern tutorials
  // [ ]: think about better error and loading handling before this
  // [ ]: rename the types in helper.ts
  // [ ]: think how to use union type as a const

  if (!braindumps) return null;

  return (
    <div>
      {Object.entries(braindumps).map(
        (
          [category, relatedBraindumps]: [
            category: string,
            relatedBraindumps: NotionDatabaseAPIMapperResponse
          ],
          keyOfCategories: number
        ) => {
          return (
            <div key={keyOfCategories} className="w-full">
              <h3 className="py-3.5 text-4xl font-extrabold uppercase tracking-tight">
                {category}
              </h3>
              <div className="pl-3.5">
                {relatedBraindumps.map(
                  (
                    braindump: NotionDatabaseAPIMapperResponse[0],
                    keyOfBraindumps: number
                  ) => {
                    return (
                      <div
                        key={keyOfBraindumps}
                        className="flex justify-between"
                      >
                        <p className="text-slate-400">{braindump.created_at}</p>
                        <div className="max-w-[65%] overflow-hidden text-ellipsis whitespace-nowrap text-justify">
                          <Link to={braindump["Markdown"] ?? "REMOVE_ME"}>
                            {braindump["Name"]}
                          </Link>
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
