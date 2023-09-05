import useCustomFetchSWR from "@/custom_hooks/useCustomFetchSWR";

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

type Args = {
  args: {
    radio: string;
    week: string | null;
    month: string | null;
    year: string | null;
  };
};

export default function TransactionsTable({ args }: Args) {
  const { transactions, isLoading, isError } = useCustomFetchSWR(args);

  if (isError) {
    console.log(isError);
    throw new Error(
      "Unable to fetch data. useCustomFetch() rh: api/fetchTransactions"
    );
  }
  const transactionList: JSX.Element[] = [];

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
            <button className="btn btn-xs">Remove</button>
          </th>
        </tr>
      );
    });
  }

  return (
    <div>
      {isLoading && <span className="loading loading-bars loading-sm"></span>}
      {/* {transactionList.length === 0 && !isLoading && (
        <p>No transactions to display.</p>
      )}
      {transactionList.length > 0 && !isLoading && <ul>{transactionList}</ul>} */}
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
            {transactionList.length === 0 && !isLoading && (
              <tr>
                <td>No transactions to display.</td>
              </tr>
            )}
            {transactionList.length > 0 && !isLoading && transactionList}
          </tbody>
        </table>
      </div>
    </div>
  );
}
