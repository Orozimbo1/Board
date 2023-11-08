/* eslint-disable */
// @ts-nocheck

import NextAuth from "next-auth"
import GithubProvider from "next-auth/providers/github"

export const authOptions = {
  providers: [
    GithubProvider({
      clientId : process.env.AUTH_GITHUB_ID ?? "",
      clientSecret: process.env.AUTH_GITHUB_SECRET ?? "",
      authorization: {
        url: "https://github.com/login/oauth/authorize",
        params: { scope: "read:user user:email" },
      },
    }),
  ],
  callbacks: {
    async signIn({ user, account, profile }) {
      try {
        return true
      } catch (error) {
        console.log('DEU ERRO ', error)
        return false
      }
    },
    async session({ session, token }) {
      try {
        return {
          ...session,
          id: token.sub 
        }
      } catch (error) {
        return {
          ...session,
          id: null
        }
      }
    }
  }
  
}

export const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }