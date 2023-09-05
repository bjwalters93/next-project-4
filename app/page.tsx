import { redirect } from "next/navigation";
import SignInLanding from "@/components/SignInLanding";
import { getSessionStatus } from "../utils/getSessionStatus";
import clientPromise from "@/lib/mongodb";

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
