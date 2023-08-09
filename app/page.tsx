import { redirect } from "next/navigation";
import { getServerSession } from "next-auth/next";
import { authOptions } from "./api/auth/[...nextauth]/route";
import SignInLanding from "@/components/SignInLanding";

async function getSessionStatus() {
  const session = await getServerSession(authOptions);
  return session;
}

export default async function Home() {
  const session = await getSessionStatus();
  if (session) {
    redirect("/user");
  }
  return (
    <div className="">
      <SignInLanding />
    </div>
  );
}
