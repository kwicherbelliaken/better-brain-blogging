import { ThrownResponse, useCatch, useLoaderData } from "@remix-run/react";
import {
  HeadersFunction,
  json,
  LoaderFunction,
} from "@remix-run/server-runtime";
import notionClient from "~/integrations/notion";

// [TODO]:
// > [project]: format logs to server console
// > [notion]: better understand the Notion API and the shape of the response object
// > [notion]: better implement error handling
// > [project]: replace the testing suite
// > [project]: look into caching possibilities
// > [notion]: try to type the response

type BraindumpsNotFoundResponse = ThrownResponse<404, string>;

export const headers: HeadersFunction = ({ loaderHeaders }) => {
  return { "Cache-Control": loaderHeaders.get("Cache-Control")! };
};

export const loader: LoaderFunction = async () => {
  try {
    let httpHeaders = { "Cache-Control": "max-age=3600" };

    const response = await notionClient.databases.query({
      database_id: process.env.NOTION_DATABASE_ID ?? "",
    });

    if (!response) {
      throw json("No Braindumps Found", { status: 404 });
    }

    // [TODO]:
    // > format response using a utility function

    return json(response, { headers: httpHeaders });
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
  const braindumps = useLoaderData();

  return <div>braindumps</div>;
}
