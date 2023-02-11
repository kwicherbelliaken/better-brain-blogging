import React from "react";
import { Outlet } from "@remix-run/react";

//? types
import type { HeadersFunction } from "@remix-run/server-runtime";

//? hooks
import { useCheckMobileScreen } from "../hooks";

//? components
import Title from "~/components/Title";
import BostockMetaballAnimation from "~/components/BostockMetaballAnimation";

//? images
import illustration from "../../public/miguel-cruz-illustration.png";

const commonGridStyles =
  "font-helvetica flex justify-center outline outline-1 outline-midnight-dark items-center";

const Section = ({ children }) => <>{children}</>;

Section.Top = () => (
  <>
    <div
      className={`col-start-1 col-end-3 flex items-center justify-center font-helvetica outline outline-1 outline-midnight-dark`}
    >
      2023
    </div>
    <div className={`col-start-3 col-end-9 ${commonGridStyles} space-x-6`}>
      <p>badly</p>
      <p>juiced</p>
    </div>

    <div className={`col-start-9 col-end-11 ${commonGridStyles}`}>
      good learnings
    </div>
  </>
);

Section.Middle = () => (
  <div
    className={`${commonGridStyles} col-start-1 col-end-11 row-start-2 row-end-5 flex-col`}
  >
    <Title.H1 styleProps={["text-6xl"]}>BRAINDUMPS</Title.H1>

    <p>/brah-ay-nuhh-doo-mmmps/</p>
  </div>
);

Section.Bottom = () => (
  <>
    <div
      className={`col-start-1 col-end-5 row-start-5 row-end-7 flex flex-row items-center space-y-2 font-helvetica outline outline-1 outline-midnight-dark`}
    >
      <div className="flex flex-col pl-8">
        <p>ai free</p>
        <p>organic content</p>
      </div>
    </div>

    <div
      className={`col-start-1 col-end-5 row-span-3 row-start-7 flex flex-row items-center space-y-2 font-helvetica outline outline-1 outline-midnight-dark`}
    >
      <div className="flex flex-col pl-8">
        <p className="font-semibold">notes:</p>
        <p>very refreshing and effervescent</p>
      </div>
    </div>

    <div
      className={`col-start-5 col-end-8 row-span-4 row-start-5 flex flex-row items-center space-y-2 font-helvetica outline outline-1 outline-midnight-dark`}
    >
      <div className="flex flex-col pl-8">
        <p className="font-semibold">free from:</p>
        <p>dipshittedness and flaky renderings</p>
      </div>
    </div>
    <div
      className={`col-start-8 col-end-11 row-span-4 row-start-5 flex flex-row items-center space-y-2 font-helvetica outline outline-1 outline-midnight-dark`}
    >
      <div className="flex flex-col pl-8">
        <p className="font-semibold">pairs well with:</p>
        <p>your all time favourite biscuit</p>
      </div>
    </div>

    <div
      className={`row-start-9 col-start-5 col-end-8 row-span-1 flex flex-row items-center font-helvetica outline outline-1 outline-midnight-dark`}
    >
      <p className="pl-8">vegan friendly</p>
    </div>

    <div
      className={`row-start-9 col-start-8 col-end-11 row-span-1 flex flex-row items-center font-helvetica outline outline-1 outline-midnight-dark`}
    >
      <p className="pl-8">penned in wellington</p>
    </div>
  </>
);

const SummaryPanelWithBostockAnimation = () => {
  return (
    <div className="relative flex h-full flex-auto flex-col items-center justify-center overflow-hidden">
      <BostockMetaballAnimation />
      <div className="z-10 m-10 grid grid-cols-10 grid-rows-9 bg-white p-4 outline outline-1 outline-midnight-dark">
        <Section.Top />
        <Section.Middle />
        <Section.Bottom />
      </div>
    </div>
  );
};

export const headers: HeadersFunction = ({ loaderHeaders }) => {
  return { "Cache-Control": loaderHeaders.get("Cache-Control")! };
};

export default function BraindumpsIndex() {
  const isMobile = useCheckMobileScreen();

  const styleWithBgImage = `flex h-full w-full flex-col justify-center bg-[url(${illustration})] bg-cover bg-center bg-no-repeat p-10 align-middle`;

  return (
    <div className="relative h-screen min-h-screen flex-row bg-white sm:flex sm:items-center">
      {!isMobile ? (
        <>
          <SummaryPanelWithBostockAnimation />
          <Outlet />
        </>
      ) : (
        <div className={styleWithBgImage}>
          <div className="pb-10">
            <Title.H3>Oh! Bugger!</Title.H3>
          </div>
          <Title.H4>
            y'all gonna need a lappy toppy or bigger phone to see this web page
          </Title.H4>
        </div>
      )}
    </div>
  );
}
