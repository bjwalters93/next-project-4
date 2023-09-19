import useSWR from "swr";

const fetcher = (url: string) =>
  fetch(url).then((res) => {
    return res.json();
  });

type Args = {
  radio: string;
  week: null | string;
  month: null | string;
  year_m: null | string;
  year_y: null | string;
};

export default function useCustomFetchSWR(args: Args) {
  const { data, error, isLoading, isValidating, mutate } = useSWR(
    `/api/fetchTransactions?option=${args.radio}&week=${args.week}&month=${args.month}&year_m=${args.year_m}&year_y=${args.year_y}`,
    fetcher
  );
  return {
    transactions: data,
    isLoading,
    isError: error,
    isValidating,
    mutate,
  };
}
