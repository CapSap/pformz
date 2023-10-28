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
            className="text-2xl bg-lime-200 py-3 px-10 ml-32 rounded-2xl border-lime-300 border"
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
        hello and welcome {user.emailAddresses[0].emailAddress} to the paddy
        form app.
      </div>
    );
  }
}
