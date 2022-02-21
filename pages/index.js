import Link from 'next/link';
import { client } from '../libs/client';
import { Category } from '../styles/Category';

export default function Home({ blog }) {
  return (
    <div>
      <ul>
        {blog.map((blog) => (
          <li key={blog.id}>
            <Link href={`/blog/${blog.id}`}>
              <a>{blog.title}</a>
            </Link>
            {blog.category.map((category) => (
              <Category
                key={category.id}
                color={category.color}
                backgroundColor={category.backgroundColor}
              >
                <Link href={`/category/${category.id}`}>{category.name}</Link>
              </Category>
            ))}
          </li>
        ))}
      </ul>
    </div>
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
