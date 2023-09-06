import UserSignOut from "@/components/UserSignOut";
import { getSessionStatus } from "@/utils/getSessionStatus";
import { Session } from "next-auth";
import getTheme from "@/utils/getTheme";

export default async function UserPageLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user: userData } = (await getSessionStatus()) as Session;
  const themeData = await getTheme();

  const [user, settings] = await Promise.all([userData, themeData]);
  console.log("user:LO:", user);
  console.log("settings:LO:", settings);

  delete user.userId;

  return (
    <div data-theme={settings ? settings.theme : "corporate"}>
      <UserSignOut user={user} />
      {children}
    </div>
  );
}
