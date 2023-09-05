import AddIncomeFormUI from "@/components/AddIncomeFormUI";
import AddExpenseFormUI from "@/components/AddExpenseFormUI";
import TotalIncomeDisplay from "@/components/TotalIncomeDisplay";
import TotalExpenseDisplay from "@/components/TotalExpenseDisplay";
import TransactionHistoryUI from "@/components/TransactionHistoryUI";
import WeeklyPieUI from "@/components/WeeklyPieUI";
import MonthlyPieUI from "@/components/MonthlyPieUI";
import YearlyPieUI from "@/components/YearlyPieUI";
import delayLoading from "@/utils/delayLoading";

export const dynamic = "force-dynamic";

export default async function UserRootPage() {
  await delayLoading(3000);
  return (
    <div>
      <div>
        <TotalIncomeDisplay />
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
