"use client";

import { UserButton } from "@clerk/nextjs";
import Link from "next/link";
import { useUser } from "@clerk/nextjs";

const links = [
  { href: "/", label: "Home" },
  { href: "/online-order-refund", label: "Online order in-store refund" },
  { href: "/server-form", label: "Server Form" },
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
        <ul className="flex items-center justify-end border-blue-500 border bg-blue-300 h-16">
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
      <nav>
        <ul className="flex items-center">
          {notSignedInLinks.map((link) => (
            <li key={link.href}>
              <Link href={link.href}>{link.label}</Link>
            </li>
          ))}
        </ul>
      </nav>
    );
  }
}
