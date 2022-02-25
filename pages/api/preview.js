import { client } from '../../libs/client';

export default async (req, res) => {
  if (!req.query.id) {
    return res.status(400).end();
  }

  const data = await client.get({
    endpoint: `blog`,
    contentId: req.query.id,
    queries: { draftKey: req.query.draftKey },
  });

  if (!data) return res.status(401).end();

  // Cookieがセットされる
  res.setPreviewData({
    id: data.id,
    draftKey: req.query.draftKey,
  });

  res.redirect(`/blog/${data.id}`);
};
