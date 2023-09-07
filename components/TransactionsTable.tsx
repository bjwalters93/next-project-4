"use client";

import { useRouter } from "next/navigation";

type Income = {
  type: string;
  source: string;
  amount: string;
  date: string;
  notes: string;
  transactionCode: string;
};

type Expense = {
  type: string;
  category: string;
  amount: string;
  date: string;
  notes: string;
  transactionCode: string;
};

type Props = {
  transactions: any;
  isLoading: boolean;
  isError: any;
  isValidating: boolean;
  mutate: any;
};

export default function TransactionsTable({
  transactions,
  isLoading,
  isError,
  isValidating,
  mutate,
}: Props) {
  const router = useRouter();
  if (isError) {
    console.log(isError);
    throw new Error(
      "Unable to fetch data. useCustomFetch() rh: api/fetchTransactions"
    );
  }

  const transactionList: JSX.Element[] = [];

  function deleteDoc(transactionCode: string) {
    return fetch(`http://localhost:3000/api/deleteDoc?code=${transactionCode}`);
  }

  if (transactions) {
    transactions.forEach((el: Income | Expense, i: number) => {
      const formatDate = new Date(el.date).toDateString();
      transactionList.push(
        <tr key={el.transactionCode}>
          <th>{i + 1}</th>
          <td>{el.transactionCode}</td>
          <td>{el.type}</td>
          {"source" in el && <td>{el.source}</td>}
          {"category" in el && <td>{el.category}</td>}
          <td>{el.amount}</td>
          <td>{formatDate}</td>
          <td>{el.notes}</td>
          <th>
            <button
              className="btn btn-xs"
              onClick={async () => {
                await deleteDoc(el.transactionCode);
                mutate();
                router.refresh();
              }}
            >
              Remove
            </button>
          </th>
        </tr>
      );
    });
  }

  return (
    <div>
      {isLoading ||
        (isValidating && (
          <span className="loading loading-bars loading-sm"></span>
        ))}
      <div className="overflow-x-auto">
        <table className="table table-xs">
          <thead>
            <tr>
              <th></th>
              <th>Transaction Code</th>
              <th>Type</th>
              <th>Source/Category</th>
              <th>Amount</th>
              <th>Date</th>
              <th>Notes</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {transactionList.length === 0 && !isLoading && !isValidating && (
              <tr>
                <td>No transactions to display.</td>
              </tr>
            )}
            {transactionList.length > 0 &&
              !isLoading &&
              !isValidating &&
              transactionList}
          </tbody>
        </table>
      </div>
    </div>
  );
}
