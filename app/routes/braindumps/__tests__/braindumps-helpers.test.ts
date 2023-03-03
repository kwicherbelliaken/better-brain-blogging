import type { QueryDatabaseResponse } from "@notionhq/client/build/src/api-endpoints";
import * as helpersToTest from "../notion-crm";

const notionDatabasePayload: QueryDatabaseResponse = {
  object: "list",
  results: [
    {
      object: "page",
      id: "07ce6ea2-76e7-468d-b72c-855fa952c96e",
      created_time: "2022-05-09T04:38:00.000Z",
      last_edited_time: "2022-05-09T04:38:00.000Z",
      created_by: {
        object: "user",
        id: "10899024-9ff4-4275-bd09-9953d6e73349",
      },
      last_edited_by: {
        object: "user",
        id: "10899024-9ff4-4275-bd09-9953d6e73349",
      },
      cover: null,
      icon: null,
      parent: {
        type: "database_id",
        database_id: "cecb414d-4437-4a4c-9d0b-c2067c2298e5",
      },
      archived: false,
      properties: {
        Content: {
          id: "DOTb",
          type: "rich_text",
          rich_text: [],
        },
        Tags: {
          id: "qblQ",
          type: "multi_select",
          multi_select: [
            {
              id: "8f32c9a1-d481-48c8-8869-dee5216e6d1e",
              name: "JavaScript",
              color: "pink",
            },
          ],
        },
        Name: {
          id: "title",
          type: "title",
          title: [
            {
              type: "text",
              text: {
                content:
                  "fourth entry but a very very very very very very very long title what happens",
                link: null,
              },
              annotations: {
                bold: false,
                italic: false,
                strikethrough: false,
                underline: false,
                code: false,
                color: "default",
              },
              plain_text:
                "fourth entry but a very very very very very very very long title what happens",
              href: null,
            },
          ],
        },
      },
      url: "https://www.notion.so/fourth-entry-but-a-very-very-very-very-very-very-very-long-title-what-happens-07ce6ea276e7468db72c855fa952c96e",
    },
    {
      object: "page",
      id: "05b7c32e-6197-430a-bb59-396f25c8d9a7",
      created_time: "2022-05-08T08:12:00.000Z",
      last_edited_time: "2022-05-08T08:12:00.000Z",
      created_by: {
        object: "user",
        id: "10899024-9ff4-4275-bd09-9953d6e73349",
      },
      last_edited_by: {
        object: "user",
        id: "10899024-9ff4-4275-bd09-9953d6e73349",
      },
      cover: null,
      icon: null,
      parent: {
        type: "database_id",
        database_id: "cecb414d-4437-4a4c-9d0b-c2067c2298e5",
      },
      archived: false,
      properties: {
        Content: {
          id: "DOTb",
          type: "rich_text",
          rich_text: [],
        },
        Tags: {
          id: "qblQ",
          type: "multi_select",
          multi_select: [
            {
              id: "8f32c9a1-d481-48c8-8869-dee5216e6d1e",
              name: "JavaScript",
              color: "pink",
            },
          ],
        },
        Name: {
          id: "title",
          type: "title",
          title: [
            {
              type: "text",
              text: {
                content: "third entry",
                link: null,
              },
              annotations: {
                bold: false,
                italic: false,
                strikethrough: false,
                underline: false,
                code: false,
                color: "default",
              },
              plain_text: "third entry",
              href: null,
            },
          ],
        },
      },
      url: "https://www.notion.so/third-entry-05b7c32e6197430abb59396f25c8d9a7",
    },
    {
      object: "page",
      id: "40d9db59-4221-4398-87bc-4d8aaf61a03a",
      created_time: "2022-05-07T08:51:00.000Z",
      last_edited_time: "2022-05-19T23:00:00.000Z",
      created_by: {
        object: "user",
        id: "10899024-9ff4-4275-bd09-9953d6e73349",
      },
      last_edited_by: {
        object: "user",
        id: "10899024-9ff4-4275-bd09-9953d6e73349",
      },
      cover: null,
      icon: null,
      parent: {
        type: "database_id",
        database_id: "cecb414d-4437-4a4c-9d0b-c2067c2298e5",
      },
      archived: false,
      properties: {
        Content: {
          id: "DOTb",
          type: "rich_text",
          rich_text: [
            {
              type: "text",
              text: {
                content: "add a bit of markup here",
                link: null,
              },
              annotations: {
                bold: false,
                italic: false,
                strikethrough: false,
                underline: false,
                code: false,
                color: "default",
              },
              plain_text: "add a bit of markup here",
              href: null,
            },
          ],
        },
        Tags: {
          id: "qblQ",
          type: "multi_select",
          multi_select: [
            {
              id: "8f32c9a1-d481-48c8-8869-dee5216e6d1e",
              name: "JavaScript",
              color: "pink",
            },
          ],
        },
        Name: {
          id: "title",
          type: "title",
          title: [
            {
              type: "text",
              text: {
                content: "second entry",
                link: null,
              },
              annotations: {
                bold: false,
                italic: false,
                strikethrough: false,
                underline: false,
                code: false,
                color: "default",
              },
              plain_text: "second entry",
              href: null,
            },
          ],
        },
      },
      url: "https://www.notion.so/second-entry-40d9db594221439887bc4d8aaf61a03a",
    },
    {
      object: "page",
      id: "a6e9d479-84eb-4115-af2e-549d3d8e70bc",
      created_time: "2022-04-28T02:53:00.000Z",
      last_edited_time: "2022-05-08T07:43:00.000Z",
      created_by: {
        object: "user",
        id: "10899024-9ff4-4275-bd09-9953d6e73349",
      },
      last_edited_by: {
        object: "user",
        id: "10899024-9ff4-4275-bd09-9953d6e73349",
      },
      cover: null,
      icon: null,
      parent: {
        type: "database_id",
        database_id: "cecb414d-4437-4a4c-9d0b-c2067c2298e5",
      },
      archived: false,
      properties: {
        Content: {
          id: "DOTb",
          type: "rich_text",
          rich_text: [],
        },
        Tags: {
          id: "qblQ",
          type: "multi_select",
          multi_select: [],
        },
        Name: {
          id: "title",
          type: "title",
          title: [
            {
              type: "text",
              text: {
                content: "first entry",
                link: null,
              },
              annotations: {
                bold: false,
                italic: false,
                strikethrough: false,
                underline: false,
                code: false,
                color: "default",
              },
              plain_text: "first entry",
              href: null,
            },
          ],
        },
      },
      url: "https://www.notion.so/first-entry-a6e9d47984eb4115af2e549d3d8e70bc",
    },
  ],
  next_cursor: null,
  has_more: false,
  type: "page",
  page: {},
};

