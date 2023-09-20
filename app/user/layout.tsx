import UserSignOut from "@/components/UserSignOut";
import { getSessionStatus } from "@/utils/getSessionStatus";
import { Session } from "next-auth";
import getTheme from "@/utils/getTheme";

export default async function UserPageLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = getSessionStatus();
  const themeData = getTheme();

  const [
    { session: userData, isError: sessionError, message: sessionMessage },
    { userTheme: settings, isError: themeError, message: themeMessage },
  ] = (await Promise.all([session, themeData])) as [
    {
      session?: null | Session;
      isError: boolean;
      message?: string;
    },
    (
      | {
          userTheme: {
            theme: string;
          } | null;
          isError: boolean;
          message: undefined;
        }
      | {
          userTheme: null;
          isError: boolean;
          message: any;
        }
    )
  ];

  if (userData === null || userData === undefined) {
    throw new Error("Session is expired.");
  }

  if (sessionError) {
    throw new Error(sessionMessage);
  }
  if (themeError) {
    throw new Error(themeMessage);
  }

  delete userData?.user.userId;

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
