"use client";

import { FormEvent } from "react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import useCustomFetch from "@/custom_hooks/useCustomFetch";

// BUG!!! There is a bug when using radio buttons with next js.
// You can read more here. https://github.com/vercel/next.js/issues/49499
// Reading the comments you will find that removing the name attribute solves the issue. The name attribute is used to group
// radio buttons, this allows only one to be selected at a time. This isn't necessary when controlling the component with
// state. If you control the checked attribute with state(like what's happening below), only one can be checked anyway.

export default function TransactionHistoryUI() {
  const [radio, setRadio] = useState("week");

  const { transactions, isLoading, isError } = useCustomFetch(radio);
  console.log("usedCustomFetch:", transactions);
  console.log("isLoading:", isLoading);
  console.log("isError:", isError);

  //   Fix types below. Using any is unacceptable.
  const transactionList: any = [];

  if (transactions) {
    transactions.forEach((el: any) => {
      transactionList.push(<li>{el.date}</li>);
    });
  }

  console.log("transactionList:", transactionList);

  function onOptionChange(event: React.ChangeEvent<HTMLInputElement>) {
    setRadio(event.target.value);
  }

  return (
    <div>
      <h2 className="font-bold">Transaction History:</h2>
      <form>
        <input
          type="radio"
          id="weekly"
          value="week"
          checked={radio === "week"}
          onChange={onOptionChange}
        />
        <label htmlFor="weekly">This week</label>
        <input
          type="radio"
          id="monthly"
          value="month"
          checked={radio === "month"}
          onChange={onOptionChange}
        />
        <label htmlFor="monthly">Monthly</label>
        <input
          type="radio"
          id="yearly"
          value="year"
          checked={radio === "year"}
          onChange={onOptionChange}
        />
        <label htmlFor="yearly">Yearly</label>
      </form>
      {/* {isLoading ? (
        <p>Loading transactions...</p>
      ) : transactionList.length === 0 ? (
        <p>No transactions to display.</p>
      ) : (
        <ul>{transactionList}</ul>
      )} */}
      {isLoading && <p>Loading transactions...</p>}
      {transactionList.length === 0 && !isLoading && (
        <p>No transactions to display.</p>
      )}
      {transactionList.length > 0 && !isLoading && <ul>{transactionList}</ul>}
    </div>
  );
}
//   const router = useRouter();
//   const handleSubmit = async (event: FormEvent) => {
//     event.preventDefault();
//     const form = event.target as HTMLFormElement;
//     const data = {
//       first: form.first.value as string,
//       last: form.last.value as string,
//       email: form.email.value as string,
//     };
//     const response = await fetch("http://localhost:3000/api/postUserForm", {
//       body: JSON.stringify(data),
//       headers: {
//         "Content-Type": "application/json",
//       },
//       method: "POST",
//     });
//     const result = await response.json();
//     router.refresh();
//     console.log("result:", result);
//     alert(
//       `Is this the correct entry?: ${result.res.first} ${result.res.last} ${result.res.email}`
//     );
//   };

{
  /* <form onSubmit={handleSubmit}>
        <label htmlFor="cars">Choose a month:</label>
        <select className="border border-black" id="cars" name="cars">
          <option value="currentMonth">Current</option>
          <option value="Jan">January</option>
          <option value="Feb">February</option>
          <option value="March">March</option>
          <option value="April">April</option>
        </select>
        <label htmlFor="cars">Choose a year:</label>
        <select className="border border-black" id="cars" name="cars">
          <option value="currentYear">Current</option>
          <option value="Jan">January</option>
          <option value="Feb">February</option>
          <option value="March">March</option>
          <option value="April">April</option>
        </select>
        <button
          className="shadow bg-indigo-700 hover:bg-indigo-600 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded"
          type="submit"
        >
          Submit
        </button>
      </form> */
}
{
  /* <ul className="ml-10">
        <li className="bg-red-200 font-semibold">
          01/01/2023 -$30.24 *Groceries
        </li>
        <li className="bg-green-200 font-semibold">
          01/02/2023 +$300.64 *Paycheck
        </li>
      </ul> */
}
