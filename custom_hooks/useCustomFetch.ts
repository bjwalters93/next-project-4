import useSWR from "swr";

const fetcher = (args: string) => fetch(args).then((res) => res.json());

type Args = {
  radio: string;
  year: null | string;
  month: null | string;
};

export default function useCustomFetch(args: Args) {
  const { data, error, isLoading } = useSWR(
    `/api/fetchTransactions?option=${args.radio}&month=${args.month}&year=${args.year}`,
    fetcher
  );

  return {
    transactions: data,
    isLoading,
    isError: error,
  };
}
