import clientPromise from "@/lib/mongodb";
import { NextResponse } from "next/server";
import { getSessionStatus } from "@/utils/getSessionStatus";

type Theme = {
  theme: string;
  userId: string;
};

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const theme = searchParams.get("theme") as string;
  const { session, isError, message } = await getSessionStatus();
  if (session === null) {
    throw new Error("Session is returning null.");
  }
  const client = await clientPromise;
  const db = client.db("user_data");
  const col = db.collection<Theme>("user_themes");
  const result = await col.updateOne(
    { userId: session.user.userId },
    {
      $set: {
        theme: theme,
        userId: session.user.userId,
      },
    },
    { upsert: true }
  );
  console.log(
    `${result.matchedCount} document(s) matched the filter, updated ${result.modifiedCount} document(s)`
  );
  return NextResponse.json(
    `${result.matchedCount} document(s) matched the filter, updated ${result.modifiedCount} document(s)`
  );
}
