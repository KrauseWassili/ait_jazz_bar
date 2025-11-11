import { db } from "@/db";
import { users } from "@/db/schema";
import GoogleProvider from "next-auth/providers/google";
import type { Account, Profile, Session } from "next-auth";
import type { JWT } from "next-auth/jwt";

export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    async jwt({
      token,
      account,
      profile,
    }: {
      token: JWT;
      account?: Account | null;
      profile?: Profile | null;
    }) {

      if (account?.provider === "google" && account.providerAccountId) {
        token.googleId = account.providerAccountId;
        console.log(">> Set token.googleId:", token.googleId);
      }

      if (profile?.email) {
        const existing = await db.query.users.findFirst({
          where: (u, { eq }) => eq(u.email, profile.email!),
        });
        if (existing) {
          token.role = existing.role;
        }
      }

      return token;
    },

    async session({ session, token }: { session: Session; token: JWT }) {

      if (token.googleId) {
        session.user.googleId = token.googleId;
      }
      if (token.role) {
        session.user.role = token.role;
      }

      return session;
    },

    async signIn({ user }: { user: any }) {

      if (!user.email) return false;
      const existing = await db.query.users.findFirst({
        where: (u, { eq }) => eq(user.email, u.email),
      });
      if (!existing) {
        await db.insert(users).values({
          email: user.email,
          name: user.name,
          image: user.image,
          role: "customer",
        });
      } else {
      }
      return true;
    },
  },
};
