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
      console.log("=== [JWT CALLBACK] ===");
      console.log("account:", account);
      console.log("profile:", profile);
      console.log("token (BEFORE):", token);

      if (account?.provider === "google" && account.providerAccountId) {
        token.googleId = account.providerAccountId;
        console.log(">> Set token.googleId:", token.googleId);
      }

      // Роль из базы, если есть email
      if (profile?.email) {
        const existing = await db.query.users.findFirst({
          where: (u, { eq }) => eq(u.email, profile.email!),
        });
        if (existing) {
          token.role = existing.role;
          console.log(">> Set token.role:", token.role);
        }
      }

      console.log("token (AFTER):", token);
      return token;
    },

    async session({ session, token }: { session: Session; token: JWT }) {
      console.log("=== [SESSION CALLBACK] ===");
      console.log("token in session callback:", token);

      if (token.googleId) {
        session.user.googleId = token.googleId;
        console.log(">> Set session.user.googleId:", session.user.googleId);
      }
      if (token.role) {
        session.user.role = token.role;
        console.log(">> Set session.user.role:", session.user.role);
      }

      console.log("session.user (AFTER):", session.user);
      return session;
    },

    async signIn({ user }: { user: any }) {
      console.log("=== [SIGN IN CALLBACK] ===");
      console.log("user:", user);

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
        console.log(">> Inserted new user:", user.email);
      } else {
        console.log(">> Existing user found:", user.email);
      }
      return true;
    },
  },
};
