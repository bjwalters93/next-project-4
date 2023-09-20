import { getServerSession } from "next-auth/next";
import { authOptions } from "../app/api/auth/[...nextauth]/route";
import { Session } from "next-auth";

export async function getSessionStatus(): Promise<{
  session: null | Session;
  isError: boolean;
  message: string | undefined;
}> {
  try {
    const session = await getServerSession(authOptions);
    if (session == null) {
      return {
        session: null,
        isError: false,
        message: undefined,
      };
    } else {
      return {
        session: session,
        isError: false,
        message: undefined,
      };
    }
  } catch (e: any) {
    return {
      session: null,
      isError: true,
      message: e.mesage,
    };
  }
}
