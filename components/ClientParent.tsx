"use client";

import TransactionHistoryUI from "@/components/TransactionHistoryUI";
import AddIncomeFormUI from "@/components/AddIncomeFormUI";
import AddExpenseFormUI from "@/components/AddExpenseFormUI";
import useCustomFetchSWR from "@/custom_hooks/useCustomFetchSWR";
import { createContext, useState } from "react";
import { getWeekRange } from "@/utils/getWeekOf";
import PieChartsUI from "./PieChartsUI";
import SearchNotesUI from "./SearchNotesUI";

export const fetchWeeklyPieContext = createContext<
  (string | React.Dispatch<React.SetStateAction<string | null>> | null)[]
>([]);

export default function ClientParent() {
  const [radioOption, setRadioOption] = useState("week");
  const [week, setWeek] = useState<string | null>(
    JSON.stringify(getWeekRange())
  );
  const [month, setMonth] = useState<string | null>(null);
  const [year, setYear] = useState<string | null>(null);

  const [activeTab_LP, setActiveTab_LP] = useState(1);
  const [activeTab_MP, setActiveTab_MP] = useState(1);

  //   ---States for context---
  const [week_Pie, setWeek_Pie] = useState<string | null>(
    JSON.stringify(getWeekRange())
  );
  //   ---States for context---

  function tabTracker_LP(tab: number) {
    setActiveTab_LP(tab);
  }

  function tabTracker_MP(tab: number) {
    setActiveTab_MP(tab);
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
              activeTab_LP === 1
                ? "tab tab-bordered tab-active"
                : "tab tab-bordered"
            }
            onClick={() => tabTracker_LP(1)}
          >
            Add Income
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="icon icon-tabler icon-tabler-plus ml-1"
              width="18"
              height="18"
              viewBox="0 0 24 24"
              strokeWidth="2"
              stroke="currentColor"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
              <path d="M12 5l0 14"></path>
              <path d="M5 12l14 0"></path>
            </svg>
          </a>
          <a
            className={
              activeTab_LP === 2
                ? "tab tab-bordered tab-active"
                : "tab tab-bordered"
            }
            onClick={() => tabTracker_LP(2)}
          >
            Add Expense
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="icon icon-tabler icon-tabler-plus ml-1"
              width="18"
              height="18"
              viewBox="0 0 24 24"
              strokeWidth="2"
              stroke="currentColor"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
              <path d="M12 5l0 14"></path>
              <path d="M5 12l14 0"></path>
            </svg>
          </a>
        </div>
        <fetchWeeklyPieContext.Provider value={[week_Pie, setWeek_Pie]}>
          {activeTab_LP === 1 && <AddIncomeFormUI mutate={mutate} />}
          {activeTab_LP === 2 && <AddExpenseFormUI mutate={mutate} />}
        </fetchWeeklyPieContext.Provider>
      </div>
      <div className="w-full ml-[355.23px] mt-[139px] p-4">
        <div className="tabs">
          <a
            className={
              activeTab_MP === 1
                ? "tab tab-bordered tab-active"
                : "tab tab-bordered"
            }
            onClick={() => tabTracker_MP(1)}
          >
            <svg
              className="mr-1"
              width="18"
              height="18"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
            >
              <path d="M12 9a1 1 0 01-1-1V3c0-.553.45-1.008.997-.93a7.004 7.004 0 015.933 5.933c.078.547-.378.997-.93.997h-5z"></path>
              <path d="M8.003 4.07C8.55 3.992 9 4.447 9 5v5a1 1 0 001 1h5c.552 0 1.008.45.93.997A7.001 7.001 0 012 11a7.002 7.002 0 016.003-6.93z"></path>
            </svg>
            Charts
          </a>
          <a
            className={
              activeTab_MP === 2
                ? "tab tab-bordered tab-active"
                : "tab tab-bordered"
            }
            onClick={() => tabTracker_MP(2)}
          >
            <svg
              className="mr-1"
              fill="currentColor"
              width="18"
              height="18"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
            >
              <path d="M2 4.5A2.5 2.5 0 014.5 2h11a2.5 2.5 0 010 5h-11A2.5 2.5 0 012 4.5zM2.75 9.083a.75.75 0 000 1.5h14.5a.75.75 0 000-1.5H2.75zM2.75 12.663a.75.75 0 000 1.5h14.5a.75.75 0 000-1.5H2.75zM2.75 16.25a.75.75 0 000 1.5h14.5a.75.75 0 100-1.5H2.75z"></path>
            </svg>
            Transactions
          </a>
          <a
            className={
              activeTab_MP === 3
                ? "tab tab-bordered tab-active"
                : "tab tab-bordered"
            }
            onClick={() => tabTracker_MP(3)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="icon icon-tabler icon-tabler-list-search mr-1"
              width="22"
              height="22"
              viewBox="0 0 24 24"
              strokeWidth="2"
              stroke="currentColor"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
              <path d="M15 15m-4 0a4 4 0 1 0 8 0a4 4 0 1 0 -8 0"></path>
              <path d="M18.5 18.5l2.5 2.5"></path>
              <path d="M4 6h16"></path>
              <path d="M4 12h4"></path>
              <path d="M4 18h4"></path>
            </svg>
            Search Notes
          </a>
        </div>
        {activeTab_MP === 1 && <PieChartsUI />}
        {activeTab_MP === 2 && (
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
        )}
        {activeTab_MP === 3 && <SearchNotesUI />}
      </div>
    </div>
  );
}
