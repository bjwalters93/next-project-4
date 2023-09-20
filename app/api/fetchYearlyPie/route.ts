import { NextResponse } from "next/server";
import getTransactionsForYear from "@/utils/getTransactionsForYear";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const year = searchParams.get("year");
  const yearlyTransactions = await getTransactionsForYear(year);
  return NextResponse.json(yearlyTransactions);
}
