import Head from 'next/head';
import { GA_TRACKING_ID } from '../libs/gtag';

export const HeadTemplate = ({
  pageTitle,
  pageUrl,
  imgUrl,
  type,
  twitterCard,
}) => {
  return (
    <Head>
      {GA_TRACKING_ID && (
        <>
          <script
            async
            src={`https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`}
          />
          <script
            dangerouslySetInnerHTML={{
              __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GA_TRACKING_ID}', {
              page_path: window.location.pathname,
            });
        `,
            }}
          />
        </>
      )}
      <title>{pageTitle}</title>
      <meta charset="utf-8" />
      <meta name="viewport" content="device-width,initial-scale=1" />
      <meta property="og:site_name" content="roaris.io" />
      <meta property="og:title" content={pageTitle} />
      <meta property="og:url" content={pageUrl} />
      <meta property="og:image" content={imgUrl} />
      <meta property="og:type" content={type} />
      <meta name="twitter:card" content={twitterCard} />
    </Head>
  );
};
