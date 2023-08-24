import clientPromise from "@/lib/mongodb";
import { getSessionStatus } from "@/utils/getSessionStatus";

export default async function getAllEarnings() {
  try {
    const session = await getSessionStatus();
    if (session === null) {
      throw new Error("Session is returning null.");
    }
    const client = await clientPromise;
    const db = client.db("user_data");
    const collection = db.collection("user_transactions");
    const transactions = await collection
      .find({
        userId: session.user.userId,
        type: "income",
      })
      .toArray();
    return { transactions };
  } catch {
    throw new Error("Error: Failed to fetch getAllEarnings()");
  }
}
