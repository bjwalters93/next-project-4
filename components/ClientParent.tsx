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

  const args = {
    radio: radioOption,
    week: week,
    month: month,
    year: year,
  };

  const { transactions, isLoading, isError, isValidating, mutate } =
    useCustomFetchSWR(args);

  return (
    <div>
      <AddIncomeFormUI mutate={mutate} />
      <AddExpenseFormUI mutate={mutate} />
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
