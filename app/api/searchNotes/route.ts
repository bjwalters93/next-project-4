import { NextResponse } from "next/server";
import { getSessionStatus } from "@/utils/getSessionStatus";
import clientPromise from "@/lib/mongodb";

export async function POST(request: Request) {
  try {
    const res = await request.json();
    const { session, isError, message } = await getSessionStatus();
    if (isError) {
      throw new Error(message);
    }
    const client = await clientPromise;
    const coll = client.db("user_data").collection("user_transactions");
    const agg = [
      {
        $search: {
          index: "notes",
          compound: {
            filter: [
              {
                text: {
                  query: `${session?.user.userId}`,
                  path: "userId",
                },
              },
            ],
            must: [
              {
                text: {
                  query: `${res.search}`,
                  path: "notes",
                  fuzzy: {},
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
        _id: 0,
      })
      .toArray();
    return NextResponse.json({
      results: cursor,
      isError: false,
      message: undefined,
    });
  } catch (e: any) {
    return NextResponse.json({
      results: null,
      isError: true,
      message: e.message,
    });
  }
}
