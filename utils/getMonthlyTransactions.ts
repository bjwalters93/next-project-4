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

export default async function getMonthlyTransactions() {
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
    // const month = new Date().getMonth().toISOString() + 1;
    // console.log("month:", month);
    // const transactions = await collection
    //   .find<Transaction>({
    //     userId: session.user.userId,
    //     type: "income",
    //     date: { $expr: { $eq: [{ $month: "$date" }, 1] } },
    //   })
    //   .toArray();
    const transactions = await collection
      .find<Transaction>({
        $expr: { $eq: [{ $month: "$date" }, 8] },
      })
      .toArray();
    return transactions;
  } catch (e) {
    console.log(e);
    throw new Error("Error: Failed to fetch getMonthlyEarnings()");
  }
}
