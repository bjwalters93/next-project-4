import { NextResponse } from "next/server";
import getTransactionsForWeek from "@/utils/getTransactionsForWeek";
import getTransactionsForMY from "@/utils/getTransactionsForMY";
import getTransactionsForYear from "@/utils/getTransactionsForYear";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const option = searchParams.get("option");
  const week = searchParams.get("week");
  const month = searchParams.get("month");
  const year_m = searchParams.get("year_m");
  const year_y = searchParams.get("year_y");
  if (option === "week" && week) {
    const weeklyTransactions = await getTransactionsForWeek(
      JSON.parse(week as string)
    );
    return NextResponse.json(weeklyTransactions);
  } else if (option === "month") {
    const monthlyTransactions = await getTransactionsForMY(month, year_m);
    return NextResponse.json(monthlyTransactions);
  } else if (option === "year") {
    const yearlyTransactions = await getTransactionsForYear(year_y);
    return NextResponse.json(yearlyTransactions);
  }
}
