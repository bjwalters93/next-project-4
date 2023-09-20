import clientPromise from "@/lib/mongodb";
import { getSessionStatus } from "@/utils/getSessionStatus";

type Transaction = {
  type: string;
  source: string;
  amount: string;
  date: string;
  notes: string;
  transactionCode: string;
};

export default async function getYearlyIncome() {
  const { session, isError, message } = await getSessionStatus();
  if (session === null) {
    throw new Error("Session is returning null.");
  }
  const client = await clientPromise;
  const db = client.db("user_data");
  const collection = db.collection("user_transactions");
  const year = new Date().getFullYear();
  const transactions = await collection
    .find<Transaction>({
      userId: session.user.userId,
      type: "income",
      $expr: { $eq: [{ $year: "$date" }, year] },
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
  return transactions;
}
