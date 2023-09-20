import useSWR from "swr";

const fetcher = (url: string) =>
  fetch(url).then((res) => {
    return res.json();
  });

export default function useFetchMonthlyPie(
  month: string | null,
  year: string | null
) {
  const { data, error, isLoading, isValidating, mutate } = useSWR(
    `/api/fetchMonthlyPie?month=${month}&year=${year}`,
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
