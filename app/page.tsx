import { redirect } from "next/navigation";
import SignInLanding from "@/components/SignInLanding";
import { getSessionStatus } from "../utils/getSessionStatus";

export default async function Home() {
  const { session, isError, message } = await getSessionStatus();
  if (session) {
    redirect("/user");
  }

  if (isError) {
    throw new Error(message);
  }

  return (
    <div className="">
      <SignInLanding />
    </div>
  );
}
