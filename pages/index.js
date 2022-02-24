import { client } from '../libs/client';
import { Blog } from '../components/Blog';
import { Title } from '../components/Title';
import { HeadTemplate } from '../components/HeadTemplate';
import styled from 'styled-components';

export default function Home({ blog, imgUrl }) {
  const Container = styled.div`
    margin: 0 auto;
    max-width: 700px;
    padding: 20px;
  `;

  const Main = styled.div`
    width: 100%;
  `;

  return (
    <>
      <HeadTemplate
        pageTitle="すべての記事 | roaris.io"
        pageUrl={process.env.NEXT_PUBLIC_URL}
        imgUrl={imgUrl}
        type="website"
        twitterCard="summary"
      />
      <Container>
        <Main>
          <Title />
          <h2>すべての記事</h2>
          {blog.map((blog) => (
            <Blog blog={blog} key={blog.id} />
          ))}
        </Main>
      </Container>
    </>
  );
}

// ビルド時にデータを取得する関数
export const getStaticProps = async () => {
  const data = await client.get({ endpoint: 'blog' });
  const ogp = await client.get({ endpoint: 'ogp' });
  return {
    props: {
      blog: data.contents,
      imgUrl: ogp.image.url,
    },
  };
};
