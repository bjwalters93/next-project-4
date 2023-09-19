import { NextResponse } from "next/server";
import getTransactionsForMY from "@/utils/getTransactionsForMY";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const month = searchParams.get("month");
  const year = searchParams.get("year");
  const monthlyTransactions = await getTransactionsForMY(month, year);
  return NextResponse.json(monthlyTransactions);
}
