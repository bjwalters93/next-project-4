import useSWR from "swr";

const fetcher = (args: string) => fetch(args).then((res) => res.json());

type Args = {
  radio: string;
  week: null | string;
  month: null | string;
  year: null | string;
};

// !!! Explains why the client component auto updates when data changes. Something you noticed but wasn't sure why. It looks like it's just
// something that Next.js does automatically.
// Client-side Fetching
// https://nextjs.org/docs/pages/building-your-application/data-fetching/client-side
// If done at the page level, the data is fetched at runtime, and the content of the page is updated as the data changes. When used at the component level,
// the data is fetched at the time of the component mount, and the content of the component is updated as the data changes.

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
