import Link from 'next/link';
import { client } from '../../libs/client';
import styles from '../../styles/Home.module.scss';
import { Category } from '../../styles/Category';

export default function BlogId({ blog }) {
  return (
    <main className={styles.main}>
      <h1 className={styles.title}>{blog.title}</h1>
      <p className={styles.publishedAt}>{blog.publishedAt}</p>
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
        dangerouslySetInnerHTML={{
          __html: `${blog.body}`,
        }}
        className={styles.post}
      />
    </main>
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
  return {
    props: {
      blog: data,
    },
  };
};
