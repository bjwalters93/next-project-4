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
    <div className="border">
      <h2 className="font-semibold">Total Expenses</h2>
      <p>This week: ${weeklySpending}</p>
      <p>This month: ${monthlySpending}</p>
      <p>This year: ${yearlySpending}</p>
    </div>
  );
}
