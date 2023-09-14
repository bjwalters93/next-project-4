"use client";

import WeeklyPie from "./WeeklyPie";
import MonthlyPie from "./MonthlyPie";
import YearlyPie from "./YearlyPie";

export default function PieChartsUI() {
  return (
    <div className="mt-2">
      <h2 className="font-bold">Charts:</h2>
      <div className="flex mt-2">
        <WeeklyPie />
        {/* <MonthlyPie /> */}
        {/* <YearlyPie /> */}
      </div>
    </div>
  );
}
