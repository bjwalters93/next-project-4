import clientPromise from "@/lib/mongodb";
import { getSessionStatus } from "@/utils/getSessionStatus";
import { getWeekRange } from "./getWeekOf";

type Transaction = {
  type: string;
  category: string;
  amount: string;
  date: string;
  notes: string;
  transactionCode: string;
};

export default async function getWeeklyExpenses() {
  const session = await getSessionStatus();
  if (session === null) {
    throw new Error("Session is returning null.");
  }
  const week = getWeekRange();
  const client = await clientPromise;
  const db = client.db("user_data");
  const collection = db.collection("user_transactions");
  const transactions = await collection
    .find<Transaction>({
      userId: session.user.userId,
      type: "expense",
      date: {
        $gte: new Date(week.range.start),
        $lte: new Date(week.range.end),
      },
    })
    .project({
      type: 1,
      source: 1,
      amount: 1,
      date: 1,
      notes: 1,
      transactionCode: 1,
      _id: 0,
    })
    .sort({ date: -1 })
    .toArray();
  throw new Error("testing@");
  return transactions;
}
