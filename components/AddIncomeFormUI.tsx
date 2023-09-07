"use client";

import { FormEvent } from "react";
import { useRouter } from "next/navigation";

export default function AddIncomeFormUI({ mutate }: any) {
  const router = useRouter();
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
    router.refresh();
    console.log("post addIncome:", result);
  };
  return (
    <div className="mb-10">
      <h1 className="font-semibold mb-[10px] text-2xl">Add Income</h1>

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
            <span className="label-text">Amount</span>
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
        <button className="btn btn-primary btn-sm ml-2" type="submit">
          Submit
        </button>
      </form>
    </div>
  );
}
