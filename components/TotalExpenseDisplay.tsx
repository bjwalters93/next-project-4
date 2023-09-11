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
    <div className="basis-1/2 border-l-[.5px] border-l-neutral">
      <h2 className="font-semibold text-center flex justify-center">
        <span className="flex items-center">
          <svg
            className="fill-error mr-1"
            width="22"
            height="22"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
          >
            <path
              clip-rule="evenodd"
              fill-rule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zM6.75 9.25a.75.75 0 000 1.5h6.5a.75.75 0 000-1.5h-6.5z"
            ></path>
          </svg>
          Total Expenses this
        </span>
      </h2>
      <div className="flex">
        <p className="basis-1/3 text-center">
          <span className="py-1 px-2 bg-base-200 border-[1px] border-neutral">
            week: ${weeklySpending}
          </span>
        </p>
        <p className="basis-1/3 text-center">
          <span className="py-1 px-2 bg-base-200 border-[1px] border-neutral">
            month: ${monthlySpending}
          </span>
        </p>
        <p className="basis-1/3 text-center">
          <span className="py-1 px-2 bg-base-200 border-[1px] border-neutral">
            year: ${yearlySpending}
          </span>
        </p>
      </div>
    </div>
  );
}
