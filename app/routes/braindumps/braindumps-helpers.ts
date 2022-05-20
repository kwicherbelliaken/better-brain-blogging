import { QueryDatabaseResponse } from "@notionhq/client/build/src/api-endpoints";

type Braindump = {
  [key in BraindumpDatabaseColumnsForDisplayType]: string;
} & {
  created_at: string;
};

enum BraindumpDatabaseColumnsEnum {
  Content = "Content",
  Tags = "Tags",
  Name = "Name",
}

type BraindumpDatabaseColumnsForDisplayType = Exclude<
  BraindumpDatabaseColumnsEnum,
  BraindumpDatabaseColumnsEnum.Tags
>;

export type NotionDatabaseRow = QueryDatabaseResponse["results"][0];

export type NotionDatabaseColumn = NotionDatabaseRow["properties"][string];

export type NotionDatabaseAPIMapperResponse = Array<Braindump>;

export const retrieveBraindumpsFromNotionDatabase = (
  notionResponse: QueryDatabaseResponse
): { [key: string]: NotionDatabaseAPIMapperResponse } | null => {
  if (notionResponse && notionResponse?.results.length) {
    return notionResponse.results.reduce(
      (
        acc: { [key: string]: NotionDatabaseAPIMapperResponse },
        row: NotionDatabaseRow
      ) => {
        if ("properties" in row) {
          const braindumpCategory = _getBraindumpCategory(row.properties) ?? [
            "Uncategorised",
          ];

          /* retrieve each column on the database row with all content except the column we use to categorise ('Tags') */
          const { Tags, ...remainingBraindumpColumns } = row.properties;

          /* pull the (actual) column values out from their nested save point on NotionDatabaseColumn type*/
          const braindumpColumnsToValues = Object.entries(
            remainingBraindumpColumns
          ).reduce<{
            [key in BraindumpDatabaseColumnsForDisplayType]?: string;
          }>((acc, [colKey, colValue]) => {
            acc[colKey as BraindumpDatabaseColumnsForDisplayType] =
              _getColumnValue(colValue);
            return acc;
          }, {});

          /* format the next entry to be added to the mapper aggregate */
          const nextEntry = {
            created_at: row.created_time,
            ...braindumpColumnsToValues,
          } as Braindump;

          const categoryKey = braindumpCategory.join(" ").trim();

          acc[categoryKey] = acc[categoryKey] ?? [];
          acc[categoryKey].push(nextEntry);
        }

        return acc;
      },
      {}
    );
  }

  return null;
};

/**
 * It retrieves the possible categories applicable to the provided Braindump
 */
const _getBraindumpCategory = (columns: NotionDatabaseRow["properties"]) => {
  const braindumpCategories = columns["Tags"]["multi_select"];

  if (braindumpCategories.length) {
    return braindumpCategories.map(
      (
        category: Extract<
          NotionDatabaseRow["properties"][string],
          { type: "multi_select" }
        >["multi_select"]
      ) => category.name
    );
  }

  return null;
};

/**
 * It retrieves the discrete value for a column. The NotionDatabase API is convoluted and the value is deeply nested and therefore needs to be extracted for eas(ier) access.
 */
const _getColumnValue = (column: NotionDatabaseColumn) => {
  if (column[column.type].length) {
    return column[column.type][0]["text"]["content"];
  }

  return null;
};
