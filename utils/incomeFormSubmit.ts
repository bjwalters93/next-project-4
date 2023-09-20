"use server";

import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { getSessionStatus } from "@/utils/getSessionStatus";
import clientPromise from "@/lib/mongodb";
import { v4 as uuidv4 } from "uuid";

// Start here ---> https://nextjs.org/docs/app/building-your-application/data-fetching/forms-and-mutations
// explains server actions.

export default async function incomeFormSubmit(formData: FormData) {
  const data = {
    source: formData.get("source"),
    amount: formData.get("amount"),
    date: formData.get("date"),
    notes: formData.get("notes"),
  };
  console.log("SAData:", data);
  const { session, isError, message } = await getSessionStatus();
  if (session === null) {
    throw new Error("Route Handler /addIncome: Session is returning null.");
  }
  const client = await clientPromise;
  const db = client.db("user_data");
  const collection = db.collection("user_transactions");
  const doc = {
    userId: session.user.userId,
    type: "income",
    source: data.source,
    amount: data.amount,
    date: new Date(`${data.date} 00:00:00`),
    notes: data.notes,
    transactionCode: uuidv4(),
  };
  const result = await collection.insertOne(doc);
  console.log(`A document was inserted with the _id: ${result.insertedId}`);
  revalidatePath("/user");
}
