import { getServerSession } from "next-auth/next";
import { authOptions } from "../app/api/auth/[...nextauth]/route";

type UserSessionInfo = {
  user: {
    name: string;
    email: string;
    image: string;
    userId: string;
  };
};

export async function getSessionStatus() {
  const session = (await getServerSession(authOptions)) as UserSessionInfo;
  return session;
}
