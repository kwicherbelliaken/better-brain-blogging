const path = require("path");

/**
 * @type {import('@remix-run/dev').AppConfig}
 */
module.exports = {
  appDirectory: "app",
  cacheDirectory: "./node_modules/.cache/remix",
  assetsBuildDirectory: "public/build",
  publicPath: "/_static/build/",
  serverBuildTarget: "arc",
  server: "./server.js",
  ignoredRouteFiles: [".*", "**/*.css", "**/*.test.{js,jsx,ts,tsx}"],
  routes(defineRoutes) {
    return defineRoutes((route) => {
      if (process.env.NODE_ENV === "production") return;

      /* TODO 
      > restore this test route creation, not sure why it is erroring.. though perhaps path '__tests/create-user' not existing might have something to do
        with it.
        
      > [READ THIS]: https://remix.run/docs/en/v1/guides/routing
      */

      console.log("⚠️  Test routes enabled.");
      // route(
      //   "__tests/create-user",
      //   path.join(__dirname, "cypress/support/test-routes/create-user.ts")
      // );
    });
  },
  sourcemap: true,
  serverDependenciesToBundle: ["fuzzy-scrawl"],
};
