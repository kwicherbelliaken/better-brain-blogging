import Title from "~/components/Title";
import AnimatedButton from "~/components/AnimatedButton";
import { Link } from "@remix-run/react";

const Introduction = () => {
  console.log("MADE IT HERE");

  return (
    <div className="flex h-full w-2/3">
      <div className="flex flex-col space-y-64 p-16">
        <Title.H3>
          This is where I will write a small blurb about what the purpose of
          this website is
        </Title.H3>
        <Link to="list">
          <AnimatedButton styleProps={["px-16", "py-8"]}>
            <Title.H1>braindumps</Title.H1>
          </AnimatedButton>
        </Link>
      </div>
    </div>
  );
};

export default function BraindumpsIndex() {
  return <Introduction />;
}
