import clientPromise from "@/lib/mongodb";
import { getSessionStatus } from "@/utils/getSessionStatus";
import getWeekRange from "./getWeekOf";

export default async function getWeeklyEarnings() {
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
      .find({
        userId: session.user.userId,
        type: "income",
        // date: {
        //   $gte: new Date(2023, 8, 1).toISOString(),
        //   $lt: new Date(2023, 9, 1).toISOString(),
        // },
        date: {
          $gte: week.range.start,
          $lt: week.range.end,
        },
      })
      .toArray();
    return { transactions };
  } catch {
    throw new Error("Error: Failed to fetch getWeeklyEarnings()");
  }
}
