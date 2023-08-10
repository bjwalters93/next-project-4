"use client";

import { signOut } from "next-auth/react";
import { useSession } from "next-auth/react";

export default function UserSignOut() {
  const { data: session } = useSession();
  return (
    <div>
      <p>Signed in as {session?.user?.email}</p>
      <button onClick={() => signOut({ callbackUrl: "http://localhost:3000" })}>
        Sign out
      </button>
    </div>
  );
}
