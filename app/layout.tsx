import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Navigation from './(components)/Navigation';
import AuthProvider from './context/AuthProvider';
import { getServerSession } from 'next-auth';
import { authOptions } from './(server)/auth';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Ticket App',
  description: 'Internal Ticketing App',
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const authSession = await getServerSession(authOptions);
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthProvider>
          <div>
            <Navigation user={authSession?.user} />
          </div>
          <div>{children}</div>
        </AuthProvider>
      </body>
    </html>
  );
}
