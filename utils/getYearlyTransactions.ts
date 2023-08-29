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

export default async function getYearlyTransactions() {
  try {
    const session = await getSessionStatus();
    if (session === null) {
      throw new Error("Session is returning null.");
    }
    const client = await clientPromise;
    const db = client.db("user_data");
    const collection = db.collection("user_transactions");
    const year = new Date().getFullYear();
    console.log("year:", year);
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
      .toArray();
    return transactions;
  } catch (e) {
    console.log(e);
    throw new Error("Error: Failed to fetch getYearlyTransactions()");
  }
}
