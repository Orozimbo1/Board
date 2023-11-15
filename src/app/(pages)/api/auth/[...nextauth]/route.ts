/* eslint-disable */
// @ts-nocheck

// Firebase
import { db } from "@/app/services/firebaseConnection"
import { doc, getDoc } from "firebase/firestore"

// Next Auth
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
        const docRef = doc(db, 'users', token.sub)
        const lastDonate = await getDoc(docRef).then((snapshot) => {
          if(snapshot.exists) {
            return snapshot.data().lastDonate.toDate()
          } else {
            return null
          }
        })

        return {
          ...session,
          id: token.sub ,
          vip: lastDonate ? true : false,
          lastDonate: lastDonate
        }
      } catch (error) {
        return {
          ...session,
          id: null,
          vip: false,
          lastDonate: null
        }
      }
    }
  }
  
}

export const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }