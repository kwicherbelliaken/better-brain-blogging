import Title from "~/components/Title";
import AnimatedButton from "~/components/AnimatedButton";
import { Link } from "@remix-run/react";

const Introduction = () => {
  //! NB: h-[calc(100vh-4rem)] needed to explicitly set the height otherwise we get scrollbars
  //! https://github.com/slackermorris/better-brain-blogging/issues/10#issuecomment-1437429507
  return (
    <div className="flex h-[calc(100vh-4rem)] w-2/3">
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
              <Title.H1>braindumps</Title.H1>
            </AnimatedButton>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default function BraindumpsIndex() {
  return <Introduction />;
}
