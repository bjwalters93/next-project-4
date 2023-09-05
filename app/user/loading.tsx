export default function Loading() {
  // You can add any UI inside Loading, including a Skeleton.
  return (
    <div className="flex items-center">
      <span className="loading loading-ring loading-xs"></span>
      <span className="loading loading-ring loading-sm"></span>
      <span className="loading loading-ring loading-md"></span>
      <span className="loading loading-ring loading-lg"></span>
    </div>
  );
}
