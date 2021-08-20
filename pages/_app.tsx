import type { AppProps } from "next/app";
import { useRouter } from "next/router";
import Head from "next/head";
import { useEffect } from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import NProgress from "nprogress";
import "tailwindcss/tailwind.css";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      cacheTime: Infinity,
      staleTime: 300000,
      retry: false
    }
  }
});

function AndromedaApp({ Component, pageProps }: AppProps) {
  const router = useRouter();

  useEffect(() => {
    NProgress.configure({ showSpinner: true });
    let routeChangeStart = () => NProgress.start();
    let routeChangeComplete = () => NProgress.done();

    router.events.on("routeChangeStart", routeChangeStart);
    router.events.on("routeChangeComplete", routeChangeComplete);
    router.events.on("routeChangeError", routeChangeComplete);
    return () => {
      router.events.off("routeChangeStart", routeChangeStart);
      router.events.off("routeChangeComplete", routeChangeComplete);
      router.events.off("routeChangeError", routeChangeComplete);
    };
  }, []);
  return (
    <QueryClientProvider client={queryClient}>
      <Head>
        <title>andromedaapp</title>
      </Head>
      <Component {...pageProps} />
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}
export default AndromedaApp;
