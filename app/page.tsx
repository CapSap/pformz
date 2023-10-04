"use client";

import { useUser } from "@clerk/nextjs";
import Image from "next/image";

export default function Home() {
  const { isSignedIn, user, isLoaded } = useUser();

  if (!isSignedIn) {
    return (
      <div>hello and welcome to the paddy form app. sign in to get started</div>
    );
  } else if (isSignedIn) {
    return (
      <div>
        hello and welcome {user.emailAddresses[0].emailAddress} to the paddy
        form app.
      </div>
    );
  }
}
