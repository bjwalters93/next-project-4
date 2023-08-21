export default function MontlyPieUI() {
  return (
    <div>
      <h2 className="font-bold">Monthly Pie UI</h2>
      <form>
        <label htmlFor="cars">Choose a month:</label>
        <select className="border border-black" id="cars" name="cars">
          <option value="currentMonth">Current</option>
          <option value="Jan">January</option>
          <option value="Feb">February</option>
          <option value="March">March</option>
          <option value="April">April</option>
        </select>
      </form>
      <p>$1221.21 | 50% | Groceries</p>
      <p>$502.46 | 40% | Rent</p>
      <p>$60.79 | 10% | Gas</p>
    </div>
  );
}
