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
      "Unable to fetch data. TransactionsTable rh: api/fetchTransactions"
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
              className="btn btn-error btn-outline btn-circle btn-sm"
              onClick={async () => {
                await deleteDoc(el.transactionCode);
                mutate();
                router.refresh();
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="icon icon-tabler icon-tabler-trash"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                strokeWidth="2"
                stroke="currentColor"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                <path d="M4 7l16 0"></path>
                <path d="M10 11l0 6"></path>
                <path d="M14 11l0 6"></path>
                <path d="M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2 -2l1 -12"></path>
                <path d="M9 7v-3a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v3"></path>
              </svg>
            </button>
          </th>
        </tr>
      );
    });
  }

  return (
    <div className="mt-5">
      {isLoading ||
        (isValidating && (
          <span className="loading loading-bars loading-sm"></span>
        ))}
      {!isLoading && !isValidating && (
        <div className="overflow-x-auto">
          <table className="table table-xs">
            <thead>
              <tr className="bg-base-200">
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
      )}
    </div>
  );
}
