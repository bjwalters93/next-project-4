import clientPromise from "../../lib/mongodb";
import UserSignOut from "@/components/UserSignOut";
import FormTest from "@/components/FormTest";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../api/auth/[...nextauth]/route";

interface User {
  firstName: string;
  lastName: string;
  email: string;
  userId: string;
}

interface ServerSession {
  user: User;
}

async function getUserData(): Promise<User | null> {
  try {
    const session = (await getServerSession(authOptions)) as ServerSession;
    console.log("session:", session);
    const client = await clientPromise;
    const db = client.db("sample_people");
    const user = await db.collection("people").findOne<User>(
      {
        userId: session.user.userId,
      },
      { projection: { _id: 0 } }
    );
    return user;
  } catch (e) {
    console.error(e);
    throw new Error("Unable to fetch data!");
  }
}

export default async function UserRootPage() {
  const userData = await getUserData();
  console.log("userData:", userData);
  return (
    <div>
      <h1>User Root Page</h1>
      <UserSignOut />
      <FormTest />
      <ul>
        <li>{userData?.firstName}</li>
        <li>{userData?.lastName}</li>
        <li>{userData?.email}</li>
      </ul>
    </div>
  );
}
