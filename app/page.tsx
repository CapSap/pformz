"use client";

import { useUser } from "@clerk/nextjs";
import Image from "next/image";

export default function Home() {
  const { isSignedIn, user, isLoaded } = useUser();

  if (!isSignedIn) {
    return (
      <div>
        <div className="landing-background"></div>
        <h1 className="text-9xl ml-32">pformz</h1>
        <p>hello and welcome to the paddy form app. sign in to get started</p>
        <button className="text-2xl bg-slate-200 p-3">Sign in</button>
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
