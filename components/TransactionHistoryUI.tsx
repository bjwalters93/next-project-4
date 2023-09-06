"use client";

import { FormEvent } from "react";
import { useState } from "react";
import { getPrev52Weeks, getWeekRange } from "@/utils/getWeekOf";
import { useSWRConfig } from "swr";
import TransactionsTable from "./TransactionsTable";

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
      <form className="flex">
        <div className="flex items-center">
          <label className="label cursor-pointer">
            <span className="label-text">Weekly</span>
          </label>
          <input
            className="radio radio-primary"
            type="radio"
            id="weekly"
            value="week"
            checked={radioOption === "week"}
            onChange={onOptionChange}
          />
        </div>
        <div className="flex items-center ml-3">
          <label className="label cursor-pointer">
            <span className="label-text">Monthly</span>
          </label>
          <input
            className="radio radio-primary"
            type="radio"
            id="monthly"
            value="month"
            checked={radioOption === "month"}
            onChange={onOptionChange}
          />
        </div>
        <div className="flex items-center ml-3">
          <label className="label cursor-pointer">
            <span className="label-text">Yearly</span>
          </label>
          <input
            className="radio radio-primary"
            type="radio"
            id="yearly"
            value="year"
            checked={radioOption === "year"}
            onChange={onOptionChange}
          />
        </div>
      </form>
      {radioOption === "week" && (
        <form onSubmit={handleSubmitWeek} className="flex items-end">
          <div className="form-control w-full max-w-xs">
            <label className="label">
              <span className="label-text">Choose a week</span>
            </label>
            <select
              id="week"
              name="week"
              className="select select-primary select-bordered select-sm"
            >
              <option value={JSON.stringify(getWeekRange())}>Current</option>
              {optionsWeek}
            </select>
          </div>
          <button className="btn btn-primary btn-sm ml-2" type="submit">
            Submit
          </button>
          <button
            className="btn btn-primary btn-sm ml-2"
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
        <form onSubmit={handleSubmitMonth} className="flex items-end">
          <div className="form-control w-full max-w-xs">
            <label className="label">
              <span className="label-text">Choose a month</span>
            </label>
            <select
              className="select select-primary select-bordered select-sm"
              id="month"
              name="month"
            >
              <option value={new Date().getMonth() + 1}>Current</option>
              {optionsMonth}
            </select>
          </div>
          <div className="form-control w-full max-w-xs ml-2">
            <label className="label">
              <span className="label-text">Choose a year</span>
            </label>
            <select
              className="select select-primary select-bordered select-sm"
              id="year"
              name="year"
            >
              <option value={new Date().getFullYear()}>Current</option>
              {optionsYear}
            </select>
          </div>
          <button className="btn btn-primary btn-sm ml-2" type="submit">
            Submit
          </button>
          <button
            className="btn btn-primary btn-sm ml-2"
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
        <form onSubmit={handleSubmitYear} className="flex items-end">
          <div className="form-control w-full max-w-xs">
            <label className="label">
              <span className="label-text">Choose a year</span>
            </label>
            <select
              className="select select-primary select-bordered select-sm"
              id="year"
              name="year"
            >
              <option value={new Date().getFullYear()}>Current</option>
              {optionsYear}
            </select>
          </div>
          <button className="btn btn-primary btn-sm ml-2" type="submit">
            Submit
          </button>
          <button
            className="btn btn-primary btn-sm ml-2"
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
      <TransactionsTable args={args} />
    </div>
  );
}
