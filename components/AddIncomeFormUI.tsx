"use client";

import { FormEvent } from "react";
import { useRouter } from "next/navigation";
import { useContext } from "react";
import { fetchWeeklyPieContext } from "./ClientParent";
import { useSWRConfig } from "swr";

export default function AddIncomeFormUI({ mutate }: any) {
  const router = useRouter();
  //   ---context logic---
  const { week_Pie } = useContext(fetchWeeklyPieContext);
  const { mutate: week_Pie_mutate } = useSWRConfig();
  //   ---context logic---
  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    const form = event.target as HTMLFormElement;
    const data = {
      source: form.source.value,
      amount: form.amount.value,
      date: form.date.value,
      notes: form.notes.value,
    };
    const response = await fetch("http://localhost:3000/api/addIncome", {
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
    });
    const result = await response.json();
    mutate();
    week_Pie_mutate(`/api/fetchWeeklyPie?week=${week_Pie}`);
    router.refresh();
    console.log("post addIncome:", result);
  };
  return (
    <div className="mt-3 mb-10">
      <form onSubmit={handleSubmit}>
        <div className="form-control w-full max-w-xs">
          <label className="label">
            <span className="label-text">Source</span>
          </label>
          <input
            className="input input-bordered input-primary input-sm w-full max-w-xs"
            type="text"
            id="source"
            name="source"
            required
          />
        </div>
        <div className="form-control w-full max-w-xs">
          <label className="label">
            <span className="label-text">Amount $</span>
          </label>
          <input
            className="input input-bordered input-primary input-sm w-full max-w-xs"
            type="number"
            id="amount"
            name="amount"
            required
          />
        </div>
        <div className="form-control w-full max-w-xs">
          <label className="label">
            <span className="label-text">Date</span>
          </label>
          <input
            className="input input-bordered input-primary input-sm w-full max-w-xs"
            type="date"
            id="date"
            name="date"
            required
          />
        </div>
        <div className="form-control w-full max-w-xs">
          <label className="label">
            <span className="label-text">Notes</span>
          </label>
          <input
            className="input input-bordered input-primary input-sm w-full max-w-xs"
            type="text"
            id="notes"
            name="notes"
            required
          />
        </div>
        <div className="flex mt-3 justify-end">
          <button className="btn btn-primary btn-sm ml-2" type="submit">
            Submit
          </button>
          <button className="btn btn-warning btn-sm ml-2" type="reset">
            Reset
          </button>
        </div>
      </form>
    </div>
  );
}
