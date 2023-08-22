import clientPromise from "../../lib/mongodb";
import AddIncomeFormUI from "@/components/AddIncomeFormUI";
import AddExpenseFormUI from "@/components/AddExpenseFormUI";
import AddCategoryUI from "@/components/AddCategoryUI";
import TotalBalanceDisplay from "@/components/TotalBalanceDisplay";
import TotalExpenseDisplay from "@/components/TotalExpenseDisplay";
import TransactionHistoryUI from "@/components/TransactionHistoryUI";
import WeeklyPieUI from "@/components/WeeklyPieUI";
import MonthlyPieUI from "@/components/MonthlyPieUI";
import YearlyPieUI from "@/components/YearlyPieUI";
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
      <div>
        <TotalBalanceDisplay />
        <TotalExpenseDisplay />
        <TransactionHistoryUI />
      </div>
      <div className="flex">
        <WeeklyPieUI />
        <MonthlyPieUI />
        <YearlyPieUI />
      </div>
      <div className="flex">
        <AddIncomeFormUI />
        <AddExpenseFormUI />
      </div>
    </div>
  );
}
