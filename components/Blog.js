import Link from 'next/link';
import { parseTime } from '../libs/parseTime';
import { Category } from '../styles/Category';
import styled from 'styled-components';

export const Blog = ({ blog }) => {
  const Wrapper = styled.div`
    background-color: #ffffff;
    border: 1px solid #ffffff;
    border-radius: 0.5em;
    margin-bottom: 30px;
    padding: 10px;
  `;

  const Title = styled.div`
    cursor: pointer;
    font-size: 23px;
    font-weight: bold;
    margin-bottom: 10px;
  `;

  const publishedAt = parseTime(blog.publishedAt);

  return (
    <Wrapper>
      {publishedAt}
      <Link href={`/blog/${blog.id}`}>
        <Title>{blog.title}</Title>
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
    </Wrapper>
  );
};
