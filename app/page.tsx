import { redirect } from "next/navigation";
import SignInLanding from "@/components/SignInLanding";
import { getSessionStatus } from "../utils/getSessionStatus";
import clientPromise from "@/lib/mongodb";

export default async function Home() {
  const session = await getSessionStatus();
  if (session) {
    const client = await clientPromise;
    const db = client.db("user_data");
    const user = await db.collection("add_income").findOne({
      userId: session.user.userId,
    });
    if (user === null) {
      console.log("User is new, created new document for the new user.");
      const personData = db.collection("add_income");
      const result = await personData.insertOne({
        userId: session.user.userId,
        addIncome: [],
        addExpense: [],
      });
      console.log("result:", result);
    } else {
      console.log("User already exists. No new document was created");
    }
    redirect("/user");
  }
  return (
    <div className="">
      <SignInLanding />
    </div>
  );
}
