"use client";

import { signOut } from "next-auth/react";
import Image from "next/image";
import modeIcon from "../public/modeIcon.png";
import expandIcon from "../public/expandIcon.png";
import { useRouter } from "next/navigation";

type User = {
  user: {
    name?: string;
    email?: string;
    image?: string;
  };
};

function setTheme(theme: string) {
  return fetch(`http://localhost:3000/api/updateTheme?theme=${theme}`);
}

const themesArr = [
  "light",
  "dark",
  "cupcake",
  "bumblebee",
  "emerald",
  "corporate",
  "synthwave",
  "retro",
  "cyberpunk",
  "valentine",
  "halloween",
  "garden",
  "forest",
  "aqua",
  "lofi",
  "pastel",
  "fantasy",
  "wireframe",
  "black",
  "luxury",
  "dracula",
  "cmyk",
  "autumn",
  "business",
  "acid",
  "lemonade",
  "night",
  "coffee",
  "winter",
];

export default function UserSignOut({ user }: User) {
  const router = useRouter();

  if (typeof user.image !== "string") {
    throw new Error(
      "Image src attribute is not equal to string --> user image display in UserSignOutComponent "
    );
  }

  const themeButtons = themesArr.map((el, i) => {
    return (
      <li
        key={i}
        className="btn btn-ghost normal-case"
        onClick={async () => {
          await setTheme(el);
          router.refresh();
        }}
      >
        {el.charAt(0).toUpperCase() + el.slice(1)}
      </li>
    );
  });

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
            className="dropdown-content z-[1] menu flex-nowrap p-2 shadow bg-base-100 rounded-box w-52 max-h-96 overflow-y-scroll"
          >
            {themeButtons}
          </ul>
        </div>
        <div className="dropdown dropdown-end">
          <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
            <div className="w-10 rounded-full">
              <Image
                src={user.image}
                alt="Picture of the signed in user."
                width={40}
                height={40}
                blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+K9XDwAD4gGu3HCNbQAAAABJRU5ErkJggg==" // automatically provided
                placeholder="blur"
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
  );
}
