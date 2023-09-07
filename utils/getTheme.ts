import clientPromise from "@/lib/mongodb";
import { getSessionStatus } from "@/utils/getSessionStatus";

export default async function getTheme() {
  try {
    const session = await getSessionStatus();
    if (session === null) {
      throw new Error("Session is returning null.");
    }
    const client = await clientPromise;
    const db = client.db("user_data");
    const userTheme = await db
      .collection<{ theme: string }>("user_themes")
      .findOne({
        userId: session.user.userId,
      });
    return userTheme;
  } catch (e) {
    console.log(e);
    throw new Error("Error: Failed to fetch getTheme()");
  }
}
