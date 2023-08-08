import { getProviders } from "next-auth/react";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../../api/auth/[...nextauth]/route";
import SignInPrompt from "@/components/SignInPrompt";
import { redirect } from "next/navigation";

async function getData() {
  const session = await getServerSession(authOptions);
  if (session) {
    redirect("/");
  }

  const providers = await getProviders();

  return { providers: providers ?? [] };
}

export default async function SignIn() {
  const { providers } = await getData();
  console.log(providers);
  return (
    <div>
      <SignInPrompt providers={providers} />
    </div>
  );
}
