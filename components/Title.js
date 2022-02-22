import Link from 'next/link';
import styled from 'styled-components';

export const Title = () => {
  const H1 = styled.h1`
    display: inline;
    margin-right: 10px;
    vertical-align: middle;
  `;

  const Img = styled.img`
    border-radius: 50%;
    height: 45px;
    vertical-align: middle;
    width: 45px;
  `;

  return (
    <>
      <H1>
        <Link href="/">roaris.io</Link>
      </H1>
      <Img src="/icon.png" />
    </>
  );
};
