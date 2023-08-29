type Transactions = {
  type: string;
  source: string;
  amount: string;
  date: string;
  notes: string;
  transactionCode: string;
}[];

export default function getEarnings(transactions: Transactions) {
  let sum: number = 0;
  for (let i = 0; i < transactions.length; i++) {
    sum += Number(transactions[i].amount);
  }
  return sum;
}
