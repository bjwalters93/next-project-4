"use client";

import { FormEvent } from "react";
import { useRouter } from "next/navigation";

export default function TransactionHistoryUI() {
  const router = useRouter();
  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    const form = event.target as HTMLFormElement;
    const data = {
      first: form.first.value as string,
      last: form.last.value as string,
      email: form.email.value as string,
    };
    const response = await fetch("http://localhost:3000/api/postUserForm", {
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
    });
    // interesting reminder - JSON is a string that represents a javascript object. The .json() method
    // parses the string and returns an actual javascript object. This is why in the fetch request body(above)
    // you need to STRINGIFY the object(converts object to JSON).
    const result = await response.json();
    router.refresh();
    console.log("result:", result);
    alert(
      `Is this the correct entry?: ${result.res.first} ${result.res.last} ${result.res.email}`
    );
  };
  return (
    <div>
      <h2 className="font-bold">Transaction History:</h2>

      <form action="/action_page.php">
        <input
          type="radio"
          id="html"
          name="fav_language"
          value="HTML"
          checked
        />
        <label htmlFor="html">Monthly</label>
        <input type="radio" id="css" name="fav_language" value="CSS" />
        <label htmlFor="css">Yearly</label>
        {/* <input type="submit" value="Submit" /> */}
      </form>
      <form onSubmit={handleSubmit}>
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
        {/* <button
          className="shadow bg-indigo-700 hover:bg-indigo-600 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded"
          type="submit"
        >
          Submit
        </button> */}
      </form>
      <ul className="ml-10">
        <li className="bg-red-200 font-semibold">
          01/01/2023 -$30.24 *Groceries
        </li>
        <li className="bg-green-200 font-semibold">
          01/02/2023 +$300.64 *Paycheck
        </li>
      </ul>
    </div>
  );
}
