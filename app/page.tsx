"use client";

import { useUser } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  const { isSignedIn, user, isLoaded } = useUser();

  if (!isSignedIn) {
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
  } else if (isSignedIn) {
    return (
      <div>
        <div className="landing-background"></div>
        <div className="ml-60 pt-72 ">
          <h1 className="text-9xl">
            Welcome {user.emailAddresses[0].emailAddress}
          </h1>
          <p className="text-5xl mt-10">
            hello and welcome to the paddy form app.
          </p>
          <p className="text-4xl mt-2">
            Click a link in the top right to get started
          </p>
        </div>
      </div>
    );
  }
}
