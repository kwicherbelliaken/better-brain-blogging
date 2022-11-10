import { Link, Outlet } from "@remix-run/react";
import AnimatedButton from "~/components/AnimatedButton";
import BostockMetaballAnimation from "~/components/BostockMetaballAnimation";
import Title from "~/components/Title";

import { useOptionalUser } from "~/utils";

const LeftHandPanel = () => {
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

export default function Index() {
  const user = useOptionalUser();

  // const AnimationNode = () => {
  //   const ref: React.MutableRefObject<null> = useRef(null)

  //   useEffect(() => {
  //     if (ref.current) BostockMetaballAnimation(ref.current)
  //   }, [])

  //   return <div ref={ref} />
  // }

  // TODO: add the minimum CSS trick
  // TODO: read about good CSS practices including which colour to add

  // TODO: some JS testing exercises

  // TODO: add fonts
  // TODO: write copy for the different sections
  // TODO: think about including fuzzy-scrawls?
  // TODO: align the divs along left hand vertical axis but also within the center

  return (
    <main className="relative h-screen min-h-screen flex-row bg-white sm:flex sm:items-center">
      <Outlet />
      <LeftHandPanel />

      <div className="flex h-full w-2/3">
        <div className="flex flex-col space-y-64 p-16">
          <Title.H3>
            This is where I will write a small blurb about what the purpose of
            this website is
          </Title.H3>

          <Link to="braindumps">
            <AnimatedButton styleProps={["px-16", "py-8"]}>
              <Title.H1>braindumps</Title.H1>
            </AnimatedButton>
          </Link>
        </div>
      </div>
    </main>
  );
}

// <div className="relative sm:pb-16 sm:pt-8">
//   <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
//     <div className="relative shadow-xl sm:overflow-hidden sm:rounded-2xl">
//       <div className="absolute inset-0">
//         <img
//           className="h-full w-full object-cover"
//           src="https://user-images.githubusercontent.com/1500684/158276318-61064670-06c3-43f3-86e3-d624785b8ff7.jpg"
//           alt="Nirvana playing on stage with Kurt's jagstang guitar"
//         />
//         <div className="absolute inset-0 bg-[color:rgba(255,56,56,0.5)] mix-blend-multiply" />
//       </div>
//       <div className="lg:pb-18 relative px-4 pt-16 pb-8 sm:px-6 sm:pt-24 sm:pb-14 lg:px-8 lg:pt-32">
//         <h1 className="text-center text-6xl font-extrabold tracking-tight sm:text-8xl lg:text-9xl">
//           <span className="text-red-500 block uppercase drop-shadow-md">
//             Grunge Stack
//           </span>
//         </h1>
//         <p className="mx-auto mt-6 max-w-lg text-center text-xl text-white sm:max-w-3xl">
//           Check the README.md file for instructions on how to get this
//           project deployed.
//         </p>
//         <div className="mx-auto mt-10 max-w-sm sm:flex sm:max-w-none sm:justify-center">
//           {user ? (
//             <Link
//               to="/notes"
//               className="border-transparent text-red-700 hover:bg-red-50 flex items-center justify-center rounded-md border bg-white px-4 py-3 text-base font-medium shadow-sm sm:px-8"
//             >
//               View Notes for {user.email}
//             </Link>
//           ) : (
//             <div className="space-y-4 sm:mx-auto sm:inline-grid sm:grid-cols-2 sm:gap-5 sm:space-y-0">
//               <Link
//                 to="/join"
//                 className="border-transparent text-red-700 hover:bg-red-50 flex items-center justify-center rounded-md border bg-white px-4 py-3 text-base font-medium shadow-sm sm:px-8"
//               >
//                 Sign up
//               </Link>
//               <Link
//                 to="/login"
//                 className="bg-red-500 hover:bg-red-600 flex items-center justify-center rounded-md px-4 py-3 font-medium text-white  "
//               >
//                 Log In
//               </Link>
//             </div>
//           )}
//         </div>
//         <a href="https://remix.run">
//           <img
//             src="https://user-images.githubusercontent.com/1500684/158298926-e45dafff-3544-4b69-96d6-d3bcc33fc76a.svg"
//             alt="Remix"
//             className="mx-auto mt-16 w-full max-w-[12rem] md:max-w-[16rem]"
//           />
//         </a>
//       </div>
//     </div>
//   </div>

//   <div className="mx-auto max-w-7xl py-2 px-4 sm:px-6 lg:px-8">
//     <div className="mt-6 flex flex-wrap justify-center gap-8">
//       {[
//         {
//           src: "https://user-images.githubusercontent.com/1500684/157991167-651c8fc5-2f72-4afa-94d8-2520ecbc5ebc.svg",
//           alt: "AWS",
//           href: "https://aws.com",
//         },
//         {
//           src: "https://user-images.githubusercontent.com/1500684/157991935-26c0d587-b866-49f5-af34-8f04be1c9df2.svg",
//           alt: "DynamoDB",
//           href: "https://aws.amazon.com/dynamodb/",
//         },
//         {
//           src: "https://user-images.githubusercontent.com/1500684/157990874-31f015c3-2af7-4669-9d61-519e5ecfdea6.svg",
//           alt: "Architect",
//           href: "https://arc.codes",
//         },
//         {
//           src: "https://user-images.githubusercontent.com/1500684/157764276-a516a239-e377-4a20-b44a-0ac7b65c8c14.svg",
//           alt: "Tailwind",
//           href: "https://tailwindcss.com",
//         },
//         {
//           src: "https://user-images.githubusercontent.com/1500684/157764454-48ac8c71-a2a9-4b5e-b19c-edef8b8953d6.svg",
//           alt: "Cypress",
//           href: "https://www.cypress.io",
//         },
//         {
//           src: "https://user-images.githubusercontent.com/1500684/157772386-75444196-0604-4340-af28-53b236faa182.svg",
//           alt: "MSW",
//           href: "https://mswjs.io",
//         },
//         {
//           src: "https://user-images.githubusercontent.com/1500684/157772447-00fccdce-9d12-46a3-8bb4-fac612cdc949.svg",
//           alt: "Vitest",
//           href: "https://vitest.dev",
//         },
//         {
//           src: "https://user-images.githubusercontent.com/1500684/157772662-92b0dd3a-453f-4d18-b8be-9fa6efde52cf.png",
//           alt: "Testing Library",
//           href: "https://testing-library.com",
//         },
//         {
//           src: "https://user-images.githubusercontent.com/1500684/157772934-ce0a943d-e9d0-40f8-97f3-f464c0811643.svg",
//           alt: "Prettier",
//           href: "https://prettier.io",
//         },
//         {
//           src: "https://user-images.githubusercontent.com/1500684/157772990-3968ff7c-b551-4c55-a25c-046a32709a8e.svg",
//           alt: "ESLint",
//           href: "https://eslint.org",
//         },
//         {
//           src: "https://user-images.githubusercontent.com/1500684/157773063-20a0ed64-b9f8-4e0b-9d1e-0b65a3d4a6db.svg",
//           alt: "TypeScript",
//           href: "https://typescriptlang.org",
//         },
//       ].map((img) => (
//         <a
//           key={img.href}
//           href={img.href}
//           className="flex h-16 w-32 justify-center p-1 grayscale transition hover:grayscale-0 focus:grayscale-0"
//         >
//           <img alt={img.alt} src={img.src} />
//         </a>
//       ))}
//     </div>
//   </div>
// </div>
