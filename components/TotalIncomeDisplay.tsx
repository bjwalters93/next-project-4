// import getAllTransactions from "@/utils/getAllTransactions";
import getWeeklyIncome from "@/utils/getWeeklyIncome";
import getMonthlyIncome from "@/utils/getMonthlyIncome";
import getYearlyIncome from "@/utils/getYearlyIncome";
import getEarnings from "@/utils/getEarnings";

export default async function TotalIncomeDisplay() {
  const weeklyIncome = await getWeeklyIncome();
  const monthlyIncome = await getMonthlyIncome();
  const yearlyIncome = await getYearlyIncome();
  const weeklyEarnings = getEarnings(weeklyIncome);
  const monthlyEarnings = getEarnings(monthlyIncome);
  const yearlyEarnings = getEarnings(yearlyIncome);

  return (
    <div className="border">
      <h2 className="font-semibold">Total Income</h2>
      <p>This weeks earnings: ${weeklyEarnings}</p>
      <p>This months earnings: ${monthlyEarnings}</p>
      <p>This years earnings: ${yearlyEarnings}</p>
    </div>
  );
}
