import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { fauna, q } from "@instances/fauna";

export default NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code",
        },
      },
    }),
  ],
  secret: process.env.JWT_SECRET,
  callbacks: {
    async session({ session, token }) {
      return session;
    },

    async signIn({ user }) {
      const { email } = user;

      try {
        await fauna.query<any>(
          q.Get(q.Match(q.Index("user_by_email"), q.Casefold(email)))
        );

        return true;
      } catch (error) {
        console.error(error);
        return false;
      }
    },
  },
});
