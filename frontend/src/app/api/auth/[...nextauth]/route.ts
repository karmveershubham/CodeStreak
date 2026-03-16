import NextAuth from "next-auth";
import GithubProvider from "next-auth/providers/github";

export const authOptions = {
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_CLIENT_ID || "",
      clientSecret: process.env.GITHUB_CLIENT_SECRET || "",
      authorization: {
        params: {
          scope: 'read:user user:email'
        }
      }
    }),
  ],
  callbacks: {
    async jwt({ token, account, profile }: any) {
      // Persist the OAuth access_token and profile info right after signin
      if (account) {
        token.accessToken = account.access_token;
        token.username = profile?.login;
      }
      return token;
    },
    async session({ session, token }: any) {
      // Send properties to the client
      session.accessToken = token.accessToken;
      session.user.username = token.username;
      
      return session;
    }
  },
  // Ensure we don't conflict with existing manual auth
  session: {
    strategy: "jwt" as const,
  },
  pages: {
    signIn: '/auth/signin', // Redirect to custom signin page
    error: '/auth/error',   // Redirect to custom error page
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
