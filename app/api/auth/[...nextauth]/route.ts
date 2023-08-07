import NextAuth, { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { MongoDBAdapter } from "@auth/mongodb-adapter";
import clientPromise from "../../../../lib/mongodb";

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
    }),
  ],
  callbacks: {
    async jwt({ token }) {
      token.userRole = "admin";
      return token;
    },
    // async signIn({ user, account, profile, email, credentials }) {
    //   console.log("user:", user);
    //   console.log("account:", account);
    //   console.log("profile:", profile);
    //   console.log("email:", email);
    //   console.log("credentials:", credentials);
    //   return true;
    // },
  },
  adapter: MongoDBAdapter(clientPromise, {
    databaseName: "echo-charlie-alpha",
  }) as any,
  // secret: process.env.NEXTAUTH_SECRET,
  //   session info = https://next-auth.js.org/configuration/options#session
  session: {
    strategy: "jwt",
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
