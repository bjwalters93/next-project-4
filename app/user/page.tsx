import UserSignOut from "@/components/UserSignOut";
import FormTest from "@/components/FormTest";

async function getData() {
  const res = await fetch("http://localhost:3000/api/getDataTest");
  // The return value is *not* serialized
  // You can return Date, Map, Set, etc.
  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error("Failed to fetch data");
  }

  return res.json();
}

export default async function UserRootPage() {
  const data = await getData();
  console.log("data:", data);
  return (
    <div>
      <h1>User Root Page</h1>
      <UserSignOut />
      <FormTest />
      <ul>
        <li>{data.person.firstName}</li>
        <li>{data.person.lastName}</li>
        <li>{data.person.age}</li>
        <li>{data.person.birthday}</li>
        <li>{data.person.gender}</li>
        <li>{data.person.height}</li>
        <li>{data.person.weight}</li>
        <li>{data.person.hobbies}</li>
      </ul>
    </div>
  );
}
