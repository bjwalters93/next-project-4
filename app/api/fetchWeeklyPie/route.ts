import { NextResponse } from "next/server";
import getTransactionsForWeek from "@/utils/getTransactionsForWeek";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const week = searchParams.get("week");
    const weeklyTransactions = await getTransactionsForWeek(
      JSON.parse(week as string)
    );
    return NextResponse.json(weeklyTransactions);
  } catch (e) {
    console.error(e);
    return NextResponse.json(e);
  }
}
