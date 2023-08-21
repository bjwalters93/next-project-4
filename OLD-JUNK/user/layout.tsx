import UserSignOut from "@/components/UserSignOut";
import { getSessionStatus } from "@/utils/getSessionStatus";
import { Session } from "next-auth";
import { Suspense } from "react";

export default async function UserPageLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user } = (await getSessionStatus()) as Session;
  delete user.userId;
  return (
    <div>
      <UserSignOut user={user} />
      {children}
    </div>
  );
}
