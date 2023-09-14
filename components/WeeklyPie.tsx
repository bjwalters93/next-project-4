import { FormEvent } from "react";
import { getPrev52Weeks, getWeekRange } from "@/utils/getWeekOf";
import useFetchWeeklyPie from "@/custom_hooks/useFetchWeeklyPie";
import { useContext } from "react";
import { fetchWeeklyPieContext } from "./ClientParent";
import { DefaultizedPieValueType } from "@mui/x-charts";
import { PieChart, pieArcLabelClasses } from "@mui/x-charts/PieChart";
import { createTheme, useTheme, ThemeProvider } from "@mui/material/styles";
import {
  blueberryTwilightPalette,
  mangoFusionPalette,
  cheerfulFiestaPalette,
} from "@mui/x-charts/colorPalettes";

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
  //   ---MUI-X---
  const data = incomeStats.map((e) => {
    return {
      label: e.name + ": $" + e.amount.toFixed(2),
      value: e.amount,
    };
  });

  const TOTAL = data.map((item) => item.value).reduce((a, b) => a + b, 0);

  const getArcLabel = (params: DefaultizedPieValueType) => {
    const percent = params.value / TOTAL;
    return `${(percent * 100).toFixed(1)}%`;
  };

  const sizing = {
    // margin: { right: 200 },
    // width: 400,
    height: 400,
    // legend: { hidden: true },
  };
  const newTheme = createTheme({
    palette: {
      text: {
        primary: "hsl(var(--bc))",
      },
    },
    typography: {
      fontSize: 12,
    },
  });
  const x = cheerfulFiestaPalette("light");
  console.log("x:", x);
  //   ---MUI-X---
  return (
    <div
      className=" basis-1/3 border border-neutral"
      //   style={{ backgroundColor: "hsl(var(--bc))" }}
    >
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
        <div>
          <ThemeProvider theme={newTheme}>
            <PieChart
              series={[
                {
                  //   outerRadius: 200,
                  data,
                  arcLabel: getArcLabel,
                  // cx: 100,
                  // cy: 100,
                  //   innerRadius: 30,
                  valueFormatter: getArcLabel,
                },
              ]}
              sx={{
                [`& .${pieArcLabelClasses.root}`]: {
                  fill: "white",
                  fontSize: 14,
                },
                "--ChartsLegend-rootOffsetX": "-30px",
              }}
              // width={700}
              // height={200}
              {...sizing}
              colors={cheerfulFiestaPalette}
            />
          </ThemeProvider>
          {/* <ul>
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
          </ul> */}
        </div>
      )}
    </div>
  );
}
