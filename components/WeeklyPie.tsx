import { FormEvent } from "react";
import { getPrev52Weeks, getWeekRange } from "@/utils/getWeekOf";
import useFetchWeeklyPie from "@/custom_hooks/useFetchWeeklyPie";
import { useContext } from "react";
import { fetchWeeklyPieContext } from "./ClientParent";
import {
  Pie,
  PieChart,
  Legend,
  Tooltip,
  Cell,
  ResponsiveContainer,
} from "recharts";
import { isAssertEntry } from "typescript";

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
  const { week_Pie, setWeek_Pie } = useContext(fetchWeeklyPieContext);
  const { transactions, isLoading, isError, isValidating } =
    useFetchWeeklyPie(week_Pie);

  if (isError) {
    console.log(isError);
    throw new Error("Unable to fetch data. WeeklyPie rh: api/fetchWeeklyPie");
  }

  console.log("WeeklyPie_Transactions:", transactions);

  const reducedSources: string[] = [];
  const reducedCategories: string[] = [];

  const incomeTransactions: { source: string; amount: string }[] = [];
  const expenseTransactions: { category: string; amount: string }[] = [];

  let iSum: number = 0;
  let eSum: number = 0;

  transactions?.forEach((el: Income | Expense) => {
    if (el.type === "income") {
      const iT = el as Income;
      iSum += Number(iT.amount);
      const source = iT.source;
      const amount = iT.amount;
      if (!reducedSources.includes(iT.source)) {
        reducedSources.push(iT.source);
      }
      incomeTransactions.push({ source: source, amount: amount });
    } else if (el.type === "expense") {
      const eT = el as Expense;
      eSum += Number(eT.amount);
      const category = eT.category;
      const amount = eT.amount;
      if (!reducedCategories.includes(eT.category)) {
        reducedCategories.push(eT.category);
      }
      expenseTransactions.push({ category: category, amount: amount });
    }
  });

  const incomeStats: { name: string; amount: number; percentage: number }[] =
    [];
  const expenseStats: { name: string; amount: number; percentage: number }[] =
    [];

  reducedSources.forEach((source) => {
    let sum: number = 0;
    incomeTransactions.forEach((transaction) => {
      if (source === transaction.source) {
        sum += Number(transaction.amount);
      }
    });
    const calculation = (sum / iSum) * 100;
    incomeStats.push({
      name: source,
      amount: sum,
      percentage: Number(calculation.toFixed(2)),
    });
  });

  reducedCategories.forEach((category) => {
    let sum: number = 0;
    expenseTransactions.forEach((transaction) => {
      if (category === transaction.category) {
        sum += Number(transaction.amount);
      }
    });
    const calculation = (sum / eSum) * 100;
    expenseStats.push({
      name: category,
      amount: sum,
      percentage: Number(calculation.toFixed(2)),
    });
  });

  function handleSubmitWeek(event: FormEvent) {
    event.preventDefault();
    const form = event.target as HTMLFormElement;
    const data = {
      week: form.week.value as string,
    };
    setWeek_Pie(data.week);
  }

  const optionsWeek: JSX.Element[] = getPrev52Weeks().map((el, i) => {
    const valueString = JSON.stringify(el);
    return (
      <option key={i} value={valueString}>
        {el.range.start} to {el.range.end}
      </option>
    );
  });
  //   ---PIE---
  const data = incomeStats.map((el) => {
    return { name: el.name, value: el.amount };
  });
  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

  function assignColor() {
    let count = 0;
    return incomeStats.map((el, i) => {
      console.log("count:", count);
      //   i < COLORS.length - 1 ? count++ : (count = 0);
      if (i < COLORS.length - 1) {
        count++;
      } else if (i > COLORS.length - 1) {
        count = 0;
      }
      let x = el.percentage;
      let y = 100 - x;
      let z = 100 - y;
      return (
        <div className="mt-2">
          <p>{el.name}</p>
          <p>${el.amount.toFixed(2)}</p>
          <p>%{el.percentage}</p>
          <div className="h-[20px] flex border-[3px] border-neutral box-content">
            <span
              className={`h-[20px]`}
              style={{
                width: `${z}%`,
                backgroundColor: `${COLORS[count]}`,
              }}
            ></span>
            <span className={`h-[20px]`} style={{ width: `${y}%` }}></span>
          </div>
        </div>
      );
    });
  }

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-base-100">
          <p className="label">{`${
            payload[0].name
          } : $${payload[0].value.toFixed(2)}`}</p>
          <p className="bg-base-100">
            {((payload[0].value / iSum) * 100).toFixed(2)}%
          </p>
        </div>
      );
    }

    return null;
  };
  //   ---PIE---
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
      {isLoading ||
        (isValidating && (
          <span className="loading loading-bars loading-xs mt-2"></span>
        ))}
      {!isLoading && !isValidating && transactions !== undefined && (
        <div className="mt-3 w-full flex items-center">
          <div className="basis-1/2 flex flex-col items-center">
            <div>
              <PieChart width={300} height={300}>
                <Pie
                  data={data}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  //   innerRadius={60}
                  outerRadius={100}
                  fill="#82ca9d"
                  isAnimationActive={false}
                >
                  {data.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      style={{ outline: "none" }}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip content={<CustomTooltip />} />
              </PieChart>
            </div>
            <div className="w-[80%] max-w-[400px] px-5">{assignColor()}</div>
          </div>
          <div className="basis-1/2 flex flex-col items-center">
            <div>
              <PieChart width={300} height={300}>
                <Pie
                  data={data}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  //   innerRadius={60}
                  outerRadius={100}
                  fill="#82ca9d"
                  isAnimationActive={false}
                >
                  {data.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      style={{ outline: "none" }}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip content={<CustomTooltip />} />
              </PieChart>
            </div>
            <div></div>
          </div>
        </div>
      )}
    </div>
  );
}

{
  /* <ul>
  {incomeStats.length === 0 && <p>No data to display.</p>}
  {incomeStats?.map((el: any, i: any) => {
    return (
      <ul key={i}>
        <li>Name: {el.name}</li>
        <li>Amount: {el.amount}</li>
        <li>Percentage: {el.percentage}</li>
      </ul>
    );
  })}
</ul>
<hr />
<ul>
  {expenseStats.length === 0 && <p>No data to display.</p>}
  {expenseStats?.map((el: any, i: any) => {
    return (
      <ul key={i}>
        <li>Name: {el.name}</li>
        <li>Amount: {el.amount}</li>
        <li>Percentage: {el.percentage}</li>
      </ul>
    );
  })}
</ul> */
}
