import clientPromise from "@/lib/mongodb";
import { getSessionStatus } from "@/utils/getSessionStatus";
// import { getWeekRange } from "./getWeekOf";

type Transaction = {
  type: string;
  source: string;
  amount: string;
  date: string;
  notes: string;
  transactionCode: string;
};

export default async function getTransactionsForWeek(week: {
  range: { start: string; end: string };
}) {
  const { session, isError, message } = await getSessionStatus();
  if (session === null) {
    throw new Error("Session is returning null.");
  }
  const client = await clientPromise;
  const db = client.db("user_data");
  const collection = db.collection("user_transactions");
  const transactions = await collection
    .find<Transaction>({
      userId: session.user.userId,
      $or: [{ type: "income" }, { type: "expense" }],
      date: {
        $gte: new Date(`${week.range.start} 00:00:00`),
        $lte: new Date(`${week.range.end} 00:00:00`),
      },
    })
    .project({
      type: 1,
      source: 1,
      category: 1,
      amount: 1,
      date: 1,
      notes: 1,
      transactionCode: 1,
      _id: 0,
    })
    .sort({ date: -1 })
    .toArray();
  return transactions;
}
