import { NextResponse } from "next/server";
// import getWeeklyTransactions from "@/utils/getWeeklyTransactions";
// import getMonthlyTransactions from "@/utils/getMonthlyTransactions";
// import getYearlyTransactions from "@/utils/getYearlyTransactions";
import getTransactionsForWeek from "@/utils/getTransactionsForWeek";
import getTransactionsForMY from "@/utils/getTransactionsForMY";
import getTransactionsForYear from "@/utils/getTransactionsForYear";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const option = searchParams.get("option");
    const week = searchParams.get("week");
    const month = searchParams.get("month");
    const year = searchParams.get("year");
    if (option === "week" && week) {
      const weeklyTransactions = await getTransactionsForWeek(
        JSON.parse(week as string)
      );
      return NextResponse.json(weeklyTransactions);
    } else if (option === "month") {
      const monthlyTransactions = await getTransactionsForMY(month, year);
      return NextResponse.json(monthlyTransactions);
    } else if (option === "year") {
      const yearlyTransactions = await getTransactionsForYear(year);
      return NextResponse.json(yearlyTransactions);
    }
  } catch (e) {
    console.error(e);
    return NextResponse.json(e);
  }
}
