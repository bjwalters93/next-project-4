"use client";

import { signOut } from "next-auth/react";
import Image from "next/image";
// import googleLogo from "../public/google-logo.png";
import modeIcon from "../public/modeIcon.png";
import expandIcon from "../public/expandIcon.png";

type User = {
  user: {
    name?: string;
    email?: string;
    image?: string;
  };
};

export default function UserSignOut({ user }: User) {
  if (typeof user.image !== "string") {
    throw new Error(
      "Image src attribute is not equal to string --> user image display in UserSignOutComponent "
    );
  }
  return (
    <div className="navbar bg-base-100">
      <div className="flex-1">
        <a className="btn btn-ghost normal-case text-xl">BudgetPirate</a>
      </div>
      <div className="flex-none">
        <div className="dropdown dropdown-end">
          <label tabIndex={0} className="btn btn-ghost m-1 normal-case">
            <Image src={modeIcon} alt="mode icon" width={25} height={25} />
            Theme
            <Image src={expandIcon} alt="mode icon" width={15} height={15} />
          </label>
          <ul
            tabIndex={0}
            className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52"
          >
            <li>
              <a>Item 1</a>
            </li>
            <li>
              <a>Item 2</a>
            </li>
          </ul>
        </div>
        <div className="dropdown dropdown-end">
          <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
            <div className="w-10 rounded-full">
              <Image
                //   src={session ? url : googleLogo}
                src={user.image}
                alt="Picture of the signed in user."
                width={40}
                height={40}
                blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+K9XDwAD4gGu3HCNbQAAAABJRU5ErkJggg==" // automatically provided
                placeholder="blur" // Optional blur-up while loading
                className="rounded-full"
              />
            </div>
          </label>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
          >
            <li>{user.email}</li>
            <li
              className="btn btn-xs btn-link"
              onClick={() => signOut({ callbackUrl: "http://localhost:3000" })}
            >
              Logout
            </li>
          </ul>
        </div>
      </div>
    </div>
    // <div className="flex justify-between py-2 px-4">
    //   <div className="flex items-center">
    //     <Image
    //       //   src={session ? url : googleLogo}
    //       src={user.image}
    //       alt="Picture of the signed in user."
    //       width={40}
    //       height={40}
    //       blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+K9XDwAD4gGu3HCNbQAAAABJRU5ErkJggg==" // automatically provided
    //       placeholder="blur" // Optional blur-up while loading
    //       className="mr-1 rounded-full border border-white"
    //     />
    //     <p className="font-medium">Signed in as {user.email}</p>
    //   </div>

    //   <button
    //     className="focus:outline-none text-white hover:text-lime-400 font-medium"
    //     onClick={() => signOut({ callbackUrl: "http://localhost:3000" })}
    //   >
    //     Sign out
    //   </button>
    // </div>
  );
}
