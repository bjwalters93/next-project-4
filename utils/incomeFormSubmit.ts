"use server";

import { revalidatePath } from "next/cache";

// Start here ---> https://nextjs.org/docs/app/building-your-application/data-fetching/forms-and-mutations
// explains server actions.

export default async function incomeFormSubmit(formData: FormData) {
  "use server";
  // event.preventDefault();
  // const form = event.target as HTMLFormElement;
  const data = {
    source: formData.get("source"),
    amount: formData.get("amount"),
    date: formData.get("date"),
    notes: formData.get("notes"),
  };
  const response = await fetch("http://localhost:3000/api/addIncome", {
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
    },
    method: "POST",
  });
  const result = await response.json();
  console.log("result:", result);
  revalidatePath("/user");
}
