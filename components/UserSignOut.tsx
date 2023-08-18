"use client";

import { signOut } from "next-auth/react";
import Image from "next/image";
// import googleLogo from "../public/google-logo.png";

type User = {
  user: {
    name?: string;
    email?: string;
    image?: string;
  };
};

export default async function UserSignOut({ user }: User) {
  if (typeof user.image !== "string") {
    throw new Error(
      "Image src attribute is not equal to string --> user image display in UserSignOutComponent "
    );
  }
  let myPromise = new Promise(function (myResolve) {
    setTimeout(function () {
      myResolve("I love You !!");
    }, 10000);
  });
  let myPromiseResolved = await myPromise;
  console.log(myPromiseResolved);
  return (
    <div className="bg-zinc-950 flex justify-between py-2 px-4">
      <div className="flex items-center">
        <Image
          //   src={session ? url : googleLogo}
          src={user.image}
          alt="Picture of the signed in user."
          width={40}
          height={40}
          blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+K9XDwAD4gGu3HCNbQAAAABJRU5ErkJggg==" // automatically provided
          placeholder="blur" // Optional blur-up while loading
          className="mr-1 rounded-full border border-white"
        />
        <p className="text-white font-medium">Signed in as {user.email}</p>
      </div>

      <button
        className="focus:outline-none text-white hover:text-lime-400 font-medium"
        onClick={() => signOut({ callbackUrl: "http://localhost:3000" })}
      >
        Sign out
      </button>
    </div>
  );
}
