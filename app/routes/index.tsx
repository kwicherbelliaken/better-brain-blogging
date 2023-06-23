import { redirect } from "@remix-run/node";
import { Outlet } from "@remix-run/react";

import type { LoaderFunction } from "@remix-run/node";

export const loader: LoaderFunction = async () => {
  return redirect("/braindumps");
};

export default function Index() {
  return (
    <main>
      <Outlet />
    </main>
  );
}
