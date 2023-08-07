"use client";

import Link from "next/link";
import { signIn } from "next-auth/react";

export default function NavigationBar() {
  return (
    <nav>
      <Link href="/api/auth/signin" onClick={() => signIn("google")}>
        Sign In
      </Link>
    </nav>
  );
}
