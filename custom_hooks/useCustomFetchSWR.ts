import useSWR from "swr";
// import { useSWRConfig } from "swr";

const fetcher = (url: string) =>
  fetch(url).then((res) => {
    return res.json();
  });

type Args = {
  radio: string;
  week: null | string;
  month: null | string;
  year: null | string;
};

export default function useCustomFetchSWR(args: Args) {
  //   const { mutate } = useSWRConfig();
  const { data, error, isLoading } = useSWR(
    `/api/fetchTransactions?option=${args.radio}&week=${args.week}&month=${args.month}&year=${args.year}`,
    fetcher
    // { refreshInterval: 1000 }
  );
  //   mutate(
  //     `/api/fetchTransactions?option=${args.radio}&week=${args.week}&month=${args.month}&year=${args.year}`
  //   );
  return {
    transactions: data,
    isLoading,
    isError: error,
  };
}
