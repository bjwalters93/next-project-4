"use client";

import WeeklyPie from "./WeeklyPie";
import MonthlyPie from "./MonthlyPie";
import YearlyPie from "./YearlyPie";
import { useState } from "react";

export default function PieChartsUI() {
  const [tabTracker, setTabTracker] = useState(1);
  return (
    <div className="mt-2">
      {/* <h2 className="font-bold text-2xl">Charts:</h2> */}
      <div className="tabs flex-nowrap bg-base-100">
        <a
          className={tabTracker === 1 ? "tab tab-bordered tab-active" : "tab"}
          onClick={() => setTabTracker(1)}
        >
          Week
        </a>
        <a
          className={tabTracker === 2 ? "tab tab-bordered tab-active" : "tab"}
          onClick={() => setTabTracker(2)}
        >
          Month
        </a>
        <a
          className={tabTracker === 3 ? "tab tab-bordered tab-active" : "tab"}
          onClick={() => setTabTracker(3)}
        >
          Year
        </a>
      </div>
      <div className="flex flex-col">
        {tabTracker === 1 && <WeeklyPie />}
        {tabTracker === 2 && <MonthlyPie />}
        {tabTracker === 3 && <YearlyPie />}
      </div>
    </div>
  );
}
