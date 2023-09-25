"use client";

import { FormEvent } from "react";
import { useState } from "react";
import SearchResultsTable from "./SearchResultsTable";

export default function SearchNotesUI() {
  const [searchResults, setSearchResults] = useState([]);
  const [isError, setIsError] = useState(false);
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    setIsLoading(true);
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
    const { results, isError, message } = await response.json();
    setSearchResults(results);
    setIsError(isError);
    setMessage(message);
    setIsLoading(false);
  };
  if (isError) {
    throw new Error(message);
  }
  return (
    <div className="mt-2">
      <h2 className="font-bold text-2xl mb-2">Search Notes:</h2>
      <form onSubmit={handleSubmit} className="flex items-end">
        <div className="form-control w-full max-w-xs">
          <label className="label">
            <span className="label-text">Search</span>
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
          <button
            className="btn btn-warning btn-sm ml-2"
            type="reset"
            onClick={() => setSearchResults([])}
          >
            Reset
          </button>
        </div>
      </form>
      <SearchResultsTable searchResults={searchResults} isLoading={isLoading} />
    </div>
  );
}
