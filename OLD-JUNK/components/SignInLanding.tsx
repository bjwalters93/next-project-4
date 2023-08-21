"use client";

import Image from "next/image";
import googleLogo from "../public/google-logo.png";
import { signIn } from "next-auth/react";

export default function SignInLanding() {
  return (
    <div className="m-auto mt-52 max-w-lg px-4 flex flex-col items-center">
      <h1 className="font-bold text-3xl text-center">Log in</h1>
      <button
        className="text-lg font-semibold border-2 px-10 py-2 flex mt-8 rounded-lg hover:shadow"
        onClick={() => {
          signIn("google");
        }}
      >
        <Image className="mr-2" src={googleLogo} alt="Google Logo" width={30} />
        Continue with Google
      </button>
    </div>
  );
}
