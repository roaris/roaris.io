import base64url from 'base64url';

export const createOgpImage = (baseImageUrl, title) => {
  const ogpImageUrl = `${baseImageUrl}?w=1200&blend64=${base64url(
    `https://assets.imgix.net/~text?txt-font=Avenir-Heavy&txt-size=60&w=1050&txt-align=middle&txt64=${base64url(
      title
    )}`
  )}&blend-mode=normal&blend-align=center,middle`;
  return ogpImageUrl;
};
