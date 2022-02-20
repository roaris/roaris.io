import { client } from '../../libs/client';
import Link from 'next/link';
import { Category } from '../../styles/Category';

export default function Home({ blog }) {
  return (
    <div>
      <ul>
        {blog.map((blog) => (
          <li key={blog.id}>
            <Link href={`/blog/${blog.id}`}>
              <a>{blog.title}</a>
            </Link>
            <Category>
              <Link href={`/category/${blog.category.id}`}>
                {blog.category.name}
              </Link>
            </Category>
          </li>
        ))}
      </ul>
    </div>
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
    queries: { filters: `category[equals]${categoryId}` },
  });
  return {
    props: {
      blog: data.contents,
    },
  };
};