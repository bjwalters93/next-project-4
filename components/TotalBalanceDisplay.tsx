import getAllTransactions from "@/utils/getAllTransactions";
import getWeeklyTransactions from "@/utils/getWeeklyTransactions";
import getMonthlyTransactions from "@/utils/getMonthlyTransactions";
import getEarnings from "@/utils/getEarnings";

export default async function TotalBalanceDisplay() {
  //   const transactions = await getAllTransactions();
  const weeklyTransactions = await getWeeklyTransactions();
  const monthlyTransactions = await getMonthlyTransactions();
  const weeklyEarnings = getEarnings(weeklyTransactions);
  const monthlyEarnings = getEarnings(monthlyTransactions);

  console.log("weeklyEarnings:", weeklyEarnings);
  console.log("monthlyEarnings:", monthlyEarnings);
  return (
    <div className="border">
      <h2 className="font-semibold">Total Balance</h2>
      <p>This weeks earnings: ${weeklyEarnings}</p>
      <p>This months earnings: ${monthlyEarnings}</p>
      <p>This years earnings: $10000.00</p>
    </div>
  );
}
