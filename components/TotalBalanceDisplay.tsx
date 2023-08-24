import getAllEarnings from "@/utils/getAllEarnings";
import getWeeklyEarnings from "@/utils/getWeeklyEarnings";

export default async function TotalBalanceDisplay() {
  //   const earnings = await getAllEarnings();
  const earnings = await getWeeklyEarnings();
  console.log("earnings:", earnings);
  return (
    <div className="border">
      <h2 className="font-semibold">Total Balance</h2>
      <p>This weeks earnings: $100.00</p>
      <p>This months earnings: $1000.00</p>
      <p>This years earnings: $10000.00</p>
    </div>
  );
}
