import useSWR from "swr";

const fetcher = (args: string) => fetch(args).then((res) => res.json());

export default function useCustomFetch(type: string) {
  const { data, error, isLoading } = useSWR(
    `/api/fetchTransactions?type=${type}`,
    fetcher
  );

  return {
    transactions: data,
    isLoading,
    isError: error,
  };
}
