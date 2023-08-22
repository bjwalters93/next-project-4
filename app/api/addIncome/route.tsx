import clientPromise from "@/lib/mongodb";
import { NextResponse } from "next/server";
import { getSessionStatus } from "@/utils/getSessionStatus";

type AddIncome = {
  userId: string;
  source: string;
  amount: string;
  date: string;
  notes: string;
};

export async function POST(request: Request) {
  try {
    const res = await request.json();
    const session = await getSessionStatus();
    if (session === null) {
      throw new Error("Route Handler /addIncome: Session is returning null.");
    }
    const client = await clientPromise;
    const db = client.db("user_data");
    const personData = db.collection<AddIncome>("add_income");
    const result = await personData.updateOne(
      { userId: session.user.userId },
      {
        $set: {
          userId: session.user.userId,
          addIncome: [
            {
              source: res.source,
              amount: res.amount,
              date: res.date,
              notes: res.notes,
            },
          ],
        },
      },
      { upsert: true }
    );
    console.log(
      `${result.matchedCount} document(s) matched the filter, updated ${result.modifiedCount} document(s)`
    );
    return NextResponse.json({ res });
  } catch (e) {
    console.log(e);
    return NextResponse.json(e);
  }
}
