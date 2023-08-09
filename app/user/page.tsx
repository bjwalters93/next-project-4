"use client";

import { signOut } from "next-auth/react";
import { useSession } from "next-auth/react";

export default function UserRootPage() {
  const { data: session, status } = useSession();
  return (
    <div>
      <h1>User Root Page</h1>
      <p>Signed in as {session?.user?.email}</p>
      <button onClick={() => signOut({ callbackUrl: "http://localhost:3000" })}>
        Sign out
      </button>
    </div>
  );
}
