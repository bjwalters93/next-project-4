import UserSignOut from "@/components/UserSignOut";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <UserSignOut />
      {children}
    </div>
  );
}
