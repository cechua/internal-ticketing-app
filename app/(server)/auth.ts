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
        //Replace this based on doc https://next-auth.js.org/configuration/providers/credentials

        const user = {
          id: '123',
          name: 'Test',
          password: 'test',
          address: 'random',
          role: 'asd',
          image: 'hahaha',
          email: 'hahahahahahaemail',
        };
        if (
          credentials?.username === user.name &&
          credentials?.password === user.password
        ) {
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
    jwt({ token, user }) {
      if (user) {
        token.role = user.role;
      } //manually added to next-auth.d.ts types
      return token;
    },
    session({ session, token }) {
      session.user.id = token.sub;
      session.user.role = token.role;
      return session;
    },
  },
};
