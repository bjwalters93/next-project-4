import clientPromise from "@/lib/mongodb";
import { getSessionStatus } from "@/utils/getSessionStatus";

export default async function getTheme() {
  try {
    const { session, isError, message } = await getSessionStatus();
    if (isError) {
      throw new Error(message);
    }
    const client = await clientPromise;
    const db = client.db("user_data");
    const userTheme = await db
      .collection<{ theme: string }>("user_themes")
      .findOne({
        userId: session?.user.userId,
      });
    return {
      userTheme: userTheme,
      isError: false,
      message: undefined,
    };
  } catch (e: any) {
    return {
      userTheme: null,
      isError: true,
      message: e.message,
    };
  }
}
