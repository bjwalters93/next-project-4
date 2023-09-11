import { FormEvent } from "react";
import { getPrev52Weeks, getWeekRange } from "@/utils/getWeekOf";
import useFetchWeeklyPie from "@/custom_hooks/useFetchWeeklyPie";
import { useState } from "react";

type Income = {
  type: string;
  source: string;
  amount: string;
  date: string;
  notes: string;
  transactionCode: string;
};

type Expense = {
  type: string;
  category: string;
  amount: string;
  date: string;
  notes: string;
  transactionCode: string;
};

export default function WeeklyPie() {
  const [week, setWeek] = useState<string | null>(
    JSON.stringify(getWeekRange())
  );
  const { transactions, isLoading, isError, isValidating, mutate } =
    useFetchWeeklyPie(week);

  const reducedSources: string[] = [];
  const reducedCategories = [];

  const incomeTransactions: { source: string; amount: string }[] = [];
  const expenseTransactions: { category: string; amount: string }[] = [];

  //   let arr = ["apple", "mango", "apple", "orange", "mango", "mango"];

  //   function removeDuplicates(arr) {
  //     let unique = [];
  //     arr.forEach((element) => {
  //       if (!unique.includes(element)) {
  //         unique.push(element);
  //       }
  //     });
  //     return unique;
  //   }
  //   console.log(removeDuplicates(arr));

  transactions?.forEach((el: Income | Expense) => {
    if (el.type === "income") {
      const source = el.type;
      const amount = el.amount;
      if (!reducedSources.includes(el.source)) {
        reducedSources.push(el.source);
      }
      //   incomeTransactions.push(el as Income);
      incomeTransactions.push({ source: source, amount: amount });
    } else if (el.type === "expense") {
      const category = el.type;
      const amount = el.amount;
      //   expenseTransactions.push(el as Expense);
      expenseTransactions.push({ category: category, amount: amount });
    }
  });

  console.log("incomeTransactions:", incomeTransactions);
  console.log("expenseTransactions:", expenseTransactions);

  console.log("sources:", sources);
  console.log("categories:", categories);

  function handleSubmitWeek(event: FormEvent) {
    event.preventDefault();
    const form = event.target as HTMLFormElement;
    const data = {
      week: form.week.value as string,
    };
    setWeek(data.week);
  }

  const optionsWeek: JSX.Element[] = getPrev52Weeks().map((el, i) => {
    const valueString = JSON.stringify(el);
    return (
      <option key={i} value={valueString}>
        {el.range.start} to {el.range.end}
      </option>
    );
  });

  return (
    <div className="basis-1/3 border border-neutral">
      <h3 className="font-semibold text-center">Weekly Pie Chart</h3>
      <form onSubmit={handleSubmitWeek} className="flex items-end">
        <div className="form-control w-full max-w-xs">
          <label className="label">
            <span className="label-text">Choose a week</span>
          </label>
          <select
            id="week"
            name="week"
            className="select select-secondary select-bordered select-xs"
          >
            <option value={JSON.stringify(getWeekRange())}>Current</option>
            {optionsWeek}
          </select>
        </div>
        <button
          className="btn btn-secondary btn-outline btn-xs ml-2"
          type="submit"
        >
          Submit
        </button>
      </form>
      <ul>
        {transactions?.map((el: any, i: any) => {
          return <li key={i}>{el.transactionCode}</li>;
        })}
      </ul>
    </div>
  );
}
