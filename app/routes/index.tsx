import { redirect } from "@remix-run/node";
import { Outlet } from "@remix-run/react";

import type { LoaderFunction } from "@remix-run/node";

export const loader: LoaderFunction = async () => {
  return redirect("/braindumps");
};

export default function Index() {
  // TODO: add the minimum CSS trick

  // TODO: read about good CSS practices including which colour to add

  // TODO: some JS testing exercises

  // TODO: add fonts
  // TODO: write copy for the different sections

  // TODO: think about including fuzzy-scrawls?

  // TODO: align the divs along left hand vertical axis but also within the center

  return (
    <main>
      <Outlet />
    </main>
  );
}
