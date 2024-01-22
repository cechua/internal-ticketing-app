import type { NextAuthOptions } from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
export const authOptions: NextAuthOptions = {
  providers: [
    Credentials({
      name: 'Credentials',
      credentials: {
        username: { label: 'Username', type: 'text', placeholder: 'username' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        const res = await fetch(`${process.env.SERVER_URL}/api/User/Login`, {
          method: 'POST',
          body: JSON.stringify({
            username: credentials?.username,
            password: credentials?.password,
          }),
          headers: { 'Content-Type': 'application/json' },
        });
        const userResult = await res.json();
        // If no error and we have user data, return it
        const user = {
          id: userResult.data.id,
          name: userResult.data.firstName + ' ' + userResult.data.lastName,
          username: userResult.username,
          email: userResult.data.email,
          role: userResult.data.role,
        };
        if (res.ok && user) {
          return user;
        }
        return null;
      },
    }),
  ],
  pages: {
    signIn: '/User/Login', //page of login
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.role = user.role;
      } //manually added to next-auth.d.ts types
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user.id = token.sub;
        session.user.role = token.role;
      }
      return session;
    },
  },
};
