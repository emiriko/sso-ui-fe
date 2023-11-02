import { AuthContextProvider } from '@/components/contexts';
import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import Head from 'next/head';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title> SSO UI </title>
      </Head>
      <AuthContextProvider>
        <main className="flex min-h-screen">
          <Component {...pageProps} />
        </main>
      </AuthContextProvider>
    </>
  );
}
