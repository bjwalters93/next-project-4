import { useState, useEffect } from "react";

type Args = {
  radio: string;
  week: null | string;
  month: null | string;
  year: null | string;
};

export default function useCustomFetch(args: Args) {
  const [data, setData] = useState(null);
  const [isLoading, setLoading] = useState(true);
  const [isError, setError] = useState(null);

  useEffect(() => {
    fetch(
      `/api/fetchTransactions?option=${args.radio}&week=${args.week}&month=${args.month}&year=${args.year}`
    )
      .then((res) => res.json())
      .then((data) => {
        setData(data);
        setLoading(false);
      })
      .catch((e) => setError(e));
  }, [args.radio, args.week, args.month, args.year]);

  return {
    transactions: data ? data : [],
    isLoading: isLoading ? true : false,
    isError: isError ? true : false,
  };
}
