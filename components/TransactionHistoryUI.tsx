"use client";

import { FormEvent } from "react";
import { useState } from "react";
import useCustomFetchSWR from "@/custom_hooks/useCustomFetchSWR";
import { getPrev52Weeks, getWeekRange } from "@/utils/getWeekOf";
import { useSWRConfig } from "swr";

type Transaction = {
  type: string;
  source: string;
  amount: string;
  date: string;
  notes: string;
  transactionCode: string;
};

export default function TransactionHistoryUI() {
  const [radioOption, setRadioOption] = useState("week");
  const [week, setWeek] = useState<string | null>(
    JSON.stringify(getWeekRange())
  );
  const [month, setMonth] = useState<string | null>(null);
  const [year, setYear] = useState<string | null>(null);

  const { mutate } = useSWRConfig();

  const args = {
    radio: radioOption,
    week: week,
    month: month,
    year: year,
  };

  const { transactions, isLoading, isError } = useCustomFetchSWR(args);

  if (isError) {
    console.log(isError);
    throw new Error(
      "Unable to fetch data. useCustomFetch() rh: api/fetchTransactions"
    );
  }

  function handleSubmitWeek(event: FormEvent) {
    event.preventDefault();
    const form = event.target as HTMLFormElement;
    const data = {
      week: form.week.value as string,
    };
    setWeek(data.week);
  }

  function handleSubmitMonth(event: FormEvent) {
    event.preventDefault();
    const form = event.target as HTMLFormElement;
    const data = {
      month: form.month.value as string,
      year: form.year.value as string,
    };
    setMonth(data.month);
    setYear(data.year);
  }

  function handleSubmitYear(event: FormEvent) {
    event.preventDefault();
    const form = event.target as HTMLFormElement;
    const data = {
      year: form.year.value as string,
    };
    setYear(data.year);
  }

  const transactionList: JSX.Element[] = [];

  if (transactions) {
    console.log("Client:TransactionHistoryUI:", transactions);
    transactions.forEach((el: Transaction) => {
      const formatDate = new Date(el.date).toDateString();
      transactionList.push(
        <li key={el.transactionCode}>
          {el.transactionCode} | {formatDate} | {el.type} | {el.source} |
          {el.amount} | {el.notes}
        </li>
      );
    });
  }

  function onOptionChange(event: React.ChangeEvent<HTMLInputElement>) {
    setRadioOption(event.target.value);
    if (event.target.value === "month") {
      const month = new Date().getMonth() + 1;
      setWeek(null);
      setMonth(month.toString());
      setYear(new Date().getFullYear().toString());
    } else if (event.target.value === "year") {
      setWeek(null);
      setMonth(null);
      setYear(new Date().getFullYear().toString());
    } else if (event.target.value === "week") {
      setWeek(JSON.stringify(getWeekRange()));
      setMonth(null);
      setYear(null);
    }
  }

  const optionsWeek: JSX.Element[] = getPrev52Weeks().map((el, i) => {
    const valueString = JSON.stringify(el);
    return (
      <option key={i} value={valueString}>
        {el.range.start} to {el.range.end}
      </option>
    );
  });

  const monthsArr = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const optionsMonth: JSX.Element[] = monthsArr.map((el, i) => {
    return (
      <option key={el} value={i + 1}>
        {el}
      </option>
    );
  });

  const optionsYear: JSX.Element[] = [];
  const currentYear = new Date().getFullYear();
  for (let i = 1; i < 101; i++) {
    let year = currentYear - i;
    optionsYear.push(
      <option key={year} value={year}>
        {year}
      </option>
    );
  }

  return (
    <div>
      <h2 className="font-bold">Transaction History:</h2>
      <form>
        {/* <input
          className="radio"
          type="radio"
          id="weekly"
          value="week"
          checked={radioOption === "week"}
          onChange={onOptionChange}
        />
        <label htmlFor="weekly">Weekly</label> */}
        <div className="form-control">
          <label className="label cursor-pointer">
            <span className="label-text">Weekly</span>
          </label>
          <input
            className="radio"
            type="radio"
            id="weekly"
            value="week"
            checked={radioOption === "week"}
            onChange={onOptionChange}
          />
        </div>
        <input
          type="radio"
          id="monthly"
          value="month"
          checked={radioOption === "month"}
          onChange={onOptionChange}
        />
        <label htmlFor="monthly">Monthly</label>
        <input
          type="radio"
          id="yearly"
          value="year"
          checked={radioOption === "year"}
          onChange={onOptionChange}
        />
        <label htmlFor="yearly">Yearly</label>
      </form>
      {radioOption === "week" && (
        <form onSubmit={handleSubmitWeek}>
          <label htmlFor="week">Choose a week:</label>
          <select className="border border-black" id="week" name="week">
            <option value={JSON.stringify(getWeekRange())}>Current</option>
            {optionsWeek}
          </select>
          <button className="btn btn-neutral btn-sm" type="submit">
            Submit
          </button>
          <button
            className="btn btn-neutral btn-sm"
            onClick={() =>
              mutate(
                `/api/fetchTransactions?option=${args.radio}&week=${args.week}&month=${args.month}&year=${args.year}`
              )
            }
          >
            Refresh
          </button>
        </form>
      )}
      {radioOption === "month" && (
        <form onSubmit={handleSubmitMonth}>
          <label htmlFor="month">Choose a month:</label>
          <select className="border border-black" id="month" name="month">
            <option value={new Date().getMonth() + 1}>Current</option>
            {optionsMonth}
          </select>
          <label htmlFor="year">Choose a year:</label>
          <select className="border border-black" id="year" name="year">
            <option value={new Date().getFullYear()}>Current</option>
            {optionsYear}
          </select>
          <button
            className="border border-black bg-black text-lime-400"
            type="submit"
          >
            Submit
          </button>
          <button
            className="border border-black bg-black text-red-400"
            onClick={() =>
              mutate(
                `/api/fetchTransactions?option=${args.radio}&week=${args.week}&month=${args.month}&year=${args.year}`
              )
            }
          >
            Refresh
          </button>
        </form>
      )}
      {radioOption === "year" && (
        <form onSubmit={handleSubmitYear}>
          <label htmlFor="year">Choose a year:</label>
          <select className="border border-black" id="year" name="year">
            <option value={new Date().getFullYear()}>Current</option>
            {optionsYear}
          </select>
          <button
            className="border border-black bg-black text-lime-400"
            type="submit"
          >
            Submit
          </button>
          <button
            className="border border-black bg-black text-red-400"
            onClick={() =>
              mutate(
                `/api/fetchTransactions?option=${args.radio}&week=${args.week}&month=${args.month}&year=${args.year}`
              )
            }
          >
            Refresh
          </button>
        </form>
      )}
      {isLoading && <span className="loading loading-bars loading-sm"></span>}
      {transactionList.length === 0 && !isLoading && (
        <p>No transactions to display.</p>
      )}
      {transactionList.length > 0 && !isLoading && <ul>{transactionList}</ul>}
    </div>
  );
}
