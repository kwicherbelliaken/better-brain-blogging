# 🧠 [Better Brain Blogging ](https://betterbrainblogging.com/)

👆 That's a link.

👉 https://betterbrainblogging.com/ is another link.

Click on one to explore what Better Brain Blogging is all about.

<p align="center">
  <a href="#the-why">🤔 The Big W "Why?"</a> •
  <a href="#what-is-in-this-stack">💻 The Stack</a> •
  <a href="#the-roadmap">🗺 The Roadmap</a>
</p>

Landing             |  Blogposts | Blogpost
:-------------------------:|:-------------------------:|:-------------------------:
![image](https://github.com/kwicherbelliaken/better-brain-blogging/assets/35620369/d1c24c80-d609-4639-b1f1-6c62eed89631) | ![image](https://github.com/kwicherbelliaken/better-brain-blogging/assets/35620369/b3bc1f3a-f2b3-4a85-9d6b-6d5498dc127e)  | ![image](https://github.com/kwicherbelliaken/better-brain-blogging/assets/35620369/faa83c48-61b8-40a1-8039-211b51e92aba) |

## The Why

Everyone needs a blog. The universe is ravenous, craving for my opinion. Duh. Come on, man.

## What is in this stack?

- [AWS deployment](https://aws.com) with [Architect](https://arc.codes/)
- Production-ready [DynamoDB Database](https://aws.amazon.com/dynamodb/)
- [GitHub Actions](https://github.com/features/actions) for deploy on merge to production and staging environments
- Email/Password Authentication with [cookie-based sessions](https://remix.run/docs/en/v1/api/remix#createcookiesessionstorage)
- DynamoDB access via [`arc.tables`](https://arc.codes/docs/en/reference/runtime-helpers/node.js#arc.tables)
- Styling with [Tailwind](https://tailwindcss.com/)
- End-to-end testing with [Cypress](https://cypress.io)
- Local third party request mocking with [MSW](https://mswjs.io)
- Unit testing with [Vitest](https://vitest.dev) and [Testing Library](https://testing-library.com)
- Code formatting with [Prettier](https://prettier.io)
- Linting with [ESLint](https://eslint.org)
- Static Types with [TypeScript](https://typescriptlang.org)

### Architecture

I use Notion as my content management system (CMS). Each blog post is created as a page, and these pages are organized as entries in a database.

All kudos for the landing page animation goes to Mike Bostock and his [Metaball Animation](https://observablehq.com/@mbostock/metaballs). I thought it looked coool so I stole it!

### Influences / References

- https://dev.to/martenstijs/how-we-used-notion-as-a-cms-for-our-blog-5b63: I used this to process the JSON Notion Page Block content as it seemed a good means of interpreting the Notion response payload.

- https://www.npmjs.com/package/notion-to-md: I was originally going to use this inside the $braindumpId loader and then process the returned Markdown into HTML using some interpreter. Fortunately, Notion chose against returning queried against resources as Markdown for JSON.

