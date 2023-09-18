"use client";

import WeeklyPie from "./WeeklyPie";
import MonthlyPie from "./MonthlyPie";
import YearlyPie from "./YearlyPie";

export default function PieChartsUI() {
  return (
    <div className="mt-2">
      <h2 className="font-bold text-2xl">Charts:</h2>
      <div className="flex flex-col mt-2">
        <WeeklyPie />
        <MonthlyPie />
        <YearlyPie />
      </div>
    </div>
  );
}
