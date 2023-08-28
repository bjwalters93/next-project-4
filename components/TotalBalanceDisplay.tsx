import getAllTransactions from "@/utils/getAllTransactions";
import getWeeklyTransactions from "@/utils/getWeeklyTransactions";
import getEarnings from "@/utils/getEarnings";

export default async function TotalBalanceDisplay() {
  //   const transactions = await getAllTransactions();
  const transactions = await getWeeklyTransactions();
  const earnings = getEarnings(transactions);

  console.log("earnings:", earnings);
  return (
    <div className="border">
      <h2 className="font-semibold">Total Balance</h2>
      <p>This weeks earnings: ${earnings}</p>
      <p>This months earnings: $1000.00</p>
      <p>This years earnings: $10000.00</p>
    </div>
  );
}
