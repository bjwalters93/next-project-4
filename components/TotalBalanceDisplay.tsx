import clientPromise from "@/lib/mongodb";

// db.student.find({
//   FeeSubmission: {
//     $gt: ISODate("2020-09-15T04:07:05.000Z"),
//     $lt: ISODate("2023-02-09T03:12:15.012Z"),
//   },
// });

async function getUserData() {
  try {
    const client = await clientPromise;
    const database = client.db("user_data");
    const addIncomeTransactions = database.collection("user_transactions");
    const query = {
      addIncome: {
        $gt: ISODate(),
        $lt: ISODate(),
      },
    };
    const cursor = addIncomeTransactions.find();
    if ((await addIncomeTransactions.countDocuments(query)) === 0) {
      console.warn("No documents found!");
    }
    for await (const doc of cursor) {
      console.dir(doc);
    }
  } catch {
    throw new Error("Unable to retrieve transactions for current week.");
  }
}

export default function TotalBalanceDisplay() {
  return (
    <div className="border">
      <h2 className="font-semibold">Total Balance</h2>
      <p>This weeks earnings: $100.00</p>
      <p>This months earnings: $1000.00</p>
      <p>This years earnings: $10000.00</p>
    </div>
  );
}
