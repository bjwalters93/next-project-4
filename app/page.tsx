import { redirect } from "next/navigation";
import SignInLanding from "@/components/SignInLanding";
import { getSessionStatus } from "../utils/getSessionStatus";
import { Suspense } from "react";

export default async function Home() {
  const session = await getSessionStatus();
  if (session) {
    redirect("/user");
  }
  return (
    <div className="">
      <Suspense fallback={<p>Loading feed...</p>}>
        <SignInLanding />
      </Suspense>
    </div>
  );
}
