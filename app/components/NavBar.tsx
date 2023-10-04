"use client";

import { UserButton } from "@clerk/nextjs";
import Link from "next/link";
import { useUser } from "@clerk/nextjs";

const links = [
  { href: "/", label: "Home" },
  { href: "/online-order-refund", label: "Online order in-store refund" },
  { href: "/server-form", label: "Server Form" },
  { href: "/sign-in", label: "Sign in" },
  { href: "/sign-up", label: "Sign up" },
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
      <nav>
        <ul className="flex items-center">
          {links.map((link) => (
            <li key={link.href}>
              <Link href={link.href}>{link.label}</Link>
            </li>
          ))}
          <li>
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
          <li>
            <UserButton afterSignOutUrl="/" />
          </li>
        </ul>
      </nav>
    );
  }
}
