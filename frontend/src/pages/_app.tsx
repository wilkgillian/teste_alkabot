import { ChakraProvider } from '@chakra-ui/react';
import NextNProgress from 'nextjs-progressbar';

import theme from '../theme';
import { AppProps } from 'next/app';
import { PostsProvider } from '../context/contextPosts';
import { UsersProvider } from '../context/contextUsers';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <PostsProvider>
      <UsersProvider>
        <ChakraProvider theme={theme}>
          <NextNProgress
            color="#6EEB83"
            startPosition={0.3}
            stopDelayMs={200}
            height={5}
            showOnShallow
          />
          <Component {...pageProps} />
        </ChakraProvider>
      </UsersProvider>
    </PostsProvider>
  );
}

export default MyApp;
