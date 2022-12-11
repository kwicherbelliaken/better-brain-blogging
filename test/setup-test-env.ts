import { installGlobals } from "@remix-run/node";
import "@testing-library/jest-dom/extend-expect";

// INFO: This installs globals such as "fetch", "Response", "Request" and "Headers"
// ? https://remix.run/docs/en/v1/other-api/node
installGlobals();
