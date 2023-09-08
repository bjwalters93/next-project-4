// import getAllTransactions from "@/utils/getAllTransactions";
import getWeeklyIncome from "@/utils/getWeeklyIncome";
import getMonthlyIncome from "@/utils/getMonthlyIncome";
import getYearlyIncome from "@/utils/getYearlyIncome";
import getEarnings from "@/utils/getEarnings";

export default async function TotalIncomeDisplay() {
  const weeklyIncomeData = getWeeklyIncome();
  const monthlyIncomeData = getMonthlyIncome();
  const yearlyIncomeData = getYearlyIncome();

  const [weeklyIncome, monthlyIncome, yearlyIncome] = await Promise.all([
    weeklyIncomeData,
    monthlyIncomeData,
    yearlyIncomeData,
  ]);

  const weeklyEarnings = getEarnings(weeklyIncome);
  const monthlyEarnings = getEarnings(monthlyIncome);
  const yearlyEarnings = getEarnings(yearlyIncome);

  return (
    <div className="basis-1/2 border-r-[.5px] border-neutral border-y-[.5px] border-y-success">
      <h2 className="font-semibold text-center">Total Income this</h2>
      <div className="flex">
        <p className="basis-1/3 text-center bg-base-200">
          week: ${weeklyEarnings}
        </p>
        <p className="basis-1/3 text-center bg-base-200">
          month: ${monthlyEarnings}
        </p>
        <p className="basis-1/3 text-center bg-base-200">
          year: ${yearlyEarnings}
        </p>
      </div>
    </div>
  );
}
