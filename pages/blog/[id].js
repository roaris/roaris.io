import Link from 'next/link';
import { client } from '../../libs/client';
import { Category } from '../../styles/Category';
import { Title } from '../../components/Title';
import styled from 'styled-components';
import cheerio from 'cheerio';
import hljs from 'highlight.js';
import 'highlight.js/styles/github-dark.css';

export default function BlogId({ blog, highlightedBody }) {
  const Container = styled.div`
    margin: 0 auto;
    max-width: 700px;
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

  const day = blog.createdAt.split('T')[0];
  const time = blog.createdAt.split('T')[1].slice(0, 5);

  return (
    <Container>
      <Title />
      <Main>
        <Wrapper>
          {day} {time}
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
        </Wrapper>
      </Main>
    </Container>
  );
}

export const getStaticPaths = async () => {
  const data = await client.get({ endpoint: 'blog' });
  const paths = data.contents.map((content) => `/blog/${content.id}`);
  return { paths, fallback: false };
};

export const getStaticProps = async (context) => {
  const id = context.params.id;
  const data = await client.get({ endpoint: 'blog', contentId: id });

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

  return {
    props: {
      blog: data,
      highlightedBody: $.html(),
    },
  };
};
