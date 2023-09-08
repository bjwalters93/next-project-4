"use client";

import TransactionHistoryUI from "@/components/TransactionHistoryUI";
import AddIncomeFormUI from "@/components/AddIncomeFormUI";
import AddExpenseFormUI from "@/components/AddExpenseFormUI";
import useCustomFetchSWR from "@/custom_hooks/useCustomFetchSWR";
import { useState } from "react";
import { getWeekRange } from "@/utils/getWeekOf";

export default function ClientParent() {
  const [radioOption, setRadioOption] = useState("week");
  const [week, setWeek] = useState<string | null>(
    JSON.stringify(getWeekRange())
  );
  const [month, setMonth] = useState<string | null>(null);
  const [year, setYear] = useState<string | null>(null);

  const [activeTab, setActiveTab] = useState(1);

  function tabTracker(tab: number) {
    setActiveTab(tab);
  }

  const args = {
    radio: radioOption,
    week: week,
    month: month,
    year: year,
  };

  const { transactions, isLoading, isError, isValidating, mutate } =
    useCustomFetchSWR(args);

  return (
    <div className="flex">
      <div className="flex flex-col pr-10 pl-10 pt-3 bg-base-200 fixed h-screen mt-[72px]">
        <div className="tabs">
          <a
            className={
              activeTab === 1
                ? "tab tab-bordered tab-active"
                : "tab tab-bordered"
            }
            onClick={() => tabTracker(1)}
          >
            Add Income
          </a>
          <a
            className={
              activeTab === 2
                ? "tab tab-bordered tab-active"
                : "tab tab-bordered"
            }
            onClick={() => tabTracker(2)}
          >
            Add Expense
          </a>
        </div>
        {activeTab === 1 && <AddIncomeFormUI mutate={mutate} />}
        {activeTab === 2 && <AddExpenseFormUI mutate={mutate} />}
      </div>

      <TransactionHistoryUI
        radioOption={radioOption}
        week={week}
        month={month}
        year={year}
        setRadioOption={setRadioOption}
        setWeek={setWeek}
        setMonth={setMonth}
        setYear={setYear}
        transactions={transactions}
        isLoading={isLoading}
        isError={isError}
        isValidating={isValidating}
        mutate={mutate}
      />
    </div>
  );
}
