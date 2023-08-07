"use client";

import Link from "next/link";
import { signIn, signOut, useSession } from "next-auth/react";

export default function NavigationBar() {
  // const { data: session, status } = useSession();
  const session = useSession();
  console.log("session:", session);
  return (
    <nav>
      {!session.data && (
        <Link
          href="/api/auth/signin"
          // onClick={() => signIn("google")}
        >
          Sign In
        </Link>
      )}
      {session.data?.user && (
        <Link href="/api/auth/signout" onClick={() => signOut()}>
          Sign Out
        </Link>
      )}
    </nav>
  );
}
