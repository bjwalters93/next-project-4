import clientPromise from "@/lib/mongodb";
import { NextResponse } from "next/server";
import { getSessionStatus } from "@/utils/getSessionStatus";
import { v4 as uuidv4 } from "uuid";

export async function POST(request: Request) {
  try {
    const res = await request.json();
    const session = await getSessionStatus();
    if (session === null) {
      throw new Error("Route Handler /addIncome: Session is returning null.");
    }
    const client = await clientPromise;
    const db = client.db("user_data");
    const collection = db.collection("user_transactions");
    const doc = {
      userId: session.user.userId,
      type: "income",
      source: res.source,
      amount: res.amount,
      date: new Date(res.date),
      notes: res.notes,
      transactionCode: uuidv4(),
    };
    const result = await collection.insertOne(doc);
    console.log(`A document was inserted with the _id: ${result.insertedId}`);
    return NextResponse.json({ res });
  } catch (e) {
    console.log(e);
    return NextResponse.json(e);
  }
}

// import clientPromise from "@/lib/mongodb";
// import { NextResponse } from "next/server";
// import { getSessionStatus } from "@/utils/getSessionStatus";
// import { v4 as uuidv4 } from "uuid";

// export async function POST(request: Request) {
//   try {
//     const res = await request.json();
//     const session = await getSessionStatus();
//     if (session === null) {
//       throw new Error("Route Handler /addIncome: Session is returning null.");
//     }
//     const client = await clientPromise;
//     const db = client.db("user_data");
//     const personData = db.collection("user_transactions");
//     const result = await personData.updateOne(
//       { userId: session.user.userId },
//       {
//         $push: {
//           addIncome: {
//             source: res.source,
//             amount: res.amount,
//             date: res.date,
//             notes: res.notes,
//             transactionCode: uuidv4(),
//           },
//         },
//       }
//     );
//     console.log(
//       `${result.matchedCount} document(s) matched the filter, updated ${result.modifiedCount} document(s)`
//     );
//     return NextResponse.json({ res });
//   } catch (e) {
//     console.log(e);
//     return NextResponse.json(e);
//   }
// }
