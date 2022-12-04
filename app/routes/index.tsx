import { redirect } from "@remix-run/node";
import { Outlet } from "@remix-run/react";
import BostockMetaballAnimation from "~/components/BostockMetaballAnimation";
import Title from "~/components/Title";
import { useOptionalUser } from "~/utils";

import type { LoaderFunction } from "@remix-run/node";

const SummaryPanelWithBostockAnimation = () => {
  const commonGridStyles =
    "font-helvetica flex justify-center outline outline-1 outline-midnight-dark items-center";

  return (
    <div className="relative flex h-full w-1/3 flex-auto flex-col items-center justify-center overflow-hidden">
      <BostockMetaballAnimation />
      <div className="z-10 m-10 grid grid-cols-10 grid-rows-9 bg-white p-4 outline outline-1 outline-midnight-dark">
        <div className={`col-start-1 col-end-3 ${commonGridStyles}`}>2022</div>

        <div className={`col-start-3 col-end-9 ${commonGridStyles} space-x-6`}>
          <p>alc 10%</p>
          <p>bp vol</p>
        </div>

        <div
          className={`col-start-9 col-end-11 text-center ${commonGridStyles}`}
        >
          sparkling wine
        </div>

        <div
          className={`${commonGridStyles} col-start-1 col-end-11 row-start-2 row-end-5 flex-col`}
        >
          <Title.H1 styleProps={["text-6xl"]}>BRAINDUMPS</Title.H1>

          <p>/brah-ay-nuhh-doo-mmmps/</p>
        </div>

        {/* SECTION:  */}
        <div
          className={`${commonGridStyles} col-start-1 col-end-5 row-start-5 row-end-7 flex-col`}
        >
          <div>
            <p>made with</p>
            <p>granopla grapes</p>
          </div>
        </div>

        <div
          className={`${commonGridStyles} col-start-1 col-end-5 row-span-3 row-start-7 flex-col text-center`}
        >
          <div>
            notes:
            <br />
            very refreshing and effervescent
          </div>
        </div>

        {/* SECTION:  */}
        <div
          className={`${commonGridStyles} col-start-5 col-end-8 row-span-4 row-start-5 flex-col space-y-2`}
        >
          <div>
            <p>free from:</p>
            <p>concentrates and artificial colours</p>
          </div>
        </div>
        <div
          className={`${commonGridStyles} col-start-8 col-end-11 row-span-4 row-start-5 flex-col space-y-2`}
        >
          <p>pairs well with:</p>
          <p>the sound of laughter and moments to remember</p>
        </div>

        {/* SECTION:  */}

        <div
          className={`${commonGridStyles} row-start-9 col-start-5 col-end-8 row-span-1`}
        >
          vegan friendly
        </div>

        <div
          className={`${commonGridStyles} row-start-9 col-start-8 col-end-11 row-span-1`}
        >
          made in spain
        </div>
      </div>
    </div>
  );
};

export const loader: LoaderFunction = async () => {
  return redirect("/braindumps");
};

export default function Index() {
  const user = useOptionalUser();

  // TODO: add the minimum CSS trick

  // TODO: read about good CSS practices including which colour to add

  // TODO: some JS testing exercises

  // TODO: add fonts
  // TODO: write copy for the different sections

  // TODO: think about including fuzzy-scrawls?

  // TODO: align the divs along left hand vertical axis but also within the center

  return (
    <main className="relative h-screen min-h-screen flex-row bg-white sm:flex sm:items-center">
      <SummaryPanelWithBostockAnimation />
      <Outlet />
    </main>
  );
}
