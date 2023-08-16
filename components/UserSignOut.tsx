"use client";

import { signOut } from "next-auth/react";
import { useSession } from "next-auth/react";
import Image from "next/image";
import googleLogo from "../public/google-logo.png";

export default function UserSignOut() {
  const { data: session } = useSession();
  const url = session?.user.image as string;
  console.log("session:", session);
  return (
    <div className="bg-zinc-950 flex justify-between py-2 px-4">
      <div className="flex items-center">
        <Image
          src={session ? url : googleLogo}
          alt="Picture of the author"
          width={40}
          height={40}
          //   blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+K9XDwAD4gGu3HCNbQAAAABJRU5ErkJggg==" // automatically provided
          //   placeholder="blur" // Optional blur-up while loading
          className="mr-1 rounded-full border border-white"
        />
        <p className="text-white font-medium">
          Signed in as {session?.user?.email}
        </p>
      </div>

      <button
        className="focus:border text-white hover:text-lime-400 font-medium"
        onClick={() => signOut({ callbackUrl: "http://localhost:3000" })}
      >
        Sign out
      </button>
    </div>
  );
}
