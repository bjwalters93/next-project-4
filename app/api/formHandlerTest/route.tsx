import clientPromise from "../../../lib/mongodb";
import { NextResponse } from "next/server";
// import { ObjectId } from "mongodb";
import { authOptions } from "../auth/[...nextauth]/route";
import { getServerSession } from "next-auth/next";

interface Person {
  firstName: string;
  lastName: string;
  email: string;
  userId: string;
}

interface ServerSession {
  user: Person;
}

export async function POST(request: Request) {
  console.log();
  try {
    const res = await request.json();
    const session = (await getServerSession(authOptions)) as ServerSession;
    console.log("session:", session);

    const client = await clientPromise;
    const db = client.db("sample_people");
    const personData = db.collection<Person>("people");
    const result = await personData.insertOne({
      firstName: res.first,
      lastName: res.last,
      email: res.email,
      userId: session.user.userId,
    });
    console.log(`A document was inserted with the _id: ${result.insertedId}`);
    return NextResponse.json({ res });
  } catch (e) {
    console.log(e);
    return NextResponse.json(e);
  }
}
