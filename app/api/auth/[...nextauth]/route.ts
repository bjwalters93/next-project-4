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
    async signIn({ account, profile }) {
      console.log("profile:", profile);
      return true;
    },
  },
  adapter: MongoDBAdapter(clientPromise, {
    databaseName: "omega-fox",
  }) as any,
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
