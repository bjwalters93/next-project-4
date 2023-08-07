import { withAuth } from "next-auth/middleware";
import { getServerSession } from "next-auth/next";
import { authOptions } from "./app/api/auth/[...nextauth]/route";

// More on how NextAuth.js middleware works: https://next-auth.js.org/configuration/nextjs#middleware
// export default withAuth({
//   callbacks: {
//     authorized({ req, token }) {
//       // `/admin` requires admin role
//       if (req.nextUrl.pathname === "/admin-page") {
//         return token?.userRole === "admin";
//       }
//       // `/me` only requires the user to be logged in
//       return !!token;
//     },
//   },
// });

export default withAuth(
  function middleware(req) {
    console.log(req.nextauth.token);
  },
  {
    callbacks: {
      authorized: ({ token }) => {
        console.log("token", token);
        // async function myFunc() {
        //   const session = await getServerSession(authOptions);
        //   console.log(session);
        // }
        // myFunc();
        return token?.userRole === "admin";
      },
    },
  }
);

// important!!! -changed token?.user to token?.userRole for this to work.

export const config = { matcher: ["/admin-page", "/me"] };
