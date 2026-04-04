import NextAuth from "next-auth";
import GithubProvider from "next-auth/providers/github";
import prisma from "@/lib/prisma";

const handler = NextAuth({
    providers: [
        GithubProvider({
            clientId : process.env.GITHUB_ID!,
            clientSecret : process.env.GITHUB_SECRET!
        })
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
}
  },
});

export { handler as GET, handler as POST };