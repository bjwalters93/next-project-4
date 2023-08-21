"use client";

// import Link from "next/link";
import { FormEvent } from "react";
import { useRouter } from "next/navigation";

export default function FormTest() {
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
    <div className="border mb-10">
      <h1 className="font-semibold mb-[10px] text-2xl">Form</h1>

      <form onSubmit={handleSubmit}>
        <label
          className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
          htmlFor="first"
        >
          First Name
        </label>
        <input
          className="appearance-none block bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
          type="text"
          id="first"
          name="first"
          required
        />
        <label
          className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
          htmlFor="last"
        >
          Last Name
        </label>
        <input
          className="appearance-none block bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
          type="text"
          id="last"
          name="last"
          required
        />
        <label
          className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
          htmlFor="email"
        >
          Email
        </label>
        <input
          className="appearance-none block bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
          type="email"
          id="email"
          name="email"
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
