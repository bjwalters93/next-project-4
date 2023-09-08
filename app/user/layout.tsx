import UserSignOut from "@/components/UserSignOut";
import { getSessionStatus } from "@/utils/getSessionStatus";
import { Session } from "next-auth";
import getTheme from "@/utils/getTheme";

export default async function UserPageLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const sessionData = getSessionStatus();
  const themeData = getTheme();

  const [userData, settings] = (await Promise.all([
    sessionData,
    themeData,
  ])) as [Session, { theme: string } | null];

  delete userData.user.userId;

  return (
    <div
      data-theme={settings ? settings.theme : "corporate"}
      className="min-h-screen"
    >
      <UserSignOut
        user={userData.user}
        theme={settings ? settings.theme : "corporate"}
      />
      {children}
    </div>
  );
}
