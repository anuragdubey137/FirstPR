import GithubProvider from "next-auth/providers/github";
import prisma from "@/lib/prisma";
import { NextAuthOptions } from "next-auth";
import { JWT } from "next-auth/jwt";

declare module "next-auth" {
  interface Session {
    accessToken?: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    accessToken?: string;
  }
}

export const authOptions: NextAuthOptions = {
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID!,
      clientSecret: process.env.GITHUB_SECRET!,
      issuer: "https://github.com/login/oauth",
    }),
  ],

  callbacks: {
    async signIn({ profile }) {
      try {
        if (!profile) return false;

        const githubProfile = profile as {
          id: number;
          login: string;
          email: string | null;
          avatar_url: string;
        };

        const existingUser = await prisma.user.findUnique({
          where: {
            githubId: githubProfile.id.toString(),
          },
        });

        if (!existingUser) {
          await prisma.user.create({
            data: {
              githubId: githubProfile.id.toString(),
              username: githubProfile.login,
              email: githubProfile.email,
              avatarURL: githubProfile.avatar_url,
            },
          });
        }

        return true;
      } catch (error) {
        console.error(error);
        return false;
      }
    },

    async jwt({ token, account }) {
      if (account) {
        token.accessToken = account.access_token;
      }
      return token;
    },

    async session({ session, token }) {
      session.accessToken = token.accessToken as string;
      return session;
    },
  },

  secret: process.env.NEXTAUTH_SECRET,
};