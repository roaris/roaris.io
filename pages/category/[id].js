import { client } from '../../libs/client';
import { Blog } from '../../components/Blog';
import { Title } from '../../components/Title';
import styled from 'styled-components';

export default function Home({ blog, categoryName }) {
  const Container = styled.div`
    margin: 0 auto;
    max-width: 700px;
    padding: 20px;
  `;

  const Main = styled.div`
    width: 100%;
  `;

  return (
    <Container>
      <Title />
      <h2>{categoryName}の記事</h2>
      <Main>
        {blog.map((blog) => (
          <Blog blog={blog} key={blog.id} />
        ))}
      </Main>
    </Container>
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
  return {
    props: {
      blog: data.contents,
      categoryName: category.name,
    },
  };
};
