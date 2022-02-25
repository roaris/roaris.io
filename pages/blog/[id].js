import Link from 'next/link';
import { client } from '../../libs/client';
import { createOgpImage } from '../../libs/ogp';
import { parseTime } from '../../libs/parseTime';
import { Category } from '../../styles/Category';
import { Title } from '../../components/Title';
import { HeadTemplate } from '../../components/HeadTemplate';
import styled from 'styled-components';
import cheerio from 'cheerio';
import hljs from 'highlight.js';
import 'highlight.js/styles/github-dark.css';
import { TwitterIcon, TwitterShareButton } from 'react-share';

const Container = styled.div`
  margin: 0 auto;
  max-width: 900px;
  padding: 20px;
`;

const Main = styled.div`
  width: 100%;
`;

const Wrapper = styled.div`
  background-color: #ffffff;
  border: 1px solid #ffffff;
  border-radius: 0.5em;
  margin-top: 20px;
  padding: 10px;
`;

const H1 = styled.h1`
  margin-top: 0px;
`;

const Share = styled.div`
  text-align: right;
`;

export default function BlogId({ blog, highlightedBody }) {
  const publishedAt = parseTime(blog.publishedAt);
  const ogpImageUrl = createOgpImage(blog.image.url, blog.title);

  return (
    <>
      <HeadTemplate
        pageTitle={`${blog.title} | roaris.io`}
        pageUrl={`${process.env.NEXT_PUBLIC_URL}/blog/${blog.id}`}
        imgUrl={ogpImageUrl}
        type="article"
        twitterCard="summary_large_image"
      />
      <Container>
        <Title />
        <Main>
          <Wrapper>
            {publishedAt}
            <H1>{blog.title}</H1>
            {blog.category.map((category) => (
              <Category
                key={category.id}
                color={category.color}
                backgroundColor={category.backgroundColor}
              >
                <Link href={`/category/${category.id}`}>{category.name}</Link>
              </Category>
            ))}
            <div
              style={{ overflowWrap: 'break-word' }}
              dangerouslySetInnerHTML={{
                __html: `${highlightedBody}`,
              }}
            />
            <Share>
              <TwitterShareButton
                title={blog.title}
                url={`${process.env.NEXT_PUBLIC_URL}/blog/${blog.id}`}
              >
                <TwitterIcon size={35} round={true} />
              </TwitterShareButton>
            </Share>
          </Wrapper>
        </Main>
      </Container>
    </>
  );
}

export const getStaticPaths = async () => {
  const data = await client.get({ endpoint: 'blog' });
  const paths = data.contents.map((content) => `/blog/${content.id}`);
  return { paths, fallback: false };
};

export const getStaticProps = async (context) => {
  const id = context.params.id;
  // api/previewからリダイレクトした時は、draftKeyが取得できる
  const draftKey = context.previewData?.draftKey;
  const data = await client.get({
    endpoint: 'blog',
    contentId: id,
    queries: { draftKey: draftKey },
  });

  // シンタックスハイライト
  const $ = cheerio.load(data.body);
  $('code', 'p').css('background-color', '#fff');
  $('code', 'p').css('border', '1px solid #ddd');
  $('code', 'p').css('border-radius', '3px');
  $('code', 'p').css('color', '#ff357f');
  $('code', 'p').css('margin', '0 2px');
  $('code', 'p').css('padding', '2px 4px');
  $('code', 'pre').each((_, elm) => {
    const result = hljs.highlightAuto($(elm).text());
    $(elm).html(result.value);
    $(elm).addClass('hljs');
  });
  // リンクに色をつける
  $('a').css('color', '#0969da');

  return {
    props: {
      blog: data,
      highlightedBody: $.html(),
    },
  };
};
