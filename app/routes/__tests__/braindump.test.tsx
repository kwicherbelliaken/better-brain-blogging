import { render } from "@testing-library/react";

import BraindumpsIndex from "~/routes/braindumps/";

describe("Home page", () => {
  it("renders a heading", () => {
    render(<BraindumpsIndex />);

    console.log("LOGGING THE INDEX: ", { Index: BraindumpsIndex });

    // const heading = screen.getByRole("heading", {
    //   name: /Remix/i,
    // });
  });
});
