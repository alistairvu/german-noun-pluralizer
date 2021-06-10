import { AppProps } from 'next/app';
import NextNprogress from 'nextjs-progressbar';
import { ChakraProvider } from '@chakra-ui/react';
import { AppHeader } from '../components/app';

const MyApp: React.FC<AppProps> = ({ Component, pageProps }) => (
  <ChakraProvider>
    <NextNprogress options={{ showSpinner: false }} />

    <header>
      <AppHeader />
    </header>

    <main>
      <Component {...pageProps} />
    </main>
  </ChakraProvider>
);

export default MyApp;
