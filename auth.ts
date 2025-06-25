import NextAuth from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { prisma } from "@/prisma";
import GoogleProvider from "next-auth/providers/google";
import { getGoogleAccountByEmail } from "./features/auth/user-auth-session-model.server";
import { isAccessTokenExpired, refreshAndUpdateAccessToken } from "./features/auth/auth-helper.server";

export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter: PrismaAdapter(prisma),
  providers: [
    GoogleProvider({
      clientId: process.env.AUTH_GOOGLE_ID || "",
      clientSecret: process.env.AUTH_GOOGLE_SECRET || "",
      authorization: {
        params: {
          scope:
            "openid email profile https://www.googleapis.com/auth/gmail.compose https://www.googleapis.com/auth/gmail.send https://www.googleapis.com/auth/calendar.events.owned",
          access_type: "offline",
          prompt: "consent",
        },
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  callbacks: {
    //to allow only some kind of people to signin
    async signIn() {
      return true;
    },
    async jwt({ token, account }) {
      if (account) {
        token.accessToken = account.access_token;
        token.refreshToken = account.refresh_token;
        token.expiresAt = account.expires_at;

        //save token in the database here to keep them persistent
        await prisma.account.updateMany({
          where: {
            providerAccountId: account.providerAccountId,
          },
          data: {
            access_token: account.access_token,
            refresh_token: account.refresh_token,
            expires_at: account.expires_at,
          },
        });
      }

      return token;
    },
    async session({ session }) {
      const account = await getGoogleAccountByEmail(session.user.email ?? "");

      if (!account) return session;

      //check if access token is expired if yes renew it
      const accessToken = isAccessTokenExpired(account.expires_at)
        ? await refreshAndUpdateAccessToken(account)
        : account.access_token;
    },
  },
});
