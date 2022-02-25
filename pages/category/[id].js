import { client } from '../../libs/client';
import { Blog } from '../../components/Blog';
import { Title } from '../../components/Title';
import { HeadTemplate } from '../../components/HeadTemplate';
import styled from 'styled-components';

const Container = styled.div`
  margin: 0 auto;
  max-width: 700px;
  padding: 20px;
`;

const Main = styled.div`
  width: 100%;
`;

export default function Home({ blog, category, imgUrl }) {
  return (
    <>
      <HeadTemplate
        pageTitle={`${category.name}の記事 | roaris.io`}
        pageUrl={`${process.env.NEXT_PUBLIC_URL}/category/${category.id}`}
        imgUrl={imgUrl}
        type="website"
        twitterCard="summary"
      />
      <Container>
        <Title />
        <h2>{category.name}の記事</h2>
        <Main>
          {blog.map((blog) => (
            <Blog blog={blog} key={blog.id} />
          ))}
        </Main>
      </Container>
    </>
  );
}

export const getStaticPaths = async () => {
  const data = await client.get({ endpoint: 'category' });
  const paths = data.contents.map((content) => `/category/${content.id}`);
  return { paths, fallback: false };
};

export const getStaticProps = async (context) => {
  const categoryId = context.params.id;
  const data = await client.get({
    endpoint: 'blog',
    queries: { filters: `category[contains]${categoryId}` },
  });
  const category = await client.get({
    endpoint: 'category',
    contentId: categoryId,
  });
  const ogp = await client.get({ endpoint: 'ogp' });
  return {
    props: {
      blog: data.contents,
      category: category,
      imgUrl: ogp.image.url,
    },
  };
};
