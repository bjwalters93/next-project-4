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

  const weeklyEarnings = getEarnings(weeklyIncome).toFixed(2);
  const monthlyEarnings = getEarnings(monthlyIncome).toFixed(2);
  const yearlyEarnings = getEarnings(yearlyIncome).toFixed(2);

  return (
    <div className="basis-1/2 border-r-[.5px] border-neutral">
      <h2 className="font-semibold flex justify-center mb-2">
        <span className="flex items-center">
          <svg
            className="fill-success mr-1"
            width="22"
            height="22"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
          >
            <path
              clipRule="evenodd"
              fillRule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zm.75-11.25a.75.75 0 00-1.5 0v2.5h-2.5a.75.75 0 000 1.5h2.5v2.5a.75.75 0 001.5 0v-2.5h2.5a.75.75 0 000-1.5h-2.5v-2.5z"
            ></path>
          </svg>
          Total Income this
        </span>
      </h2>
      <div className="flex">
        <p className="basis-1/3 text-center">
          <span className="py-1 px-2 bg-base-200 border-[1px] border-neutral">
            week: ${weeklyEarnings}
          </span>
        </p>
        <p className="basis-1/3 text-center">
          <span className="py-1 px-2 bg-base-200 border-[1px] border-neutral">
            month: ${monthlyEarnings}
          </span>
        </p>
        <p className="basis-1/3 text-center">
          <span className="py-1 px-2 bg-base-200 border-[1px] border-neutral">
            year: ${yearlyEarnings}
          </span>
        </p>
      </div>
    </div>
  );
}
