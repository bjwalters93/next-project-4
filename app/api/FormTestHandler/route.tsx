// import type { NextApiRequest, NextApiResponse } from "next";

// type ResponseData = {
//   data: string;
// };

// export default function handler(
//   req: NextApiRequest,
//   res: NextApiResponse<ResponseData>
// ) {
//   const body = req.body;
//   console.log("body: ", body);

//   // Both of these are required.
//   if (!body.first || !body.last) {
//     return res.json({ data: "First or last name not found" });
//   }

//   // Found the name.
//   res.json({ data: `${body.first} ${body.last}` });
// }

import { ObjectId } from "mongodb";
import clientPromise from "../../../lib/mongodb";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db("sample_people");
    const person = await db
      .collection("people")
      .findOne({ firstName: "Brian" });
    //   .sort({ metacritic: -1 })
    //   .limit(10)
    //   .toArray();
    // res.json(movies);
    return NextResponse.json({ person });
  } catch (e) {
    console.error(e);
  }
  //   try {
  //     const client = await clientPromise;
  //     const db = client.db("sample_people");
  //     const res = db.collection("people").find({ firstName: "Brian" });
  //     const data = res;
  //     return NextResponse.json({ data });
  //   } catch (e) {
  //     console.error(e);
  //   }
}

// export default async (req, res) => {
// try {
//   const client = await clientPromise;
//   const db = client.db("sample_mflix");

//   const movies = await db
//     .collection("movies")
//     .find({})
//     .sort({ metacritic: -1 })
//     .limit(10)
//     .toArray();

//   res.json(movies);
// } catch (e) {
//   console.error(e);
// }
// };
