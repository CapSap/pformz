import { Link } from "@chakra-ui/next-js";

export default function NotSignedIn() {
  return (
    <div>
      <div className="landing-background"></div>
      <div className="ml-60 pt-72 ">
        <h1 className="text-[12rem]">pformz</h1>
        <Link
          className="text-2xl bg-lime-200 py-3 px-10 ml-32 rounded-2xl border-lime-300 border hover:underline hover:bg-lime-300"
          href="/sign-in"
        >
          Sign in
        </Link>
      </div>
      <div className="landing-circle"></div>
    </div>
  );
}
