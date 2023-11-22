import type { AppProps } from 'next/app';
import Head from 'next/head';
import { Provider } from 'react-redux';
import { setupStore } from 'src/store/store';
import 'src/styles/globals.scss';

export default function App({ Component, pageProps }: AppProps) {
  const store = setupStore();

  return (
    <>
      <Head>
        <title>Yu-Gi-Oh</title>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>
      <Provider store={store}>
        <Component {...pageProps} />
      </Provider>
    </>
  );
}
