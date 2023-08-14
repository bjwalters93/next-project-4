import clientPromise from "../../../lib/mongodb";
import { NextResponse } from "next/server";
// import { ObjectId } from "mongodb";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]/route";

interface User {
  firstName: string;
  lastName: string;
  email: string;
  userId: string;
}

interface ServerSession {
  user: User;
}

export async function GET() {
  try {
    const session = (await getServerSession(authOptions)) as ServerSession;
    console.log("session:", session);
    const client = await clientPromise;
    const db = client.db("sample_people");
    const user = await db.collection("people").findOne({
      userId: session.user.userId,
    });
    return NextResponse.json({ user });
  } catch (e) {
    console.error(e);
    return NextResponse.json(e);
  }
}
