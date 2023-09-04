type Transactions = {
  type: string;
  category: string;
  amount: string;
  date: string;
  notes: string;
  transactionCode: string;
}[];

export default function getExpenses(transactions: Transactions) {
  let sum: number = 0;
  for (let i = 0; i < transactions.length; i++) {
    sum += Number(transactions[i].amount);
  }
  return sum;
}
