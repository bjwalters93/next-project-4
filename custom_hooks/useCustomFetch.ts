import useSWR from "swr";

const fetcher = (args: string) => fetch(args).then((res) => res.json());

type Args = {
  radio: string;
  week: null | string;
  month: null | string;
  year: null | string;
};

export default function useCustomFetch(args: Args) {
  const { data, error, isLoading } = useSWR(
    `/api/fetchTransactions?option=${args.radio}&week=${args.week}&month=${args.month}&year=${args.year}`,
    fetcher
  );

  return {
    transactions: data,
    isLoading,
    isError: error,
  };
}
