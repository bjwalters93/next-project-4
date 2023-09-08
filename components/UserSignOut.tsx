"use client";

import { signOut } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { Passero_One, Blaka, Palette_Mosaic } from "next/font/google";

const passero_one = Passero_One({ weight: "400", subsets: ["latin"] });
const blaka = Blaka({ weight: "400", subsets: ["latin"] });
const palette_mosaic = Palette_Mosaic({ weight: "400", subsets: ["latin"] });

type Props = {
  user: {
    name?: string;
    email?: string;
    image?: string;
  };
  theme: string;
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

export default function UserSignOut({ user, theme }: Props) {
  const [currentTheme, setCurrentTheme] = useState<string>(theme);
  const router = useRouter();

  useEffect(() => {
    console.log("theme:", theme);
    setCurrentTheme(theme);
  }, [theme]);

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
    <div className="navbar bg-base-300 fixed z-40 border-b-[1px] border-neutral">
      <div className="flex-1">
        <a
          className={`btn btn-ghost normal-case text-xl ${passero_one.className}`}
        >
          <svg
            // className="fill-primary"
            fill="currentColor"
            width="20"
            height="20"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
          >
            <path
              clip-rule="evenodd"
              fill-rule="evenodd"
              d="M1 4a1 1 0 011-1h16a1 1 0 011 1v8a1 1 0 01-1 1H2a1 1 0 01-1-1V4zm12 4a3 3 0 11-6 0 3 3 0 016 0zM4 9a1 1 0 100-2 1 1 0 000 2zm13-1a1 1 0 11-2 0 1 1 0 012 0zM1.75 14.5a.75.75 0 000 1.5c4.417 0 8.693.603 12.749 1.73 1.111.309 2.251-.512 2.251-1.696v-.784a.75.75 0 00-1.5 0v.784a.272.272 0 01-.35.25A49.043 49.043 0 001.75 14.5z"
            ></path>
          </svg>
          Budget Pirate
        </a>
      </div>
      <div className="flex-none">
        <div className="dropdown dropdown-end">
          <label tabIndex={0} className="btn btn-ghost m-1 normal-case">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="icon icon-tabler icon-tabler-brush"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              stroke-width="2"
              stroke="currentColor"
              fill="none"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
              <path d="M3 21v-4a4 4 0 1 1 4 4h-4"></path>
              <path d="M21 3a16 16 0 0 0 -12.8 10.2"></path>
              <path d="M21 3a16 16 0 0 1 -10.2 12.8"></path>
              <path d="M10.6 9a9 9 0 0 1 4.4 4.4"></path>
            </svg>
            Theme
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="icon icon-tabler icon-tabler-chevron-down"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              stroke-width="2"
              stroke="currentColor"
              fill="none"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
              <path d="M6 9l6 6l6 -6"></path>
            </svg>
          </label>
          <ul
            tabIndex={0}
            className="dropdown-content z-[1] menu flex-nowrap p-2 shadow bg-base-100 rounded-box w-52 max-h-96 overflow-y-scroll border-[1px] border-r-0 border-neutral"
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
              className="btn btn-xs btn-primary btn-outline btn-link"
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
