import React from "react";
import { Link } from "@remix-run/react";

//? components
import Title from "~/components/Title";
import Layout from "~/components/Layout";
import { AnimatedButton } from "~/components/button";
import PageTransition from "~/components/pageTransition";

const Introduction = () => {
  return (
    <Layout.FullHeight classNameProp={["w-2/3 flex flex-col justify-center"]}>
      <div className="flex flex-col space-y-32 p-16">
        <Title.H3>
          Inside is a collection of braindumps. These are things I have tried to
          figure out for myself, summarised for you.
        </Title.H3>
        <Title.H3>
          I've tried to catalogue the content per the topics it touches. But,
          hey, I'm no good an arbiter of pigeon holes sometimes, so it might not
          be to everyones liking or understanding.
        </Title.H3>
        <div className="flex justify-center">
          <Link to="list">
            <AnimatedButton styleProps={["px-16", "py-8"]}>
              <Title.H1 styleProps={["pb-0"]}>braindumps</Title.H1>
            </AnimatedButton>
          </Link>
        </div>
      </div>
    </Layout.FullHeight>
  );
};

export default function BraindumpsIndex() {
  return (
    <PageTransition.GradientMapTransition
      classNameProps={["h-[calc(100vh-4rem)]", "w-2/3", "overflow-hidden"]}
    >
      <Introduction />
    </PageTransition.GradientMapTransition>
  );
}
