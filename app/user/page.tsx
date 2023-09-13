import TotalIncomeDisplay from "@/components/TotalIncomeDisplay";
import TotalExpenseDisplay from "@/components/TotalExpenseDisplay";
import delayLoading from "@/utils/delayLoading";
import ClientParent from "@/components/ClientParent";

export const dynamic = "force-dynamic";

export default async function UserRootPage() {
  await delayLoading(2000);
  return (
    <div>
      <div className="flex fixed top-[72px] w-full bg-base-300 z-30 border-y-[1px] border-neutral p-2">
        <TotalIncomeDisplay />
        <TotalExpenseDisplay />
      </div>
      <ClientParent />
    </div>
  );
}
