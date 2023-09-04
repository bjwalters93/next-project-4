import clientPromise from "@/lib/mongodb";
import { NextResponse } from "next/server";
import { getSessionStatus } from "@/utils/getSessionStatus";
import { v4 as uuidv4 } from "uuid";

export async function POST(request: Request) {
  try {
    const res = await request.json();
    const session = await getSessionStatus();
    if (session === null) {
      throw new Error("Route Handler /addExpense: Session is returning null.");
    }
    const client = await clientPromise;
    const db = client.db("user_data");
    const collection = db.collection("user_transactions");
    const doc = {
      userId: session.user.userId,
      type: "expense",
      category: res.category,
      amount: res.amount,
      date: new Date(`${res.date} 00:00:00`),
      notes: res.notes,
      transactionCode: uuidv4(),
    };
    const result = await collection.insertOne(doc);
    return NextResponse.json(
      `A document was inserted with the _id: ${result.insertedId}`
    );
  } catch (e) {
    console.log(e);
    return NextResponse.json(e);
  }
}
