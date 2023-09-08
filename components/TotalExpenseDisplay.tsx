import getWeeklyExpenses from "@/utils/getWeeklyExpenses";
import getMonthlyExpenses from "@/utils/getMonthlyExpenses";
import getYearlyExpenses from "@/utils/getYearlyExpenses";
import getExpenses from "@/utils/getExpenses";

export default async function TotalExpenseDisplay() {
  const weeklyExpensesData = getWeeklyExpenses();
  const monthlyExpensesData = getMonthlyExpenses();
  const yearlyExpensesData = getYearlyExpenses();

  const [weeklyExpenses, monthlyExpenses, yearlyExpenses] = await Promise.all([
    weeklyExpensesData,
    monthlyExpensesData,
    yearlyExpensesData,
  ]);

  const weeklySpending = getExpenses(weeklyExpenses);
  const monthlySpending = getExpenses(monthlyExpenses);
  const yearlySpending = getExpenses(yearlyExpenses);

  return (
    <div className="basis-1/2 border-l-[.5px] border-l-neutral border-y-[.5px] border-y-error">
      <h2 className="font-semibold text-center">Total Expenses this</h2>
      <div className="flex">
        <p className="basis-1/3 text-center bg-base-200">
          week: ${weeklySpending}
        </p>
        <p className="basis-1/3 text-center bg-base-200">
          month: ${monthlySpending}
        </p>
        <p className="basis-1/3 text-center bg-base-200">
          year: ${yearlySpending}
        </p>
      </div>
    </div>
  );
}
