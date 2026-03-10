import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions: NextAuthOptions = {

  providers: [
    CredentialsProvider({
      name: "Admin Login",

      credentials: {
        email: {},
        password: {},
      },

      async authorize(credentials) {

        if (
          credentials?.email === "admin@crimetak.com" &&
          credentials?.password === "123456"
        ) {
          return {
            id: "1",
            name: "Admin",
            email: "admin@crimetak.com",
          };
        }

        return null;
      },
    }),
  ],

  session: {
    strategy: "jwt",
  },

  pages: {
    signIn: "/admin/login",
  },

  secret: process.env.NEXTAUTH_SECRET,
};