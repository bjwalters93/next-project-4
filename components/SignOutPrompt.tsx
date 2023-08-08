"use client";

import { signOut } from "next-auth/react";

export default function SignOutPrompt() {
  return (
    <button onClick={() => signOut({ callbackUrl: "http://localhost:3000" })}>
      Sign out
    </button>
  );
}
