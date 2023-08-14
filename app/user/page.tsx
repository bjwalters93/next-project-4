import UserSignOut from "@/components/UserSignOut";
import FormTest from "@/components/FormTest";
import { headers } from "next/headers";

async function getUserData() {
  const res = await fetch("http://localhost:3000/api/getUserData", {
    method: "GET",
    headers: headers(),
  });
  // The return value is *not* serialized
  // You can return Date, Map, Set, etc.
  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error("Failed to fetch data");
  }

  return res.json();
}

export default async function UserRootPage() {
  const userData = await getUserData();
  console.log("userData:", userData);
  return (
    <div>
      <h1>User Root Page</h1>
      <UserSignOut />
      <FormTest />
      <ul>
        <li>{userData.user.firstName}</li>
        <li>{userData.user.lastName}</li>
        <li>{userData.user.email}</li>
      </ul>
    </div>
  );
}
