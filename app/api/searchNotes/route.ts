import { NextResponse } from "next/server";
import { getSessionStatus } from "@/utils/getSessionStatus";
import clientPromise from "@/lib/mongodb";

export async function POST(request: Request) {
  try {
    const res = await request.json();
    const { session, isError, message } = await getSessionStatus();
    const client = await clientPromise;
    const coll = client.db("user_data").collection("user_transactions");
    const agg = [
      {
        $search: {
          index: "notes",
          compound: {
            should: [
              {
                text: {
                  // userId: session?.user.userId,
                  query: `${res.search}`,
                  path: "notes",
                  fuzzy: {},
                },
              },
              {
                equals: {
                  value: session?.user.userId,
                  path: "userId",
                },
              },
            ],
          },
        },
      },
    ];
    let cursor = await coll
      .aggregate(agg)
      .project({
        type: 1,
        source: 1,
        category: 1,
        amount: 1,
        date: 1,
        notes: 1,
        transactionCode: 1,
        // TURN OFF USER ID WHEN FINISHED, JUST USING TO CHECK IF SEARCH IS WORKING PROPERLY
        userId: 1,
        // ------------------------------------------------------------------------------
        _id: 0,
      })
      .toArray();
    console.log("cursor ->", cursor);
    return NextResponse.json(cursor);
  } catch (e) {}
}
