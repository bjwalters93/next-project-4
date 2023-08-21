import clientPromise from "../../lib/mongodb";
import FormTest from "@/components/FormTest";
import { getSessionStatus } from "@/utils/getSessionStatus";
import { Session } from "next-auth";

type User = {
  firstName: string;
  lastName: string;
  email: string;
  userId: string;
};

async function getUserData(): Promise<User | null> {
  let x;
  try {
    const session = (await getSessionStatus()) as Session;
    const client = await clientPromise;
    const db = client.db("sample_people");
    const user = await db.collection("people").findOne<User>(
      {
        userId: session.user.userId,
      },
      { projection: { _id: 0 } }
    );
    // Code for delaying data - to show loading.tsx
    // --------------------------------------------------------------
    let myPromise = new Promise(function (myResolve) {
      setTimeout(function () {
        myResolve("I love You !!");
      }, 3000);
    });
    let myPromiseResolved = await myPromise;
    console.log(myPromiseResolved);
    // --------------------------------------------------------------
    return user;
  } catch (e) {
    console.error(e);
    throw new Error("Unable to fetch data!");
  }
}

export default async function UserRootPage() {
  const userData = await getUserData();
  return (
    <div>
      <FormTest />
      <ul>
        <li>{userData?.firstName}</li>
        <li>{userData?.lastName}</li>
        <li>{userData?.email}</li>
      </ul>
    </div>
  );
}
