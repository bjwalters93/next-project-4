import clientPromise from "@/lib/mongodb";
import { getSessionStatus } from "@/utils/getSessionStatus";
import getWeekRange from "./getWeekOf";

type Transaction = {
  _id: string;
  userId: string;
  type: string;
  source: string;
  amount: string;
  date: string;
  notes: string;
  transactionCode: string;
};

export default async function getWeeklyTransactions() {
  try {
    const session = await getSessionStatus();
    if (session === null) {
      throw new Error("Session is returning null.");
    }
    const week = getWeekRange();
    console.log("week:", week);
    const client = await clientPromise;
    const db = client.db("user_data");
    const collection = db.collection("user_transactions");
    const transactions = await collection
      .find<Transaction>({
        userId: session.user.userId,
        type: "income",
        date: {
          $gte: week.range.start,
          $lte: week.range.end,
        },
      })
      .toArray();
    return transactions;
  } catch {
    throw new Error("Error: Failed to fetch getWeeklyEarnings()");
  }
}
