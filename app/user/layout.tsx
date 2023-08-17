import UserSignOut from "@/components/UserSignOut";
import { getSessionStatus } from "@/utils/getSessionStatus";

export default async function UserPageLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getSessionStatus();
  console.log("testing:", session);
  return (
    <div>
      <UserSignOut session={session} />
      {children}
    </div>
  );
}
