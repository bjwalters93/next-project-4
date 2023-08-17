import clientPromise from "../../../lib/mongodb";
import { NextResponse } from "next/server";
import { getSessionStatus } from "@/utils/getSessionStatus";

interface User {
  firstName: string;
  lastName: string;
  email: string;
  userId: string;
}

export async function POST(request: Request) {
  try {
    const res = await request.json();
    const session = await getSessionStatus();

    const client = await clientPromise;
    const db = client.db("sample_people");
    const personData = db.collection<User>("people");
    const result = await personData.updateOne(
      { userId: session.user.userId },
      {
        $set: {
          firstName: res.first,
          lastName: res.last,
          email: res.email,
          userId: session.user.userId,
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
