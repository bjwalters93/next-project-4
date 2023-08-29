import getAllTransactions from "@/utils/getAllTransactions";
import getWeeklyTransactions from "@/utils/getWeeklyTransactions";
import getMonthlyTransactions from "@/utils/getMonthlyTransactions";
import getYearlyTransactions from "@/utils/getYearlyTransactions";
import getEarnings from "@/utils/getEarnings";
import getTransactionsByMY from "@/utils/getTransactionsByMY";

export default async function TotalBalanceDisplay() {
  //   const transactions = await getAllTransactions();
  const weeklyTransactions = await getWeeklyTransactions();
  const monthlyTransactions = await getMonthlyTransactions();
  const yearlyTransactions = await getYearlyTransactions();
  const weeklyEarnings = getEarnings(weeklyTransactions);
  const monthlyEarnings = getEarnings(monthlyTransactions);
  const yearlyEarnings = getEarnings(yearlyTransactions);

  const testMYTransactions = await getTransactionsByMY();
  console.log("test:", testMYTransactions);
  return (
    <div className="border">
      <h2 className="font-semibold">Total Balance</h2>
      <p>This weeks earnings: ${weeklyEarnings}</p>
      <p>This months earnings: ${monthlyEarnings}</p>
      <p>This years earnings: ${yearlyEarnings}</p>
    </div>
  );
}
