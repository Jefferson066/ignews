import NextAuth from "next-auth"
import GithubProvider from "next-auth/providers/github"
import { query as q } from 'faunadb'
import { fauna } from '../../../services/fauna'


export default NextAuth({
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,

      authorization: {
        params: {
          scope: 'read:user',
        },
      },
    }),
  ],
  secret:'aeçorighhpçyaeghaeriçghaeçiugheaçghariçughçaerg',
  callbacks: {
    async signIn({ user, account, profile,  credentials }) {
      const email = user.email;
      console.log('user', user)
      try {
        await fauna.query(
          q.Create(
            q.Collection('users'),
            { data: { email } }
          )
        )
        return true
      } catch(err) {
        console.log('err', err)
        return false
      }
    },
  }
})

