"use client";

import { FormEvent } from "react";
import { getPrev52Weeks, getWeekRange } from "@/utils/getWeekOf";
import useFetchWeeklyPie from "@/custom_hooks/useFetchWeeklyPie";
import { useContext } from "react";
import { fetchPieContext } from "./ClientParent";
import { Pie, PieChart, Tooltip, Cell } from "recharts";
import paletteGenerator from "@/utils/paletteGenerator";

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
  const { week_Pie, setWeek_Pie } = useContext(fetchPieContext);
  const { transactions, isLoading, isError, isValidating } =
    useFetchWeeklyPie(week_Pie);

  if (isError) {
    console.log(isError);
    throw new Error("Unable to fetch data. WeeklyPie rh: api/fetchWeeklyPie");
  }

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
  const incomeData = incomeStats.map((el) => {
    return { name: el.name, value: el.amount };
  });

  const expenseData = expenseStats.map((el) => {
    return { name: el.name, value: el.amount };
  });

  const palette = paletteGenerator();

  function generateLegend(statsArr: any) {
    let count = 0;
    return statsArr.map((el: any, i: number) => {
      if (count < palette.length - 1 && i !== 0) {
        count++;
      } else {
        count = 0;
      }
      let x = el.percentage;
      let y = 100 - x;
      let z = 100 - y;
      return (
        <div key={i} className="my-3">
          <p className="flex items-center font-semibold">
            <span
              className="w-[14px] h-[14px] inline-block rounded-full border-[1px] border-neutral mr-1"
              style={{
                backgroundColor: `${palette[count]}`,
              }}
            ></span>
            {el.name}
          </p>
          <p className="text-sm">${el.amount.toFixed(2)}</p>
          <p className="text-sm">{el.percentage}%</p>
          <div className="h-[10px] flex border-[1px] border-neutral box-content mt-2">
            <span
              className={`h-[10px]`}
              style={{
                width: `${z}%`,
                backgroundColor: `${palette[count]}`,
              }}
            ></span>
            <span className={`h-[20px]`} style={{ width: `${y}%` }}></span>
          </div>
        </div>
      );
    });
  }

  const ToolTipIncome = ({ active, payload, label }: any) => {
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
  const ToolTipExpense = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-base-100">
          <p className="label">{`${
            payload[0].name
          } : $${payload[0].value.toFixed(2)}`}</p>
          <p className="bg-base-100">
            {((payload[0].value / eSum) * 100).toFixed(2)}%
          </p>
        </div>
      );
    }
    return null;
  };
  //   ---PIE---
  return (
    <div className="border border-neutral pb-5">
      <h3 className="font-bold text-center text-xl bg-base-200 py-5 border-b-[1px] border-neutral">
        Weekly Pie Chart
      </h3>
      <form onSubmit={handleSubmitWeek} className="flex items-end px-5">
        <div className="form-control w-full max-w-xs">
          <label className="label">
            <span className="label-text font-semibold">Choose a week</span>
          </label>
          <select
            id="week"
            name="week"
            className="select select-neutral select-bordered select-xs"
            defaultValue={week_Pie}
          >
            <option value={JSON.stringify(getWeekRange())}>Current</option>
            {optionsWeek}
          </select>
        </div>
        <button className="btn btn-primary btn-xs ml-2" type="submit">
          Submit
        </button>
      </form>
      {isLoading ||
        (isValidating && (
          <span className="loading loading-bars loading-xs mt-2 ml-5"></span>
        ))}
      {!isLoading && !isValidating && transactions !== undefined && (
        <div className="mt-3 w-full flex items-center">
          <div className="basis-1/2 flex flex-col">
            <h2 className="font-bold text-center text-lg bg-base-200 px-5">
              Income for Week
            </h2>
            <p className="mt-2 pl-5">
              <span className="font-bold">Total:</span> ${iSum.toFixed(2)}
            </p>
            <div className="flex">
              <div className="pl-5">
                {incomeData.length === 0 && (
                  <div className="h-[300px] w-[300px] flex justify-center items-center">
                    <div className="h-[200px] w-[200px] bg-base-300 rounded-full border-[1px] border-neutral"></div>
                  </div>
                )}
                {incomeData.length > 0 && (
                  <PieChart width={300} height={300}>
                    <Pie
                      data={incomeData}
                      dataKey="value"
                      nameKey="name"
                      cx="50%"
                      cy="50%"
                      //   innerRadius={60}
                      outerRadius={100}
                      fill="#82ca9d"
                      isAnimationActive={false}
                    >
                      {incomeData.map((entry, index) => (
                        <Cell
                          key={`cell-${index}`}
                          style={{ outline: "none" }}
                          fill={palette[index % palette.length]}
                          stroke="hsl(var(--n))"
                          strokeWidth={1}
                        />
                      ))}
                    </Pie>
                    <Tooltip content={<ToolTipIncome />} />
                  </PieChart>
                )}
              </div>

              <div className="w-full max-h-[300px] px-5 overflow-y-scroll">
                {incomeData.length > 0 ? (
                  generateLegend(incomeStats)
                ) : (
                  <div className="my-3">
                    <p className="flex items-center font-semibold">
                      <span className="w-[14px] h-[14px] inline-block rounded-full border-[1px] border-neutral mr-1 bg-base-200"></span>
                      No income
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
          <div className="basis-1/2 flex flex-col">
            <h2 className="font-bold text-center text-lg bg-base-200 px-5">
              Expenses for Week
            </h2>
            <p className="mt-2 pl-5">
              <span className="font-bold">Total:</span> -${eSum.toFixed(2)}
            </p>
            <div className="flex">
              <div className="pl-5">
                {expenseData.length === 0 && (
                  <div className="h-[300px] w-[300px] flex justify-center items-center">
                    <div className="h-[200px] w-[200px] bg-base-300 rounded-full border-[1px] border-neutral"></div>
                  </div>
                )}
                {expenseData.length > 0 && (
                  <PieChart width={300} height={300}>
                    <Pie
                      data={expenseData}
                      dataKey="value"
                      nameKey="name"
                      cx="50%"
                      cy="50%"
                      //   innerRadius={60}
                      outerRadius={100}
                      fill="#82ca9d"
                      isAnimationActive={false}
                    >
                      {expenseData.map((entry, index) => (
                        <Cell
                          key={`cell-${index}`}
                          style={{ outline: "none" }}
                          fill={palette[index % palette.length]}
                          stroke="hsl(var(--n))"
                          strokeWidth={1}
                        />
                      ))}
                    </Pie>
                    <Tooltip content={<ToolTipExpense />} />
                  </PieChart>
                )}
              </div>

              <div className="w-full max-h-[300px] px-5 overflow-y-scroll">
                {expenseData.length > 0 ? (
                  generateLegend(expenseStats)
                ) : (
                  <div className="my-3">
                    <p className="flex items-center font-semibold">
                      <span className="w-[14px] h-[14px] inline-block rounded-full border-[1px] border-neutral mr-1 bg-base-200"></span>
                      No expenses
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
