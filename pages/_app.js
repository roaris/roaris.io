import '../styles/globals.css';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { GA_TRACKING_ID, pageview } from '../libs/gtag';

function MyApp({ Component, pageProps }) {
  const router = useRouter();
  useEffect(() => {
    if (!GA_TRACKING_ID) return;
    const handleRouteChange = (url) => {
      pageview(url);
    };
    router.events.on('routeChangeComplete', handleRouteChange);
    return () => {
      router.events.off('routerChangeComplete', handleRouteChange);
    };
  }, [router.events]);
  return <Component {...pageProps} />;
}

export default MyApp;
