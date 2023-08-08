"use client";

import { signIn } from "next-auth/react";

type Providers = {
  google: {
    id: string;
    name: string;
    type: string;
    signinUrl: string;
    callbackUrl: string;
  };
};

export default function SignInPrompt({ providers }: any) {
  console.log("SignInProviders:", providers);
  return (
    <>
      {Object.values(providers as Providers).map((provider) => (
        <div key={provider.name}>
          <button
            onClick={() =>
              signIn(provider.id, {
                callbackUrl: "http://localhost:3000",
              })
            }
          >
            Sign in with {provider.name}
          </button>
        </div>
      ))}
    </>
  );
}
