"use client";

import { FormEvent } from "react";
import { useState } from "react";

export default function SearchNotesUI() {
  const [searchResults, setSearchResults] = useState([]);
  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    const form = event.target as HTMLFormElement;
    const data = {
      search: form.search.value,
    };
    const response = await fetch("http://localhost:3000/api/searchNotes", {
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
    });
    const result = await response.json();
    setSearchResults(result);
    console.log("result ->", result);
  };
  return (
    <div className="mt-2">
      <h2 className="font-bold text-2xl mb-2">Search Notes:</h2>
      <p>Search notes UI</p>
      <form onSubmit={handleSubmit} className="flex items-end">
        <div className="form-control w-full max-w-xs">
          <label className="label">
            <span className="label-text">Keyword</span>
          </label>
          <input
            className="input input-bordered input-primary input-sm w-full max-w-xs"
            type="text"
            id="search"
            name="search"
            required
          />
        </div>
        <div className="">
          <button className="btn btn-primary btn-sm ml-2" type="submit">
            Search
          </button>
          <button className="btn btn-warning btn-sm ml-2" type="reset">
            Reset
          </button>
        </div>
      </form>
      {searchResults.length > 0 && (
        <ul>
          {searchResults.map((el: any, i) => {
            return (
              <li key={i}>
                {el.userId} | {el.type} | {el.notes} | {el.amount}
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
