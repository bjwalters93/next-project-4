import { NextResponse } from "next/server";
import getWeeklyTransactions from "@/utils/getWeeklyTransactions";
import getMonthlyTransactions from "@/utils/getMonthlyTransactions";
import getYearlyTransactions from "@/utils/getYearlyTransactions";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const type = searchParams.get("type");
    if (type === "week") {
      const weeklyTransactions = await getWeeklyTransactions();
      return NextResponse.json(weeklyTransactions);
    } else if (type === "month") {
      const monthlyTransactions = await getMonthlyTransactions();
      return NextResponse.json(monthlyTransactions);
    } else if (type === "year") {
      const yearlyTransactions = await getYearlyTransactions();
      return NextResponse.json(yearlyTransactions);
    }
  } catch (e) {
    console.error(e);
    return NextResponse.json(e);
  }
}