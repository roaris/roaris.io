import { client } from '../libs/client';
import { Blog } from '../components/Blog';
import { Title } from '../components/Title';
import styled from 'styled-components';

export default function Home({ blog }) {
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
      <Main>
        <Title />
        {blog.map((blog) => (
          <Blog blog={blog} key={blog.id} />
        ))}
      </Main>
    </Container>
  );
}

// ビルド時にデータを取得する関数
export const getStaticProps = async () => {
  const data = await client.get({ endpoint: 'blog' });
  return {
    props: {
      blog: data.contents,
    },
  };
};
