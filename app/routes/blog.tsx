import { Link } from "@remix-run/react";

export default function BlogPage() {
  return (
    <div className="flex flex-col items-center justify-center">
      <div>
        <h1 className="pb-4">Better Brain Blogging</h1>
        <div>
          <p>I suck at remembering shit.</p>
          <p>This is my attempt at remembering shit.</p>
        </div>
        <div className="mt-8 flex flex-row justify-center">
          <Link to="/braindumps">
            <p className="pr-2 font-bold">Everyday Learning:</p>
          </Link>
          <p className="italic">Takeaways from what I have been learning</p>
        </div>
      </div>
    </div>
  );
}
