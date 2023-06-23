import type * as LibraryNotionAPITypes from "notion-api-types";

declare module "notion-api-types" {
  export interface BlockList {
    object: "list";
    results: LibraryNotionAPITypes.NotionResponse.Block[];
  }

  /* re-exporting this makes consuming types easier... I only have to import from one entry point */
  export type Page = LibraryNotionAPITypes.NotionResponse.Page;

  /* re-exporting this makes consuming types easier... I only have to import from one entry point */
  export type Block = LibraryNotionAPITypes.NotionResponse.Block;
}
