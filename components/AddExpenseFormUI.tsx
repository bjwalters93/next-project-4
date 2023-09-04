"use client";

import { FormEvent } from "react";
import { useRouter } from "next/navigation";

export default function AddExpenseFormUI() {
  const router = useRouter();
  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    const form = event.target as HTMLFormElement;
    const data = {
      category: form.category.value,
      amount: form.amount.value,
      date: form.date.value,
      notes: form.notes.value,
    };
    const response = await fetch("http://localhost:3000/api/addExpense", {
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
    });
    const result = await response.json();
    router.refresh();
    console.log("post addExpense:", result);
  };
  return (
    <div className="border mb-10">
      <h1 className="font-semibold mb-[10px] text-2xl">Add Expense</h1>

      <form onSubmit={handleSubmit}>
        <label
          className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
          htmlFor="category"
        >
          Category
        </label>
        <input
          className="appearance-none block bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
          type="text"
          id="category"
          name="category"
          required
        />
        <label
          className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
          htmlFor="amount"
        >
          Amount
        </label>
        <input
          className="appearance-none block bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
          type="number"
          id="amount"
          name="amount"
          required
        />
        <label
          className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
          htmlFor="date"
        >
          Date
        </label>
        <input
          className="appearance-none block bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
          type="date"
          id="date"
          name="date"
          required
        />
        <label
          className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
          htmlFor="notes"
        >
          Notes
        </label>
        <input
          className="appearance-none block bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
          type="text"
          id="notes"
          name="notes"
          required
        />
        <button
          className="shadow bg-indigo-700 hover:bg-indigo-600 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded"
          type="submit"
        >
          Submit
        </button>
      </form>
    </div>
  );
}
