import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Providers from "./Providers";
import NavigationBar from "@/components/NavigationBar";

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
    <html lang="en">
      <body className={inter.className}>
        <Providers>
          <div>
            <h1>Root Layout</h1>
            <NavigationBar />
          </div>
          {children}
        </Providers>
      </body>
    </html>
  );
}
