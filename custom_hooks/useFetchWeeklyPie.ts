import useSWR from "swr";

const fetcher = (url: string) =>
  fetch(url).then((res) => {
    return res.json();
  });

export default function useCustomFetchSWR(week: string | null) {
  const { data, error, isLoading, isValidating, mutate } = useSWR(
    `/api/fetchWeeklyPie?week=${week}`,
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
