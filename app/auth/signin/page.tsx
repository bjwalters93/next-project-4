"use client";

import { getProviders, signIn } from "next-auth/react";

import { authOptions } from "../../api/auth/[...nextauth]/route";
import Link from "next/link";

export default function SignIn() {
  const providers = getProviders();
  //   console.log(providers);
  return (
    <>
      {Object.values(providers).map((provider) => (
        <div key={provider.name}>
          <button onClick={() => signIn(provider.id)}>
            Sign in with {provider.name}
          </button>
        </div>
      ))}
    </>
  );
}
