import clientPromise from "../../../lib/mongodb";
import { NextResponse } from "next/server";
import { ObjectId } from "mongodb";

export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db("sample_people");
    const person = await db.collection("people").findOne({
      _id: new ObjectId("64c922cafa6d74444af140d6"),
    });
    return NextResponse.json({ person });
  } catch (e) {
    console.error(e);
    return NextResponse.json(e);
  }
}
