"use client";

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
  searchResults: any;
  isLoading: boolean;
};

export default function SearchResultsTable({
  searchResults,
  isLoading,
}: Props) {
  const searchList: JSX.Element[] = [];

  if (searchResults) {
    searchResults.forEach((el: Income | Expense, i: number) => {
      const formatDate = new Date(el.date).toDateString();
      searchList.push(
        <tr key={el.transactionCode}>
          <th>{i + 1}</th>
          <td>{el.transactionCode}</td>
          <td>{el.type}</td>
          {"source" in el && <td>{el.source}</td>}
          {"category" in el && <td>{el.category}</td>}
          <td>{el.amount}</td>
          <td>{formatDate}</td>
          <td>{el.notes}</td>
        </tr>
      );
    });
  }

  return (
    <div className="mt-5">
      {isLoading && <span className="loading loading-bars loading-sm"></span>}
      {!isLoading && (
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
              </tr>
            </thead>
            <tbody>
              {searchList.length === 0 && !isLoading && (
                <tr>
                  <td>No transactions to display.</td>
                </tr>
              )}
              {searchList.length > 0 && !isLoading && searchList}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
