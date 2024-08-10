import GoogleProvider from "next-auth/providers/google";
import { NextAuthOptions } from "next-auth";
import prisma from "../db/db";

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
  ],
  callbacks: {
    async signIn({ user, account }) {
      if (account?.provider === "google") {
        const existingUser = await prisma.user.findUnique({
          where: {
            email: user.email ?? undefined,
          },
        });
        if (!existingUser) {
          await prisma.user.create({
            data: {
              email: user.email,
            },
          });
        } else {
          user.id = existingUser.id;
          user.isVerified = existingUser.isVerified;
          user.leetCodeUsername = existingUser.leetCodeUsername || "";
          user.image = existingUser.image || "";
        }
      }
      return true;
    },
    async jwt({ token, user, account, trigger, session }) {
      if (trigger === "update") {
        return { ...token, ...session.user };
      }
      if (account && user) {
        token.id = user.id;
        token.accessToken = account.access_token;
        token.isVerified = user.isVerified;
        token.leetCodeUsername = user.leetCodeUsername;
        token.image = user.image;
      }
      return token;
    },
    //TODO: give the correct types
    // async session({ session, token }: { session: Session; token: JWT }) { TODO: remove duplication
    async session({ session, token }: { session: any; token: any }) {
      session.user.id = token.id;
      session.accessToken = token.accessToken;
      session.user.isVerified = token.isVerified;
      session.user.leetCodeUsername = token.leetCodeUsername;
      session.user.image = token.image;
      return session;
    },
  },
  session: {
    strategy: "jwt",
  },
};
