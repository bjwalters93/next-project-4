"use client";

import Link from "next/link";
import { signIn, signOut, useSession } from "next-auth/react";

export default function NavigationBar() {
  const { data: session, status } = useSession();
  return (
    <nav>
      {!session && <Link href="/api/auth/signin">Sign In</Link>}
      {session?.user && <Link href="/api/auth/signout">Sign Out</Link>}
    </nav>
  );
}
