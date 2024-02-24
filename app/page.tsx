"use client";

import { useUser } from "@clerk/nextjs";
import Image from "next/image";
import { Link } from "@chakra-ui/next-js";
import NotSignedIn from "./components/NotSignedIn";
import SignedIn from "./components/SignedIn";

export default function Home() {
  const { isSignedIn, user, isLoaded } = useUser();

  if (!isSignedIn) {
    return <NotSignedIn />;
  } else if (isSignedIn) {
    return <SignedIn userEmail={user.emailAddresses[0].emailAddress} />;
  }
}
