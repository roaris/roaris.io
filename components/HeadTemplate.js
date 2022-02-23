import Head from 'next/head';

export const HeadTemplate = ({ pageTitle, pageUrl, imgUrl }) => {
  return (
    <Head>
      <title>{pageTitle}</title>
      <meta charset="utf-8" />
      <meta name="viewport" content="device-width,initial-scale=1" />
      <meta property="og:site_name" content="roaris.io" />
      <meta property="og:title" content={pageTitle} />
      <meta property="og:url" content={pageUrl} />
      <meta property="og:image" content={imgUrl} />
      <meta property="og:type" content="article" />
      <meta name="twitter:card" content="summary_large_image" />
    </Head>
  );
};
