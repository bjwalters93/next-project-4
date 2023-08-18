import { getServerSession } from "next-auth/next";
import { authOptions } from "../app/api/auth/[...nextauth]/route";
import { Session } from "next-auth";

export async function getSessionStatus(): Promise<Session | null> {
  const session = await getServerSession(authOptions);
  if (session == null) {
    return null;
  } else {
    return session;
  }
}