describe("*** [route][braindumps] > braindumps-helpers.ts", () => {
  describe("*** retrieveBraindumpsFromNotionDatabase", () => {
    it("+++ should categorise braindumps", () => {
      const mapped = helpersToTest.retrieveBraindumpsFromNotionDatabase(
        notionDatabasePayload
      );

      expect(mapped).toEqual(
        expect.objectContaining({
          JavaScript: expect.arrayContaining([
            expect.objectContaining({
              created_at: "2022-05-09T04:38:00.000Z",
              Content: null,
              Name: "fourth entry but a very very very very very very very long title what happens",
            }),
          ]),
          Uncategorised: expect.arrayContaining([
            expect.objectContaining({
              created_at: "2022-04-28T02:53:00.000Z",
              Content: null,
              Name: "first entry",
            }),
          ]),
        })
      );
    });
    it("+++ should categorise braindumps, even if braindump includes null column entries", () => {
      const mapped = helpersToTest.retrieveBraindumpsFromNotionDatabase({
        object: "list",
        results: [
          {
            object: "page",
            id: "07ce6ea2-76e7-468d-b72c-855fa952c96e",
            created_time: "2022-05-09T04:38:00.000Z",
            last_edited_time: "2022-05-21T02:49:00.000Z",
            created_by: {
              object: "user",
              id: "10899024-9ff4-4275-bd09-9953d6e73349",
            },
            last_edited_by: {
              object: "user",
              id: "10899024-9ff4-4275-bd09-9953d6e73349",
            },
            cover: null,
            icon: null,
            parent: {
              type: "database_id",
              database_id: "cecb414d-4437-4a4c-9d0b-c2067c2298e5",
            },
            archived: false,
            properties: {
              Markdown: {
                id: "TSxg",
                type: "url",
                url: null,
              },
              Tags: {
                id: "qblQ",
                type: "multi_select",
                multi_select: [
                  {
                    id: "8f32c9a1-d481-48c8-8869-dee5216e6d1e",
                    name: "JavaScript",
                    color: "pink",
                  },
                ],
              },
            },
            url: "https://www.notion.so/fourth-entry-but-a-very-very-very-very-very-very-very-long-title-what-happens-07ce6ea276e7468db72c855fa952c96e",
          },
        ],
        next_cursor: null,
        has_more: false,
        type: "page",
        page: {},
      });

      expect(mapped).toEqual(
        expect.objectContaining({
          JavaScript: expect.arrayContaining([
            expect.objectContaining({
              created_at: "2022-05-09T04:38:00.000Z",
              Markdown: null,
            }),
          ]),
        })
      );
    });
    it("+++ should categorise braindumps belonging to multiple categories", () => {
      const mapped = helpersToTest.retrieveBraindumpsFromNotionDatabase({
        object: "list",
        results: [
          {
            object: "page",
            id: "40d9db59-4221-4398-87bc-4d8aaf61a03a",
            created_time: "2022-05-07T08:51:00.000Z",
            last_edited_time: "2022-05-20T22:26:00.000Z",
            created_by: {
              object: "user",
              id: "10899024-9ff4-4275-bd09-9953d6e73349",
            },
            last_edited_by: {
              object: "user",
              id: "10899024-9ff4-4275-bd09-9953d6e73349",
            },
            cover: null,
            icon: null,
            parent: {
              type: "database_id",
              database_id: "cecb414d-4437-4a4c-9d0b-c2067c2298e5",
            },
            archived: false,
            properties: {
              Content: {
                id: "DOTb",
                type: "rich_text",
                rich_text: [
                  {
                    type: "text",
                    text: {
                      content: "add a bit of markup here",
                      link: null,
                    },
                    annotations: {
                      bold: false,
                      italic: false,
                      strikethrough: false,
                      underline: false,
                      code: false,
                      color: "default",
                    },
                    plain_text: "add a bit of markup here",
                    href: null,
                  },
                ],
              },
              /* note the prescence of multiple Tags */
              Tags: {
                id: "qblQ",
                type: "multi_select",
                multi_select: [
                  {
                    id: "8f32c9a1-d481-48c8-8869-dee5216e6d1e",
                    name: "JavaScript",
                    color: "pink",
                  },
                  {
                    id: "9663d284-629d-4ea2-84b4-afacfaa41530",
                    name: "TypeScript",
                    color: "yellow",
                  },
                ],
              },
              Name: {
                id: "title",
                type: "title",
                title: [
                  {
                    type: "text",
                    text: {
                      content: "second entry",
                      link: null,
                    },
                    annotations: {
                      bold: false,
                      italic: false,
                      strikethrough: false,
                      underline: false,
                      code: false,
                      color: "default",
                    },
                    plain_text: "second entry",
                    href: null,
                  },
                ],
              },
            },
            url: "https://www.notion.so/second-entry-40d9db594221439887bc4d8aaf61a03a",
          },
        ],
        next_cursor: null,
        has_more: false,
        type: "page",
        page: {},
      });

      expect(mapped).toEqual(
        expect.objectContaining({
          "JavaScript TypeScript": expect.arrayContaining([
            expect.objectContaining({
              Content: "add a bit of markup here",
              Name: "second entry",
              created_at: "2022-05-07T08:51:00.000Z",
            }),
          ]),
        })
      );
    });
    it("+++ should categorise uncategorised braindumps as being (un)categorised", () => {
      const mapped = helpersToTest.retrieveBraindumpsFromNotionDatabase({
        object: "list",
        results: [
          {
            object: "page",
            id: "40d9db59-4221-4398-87bc-4d8aaf61a03a",
            created_time: "2022-05-07T08:51:00.000Z",
            last_edited_time: "2022-05-19T23:00:00.000Z",
            created_by: {
              object: "user",
              id: "10899024-9ff4-4275-bd09-9953d6e73349",
            },
            last_edited_by: {
              object: "user",
              id: "10899024-9ff4-4275-bd09-9953d6e73349",
            },
            cover: null,
            icon: null,
            parent: {
              type: "database_id",
              database_id: "cecb414d-4437-4a4c-9d0b-c2067c2298e5",
            },
            archived: false,
            properties: {
              Content: {
                id: "DOTb",
                type: "rich_text",
                rich_text: [
                  {
                    type: "text",
                    text: {
                      content: "add a bit of markup here",
                      link: null,
                    },
                    annotations: {
                      bold: false,
                      italic: false,
                      strikethrough: false,
                      underline: false,
                      code: false,
                      color: "default",
                    },
                    plain_text: "add a bit of markup here",
                    href: null,
                  },
                ],
              },
              Tags: {
                id: "qblQ",
                type: "multi_select",
                multi_select: [],
              },
              Name: {
                id: "title",
                type: "title",
                title: [
                  {
                    type: "text",
                    text: {
                      content: "second entry",
                      link: null,
                    },
                    annotations: {
                      bold: false,
                      italic: false,
                      strikethrough: false,
                      underline: false,
                      code: false,
                      color: "default",
                    },
                    plain_text: "second entry",
                    href: null,
                  },
                ],
              },
            },
            url: "https://www.notion.so/second-entry-40d9db594221439887bc4d8aaf61a03a",
          },
          {
            object: "page",
            id: "a6e9d479-84eb-4115-af2e-549d3d8e70bc",
            created_time: "2022-04-28T02:53:00.000Z",
            last_edited_time: "2022-05-08T07:43:00.000Z",
            created_by: {
              object: "user",
              id: "10899024-9ff4-4275-bd09-9953d6e73349",
            },
            last_edited_by: {
              object: "user",
              id: "10899024-9ff4-4275-bd09-9953d6e73349",
            },
            cover: null,
            icon: null,
            parent: {
              type: "database_id",
              database_id: "cecb414d-4437-4a4c-9d0b-c2067c2298e5",
            },
            archived: false,
            properties: {
              Content: {
                id: "DOTb",
                type: "rich_text",
                rich_text: [],
              },
              Tags: {
                id: "qblQ",
                type: "multi_select",
                multi_select: [],
              },
              Name: {
                id: "title",
                type: "title",
                title: [
                  {
                    type: "text",
                    text: {
                      content: "first entry",
                      link: null,
                    },
                    annotations: {
                      bold: false,
                      italic: false,
                      strikethrough: false,
                      underline: false,
                      code: false,
                      color: "default",
                    },
                    plain_text: "first entry",
                    href: null,
                  },
                ],
              },
            },
            url: "https://www.notion.so/first-entry-a6e9d47984eb4115af2e549d3d8e70bc",
          },
        ],
        next_cursor: null,
        has_more: false,
        type: "page",
        page: {},
      });

      expect(mapped).toEqual(
        expect.objectContaining({
          Uncategorised: expect.arrayContaining([
            expect.objectContaining({
              created_at: "2022-04-28T02:53:00.000Z",
              Content: null,
              Name: "first entry",
            }),
            expect.objectContaining({
              Content: "add a bit of markup here",
              Name: "second entry",
              created_at: "2022-05-07T08:51:00.000Z",
            }),
          ]),
        })
      );
    });
  });
});
