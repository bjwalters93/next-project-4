import clientPromise from "@/lib/mongodb";
import { getSessionStatus } from "@/utils/getSessionStatus";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const transactionCode = searchParams.get("code");
  const session = await getSessionStatus();
  if (session === null) {
    throw new Error("Session is returning null.");
  }
  const client = await clientPromise;
  const db = client.db("user_data");
  const collection = db.collection("user_transactions");
  const query = {
    userId: session.user.userId,
    transactionCode: transactionCode,
  };
  const result = await collection.deleteOne(query);
  if (result.deletedCount === 1) {
    console.log("Successfully deleted one document.");
    return NextResponse.json("Successfully deleted one document.");
  } else {
    console.log("No documents matched the query. Deleted 0 documents.");
    return NextResponse.json(
      "No documents matched the query. Deleted 0 documents."
    );
  }
}
