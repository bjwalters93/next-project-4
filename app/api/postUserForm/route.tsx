import clientPromise from "../../../lib/mongodb";
import { NextResponse } from "next/server";
import { authOptions } from "../auth/[...nextauth]/route";
import { getServerSession } from "next-auth/next";

interface User {
  firstName: string;
  lastName: string;
  email: string;
  userId: string;
}

interface ServerSession {
  user: User;
}

export async function POST(request: Request) {
  try {
    const res = await request.json();
    const session = (await getServerSession(authOptions)) as ServerSession;

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
