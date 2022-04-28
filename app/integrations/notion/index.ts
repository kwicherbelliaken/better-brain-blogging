import { Client, LogLevel } from "@notionhq/client";
import { isDev } from "~/constants";

/* 1. Initialise a Client */
const notion = new Client({
  auth: process.env.NOTION_TOKEN,
  logLevel: isDev ? LogLevel.DEBUG : LogLevel.ERROR,
});

// [TODO]:
// > use a singleton to retrieve Notion Client instance

export default notion;
