// app/api/auth/[...nextauth]/route.js
import NextAuth from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import GitHubProvider from 'next-auth/providers/github'
import GoogleProvider from 'next-auth/providers/google'

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: { /* email/password fields */ },
      authorize: async (creds) => {
        // your user lookup here
        if (creds.email === 'demo@demo.com' && creds.password === 'demo') {
          return { id: 1, email: 'demo@demo.com' }
        }
        return null
      }
    }),
    GitHubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET
    })
  ],
  secret: process.env.NEXTAUTH_SECRET,
  session: { strategy: 'jwt' },
}

export default NextAuth(authOptions)
