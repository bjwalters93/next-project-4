import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Providers from "./Providers";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Next - Project #4",
  description: "Brian Walters, Troy, OH. 4th major web application project.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" style={{ backgroundColor: "red" }}>
      <body
        className={inter.className}
        data-theme="corporate"
        // data-theme="aqua"
      >
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
