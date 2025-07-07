import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: 'Email',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' }
      },
      async authorize(creds) {
        // MOCK user lookup: accept any nonempty email/password
        if (creds.email && creds.password) {
          const role = creds.email.includes('coach') ? 'coach' : 'athlete';
          return { id: creds.email, email: creds.email, role };
        }
        return null;
      }
    })
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) token.role = user.role;
      return token;
    },
    async session({ session, token }) {
      session.user.role = token.role;
      return session;
    }
  },
  session: { strategy: 'jwt' },
  pages: { signIn: '/login' }
};

export default NextAuth(authOptions);
