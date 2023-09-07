import TransactionHistoryUI from "@/components/TransactionHistoryUI";
import AddIncomeFormUI from "@/components/AddIncomeFormUI";
import AddExpenseFormUI from "@/components/AddExpenseFormUI";

export default function ClientParent() {
  return (
    <div>
      <AddIncomeFormUI />
      <AddExpenseFormUI />
      <TransactionHistoryUI />
    </div>
  );
}
