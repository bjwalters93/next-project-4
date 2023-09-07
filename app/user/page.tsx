import TotalIncomeDisplay from "@/components/TotalIncomeDisplay";
import TotalExpenseDisplay from "@/components/TotalExpenseDisplay";
// import WeeklyPieUI from "@/components/WeeklyPieUI";
// import MonthlyPieUI from "@/components/MonthlyPieUI";
// import YearlyPieUI from "@/components/YearlyPieUI";
import delayLoading from "@/utils/delayLoading";
import ClientParent from "@/components/ClientParent";

export const dynamic = "force-dynamic";

export default async function UserRootPage() {
  await delayLoading(2000);
  return (
    <div>
      <div>
        <TotalIncomeDisplay />
        <TotalExpenseDisplay />
      </div>
      <ClientParent />
      {/* <div className="flex">
        <WeeklyPieUI />
        <MonthlyPieUI />
        <YearlyPieUI />
      </div> */}
    </div>
  );
}
