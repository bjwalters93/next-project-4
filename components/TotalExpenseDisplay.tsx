import getWeeklyExpenses from "@/utils/getWeeklyExpenses";
import getMonthlyExpenses from "@/utils/getMonthlyExpenses";
import getYearlyExpenses from "@/utils/getYearlyExpenses";
import getExpenses from "@/utils/getExpenses";

export default async function TotalExpenseDisplay() {
  const weeklyExpenses = await getWeeklyExpenses();
  const monthlyExpenses = await getMonthlyExpenses();
  const yearlyExpenses = await getYearlyExpenses();
  const weeklySpending = getExpenses(weeklyExpenses);
  const monthlySpending = getExpenses(monthlyExpenses);
  const yearlySpending = getExpenses(yearlyExpenses);
  return (
    <div className="border">
      <h2 className="font-semibold">Total Expenses</h2>
      <p>This week: ${weeklySpending}</p>
      <p>This month: ${monthlySpending}</p>
      <p>This year: ${yearlySpending}</p>
    </div>
  );
}
