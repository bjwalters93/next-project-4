"use client";

import { signIn } from "next-auth/react";

export default function SignInLanding() {
  return (
    <div className="m-auto mt-20 bg-slate-500 max-w-lg px-4">
      <h1>Welcome to BP4!</h1>
      <button
        className="text-2xl font-semibold"
        onClick={() => {
          signIn("google");
        }}
      >
        Sign in with Google
      </button>
    </div>
  );
}
