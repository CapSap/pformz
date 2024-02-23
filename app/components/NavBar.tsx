"use client";

import { UserButton } from "@clerk/nextjs";
import Link from "next/link";
import { useUser } from "@clerk/nextjs";

const links = [
  { href: "/", label: "Home" },
  {
    href: "/submit-bulk-ibts",
    label: "Submit bulk problem IBTs to zendesk",
  },
  {
    href: "/stock-checker",
    label: "Stock Checker",
  },
  {
    href: "/store-request-form",
    label: "Store Requests",
  },
];

const notSignedInLinks = [
  { href: "/", label: "Home" },
  { href: "/sign-in", label: "Sign in" },
  { href: "/sign-up", label: "Sign up" },
];

export default function NavBar() {
  const { isSignedIn, user, isLoaded } = useUser();

  if (isSignedIn) {
    return (
      <nav className="flex justify-end">
        <ul className="flex items-center justify-end border-lime-500 border bg-lime-300 h-16  pl-2 pr-6 mt-10">
          {links.map((link) => (
            <li key={link.href} className="mx-2 text-lg hover:underline">
              <Link href={link.href}>{link.label}</Link>
            </li>
          ))}
          <li className="mx-2">
            <UserButton afterSignOutUrl="/" />
          </li>
        </ul>
      </nav>
    );
  } else {
    return (
      <nav className="flex justify-end">
        <ul className="flex items-center justify-end border-lime-500 border bg-lime-300 h-16 pr-44 mt-10">
          {notSignedInLinks.map((link) => (
            <li key={link.href} className="mx-2 text-lg hover:underline">
              <Link href={link.href}>{link.label}</Link>
            </li>
          ))}
        </ul>
      </nav>
    );
  }
}
