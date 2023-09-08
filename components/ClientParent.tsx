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
      <div className="flex flex-col pr-10 pl-10 pt-3 bg-base-200 fixed h-screen mt-[139px] border-r-[1px] border-neutral">
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
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="icon icon-tabler icon-tabler-plus ml-1"
              width="18"
              height="18"
              viewBox="0 0 24 24"
              stroke-width="2"
              stroke="currentColor"
              fill="none"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
              <path d="M12 5l0 14"></path>
              <path d="M5 12l14 0"></path>
            </svg>
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
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="icon icon-tabler icon-tabler-plus ml-1"
              width="18"
              height="18"
              viewBox="0 0 24 24"
              stroke-width="2"
              stroke="currentColor"
              fill="none"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
              <path d="M12 5l0 14"></path>
              <path d="M5 12l14 0"></path>
            </svg>
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
