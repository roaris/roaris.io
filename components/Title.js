import Link from 'next/link';
import styled from 'styled-components';
import GitHubIcon from '@mui/icons-material/GitHub';
import TwitterIcon from '@mui/icons-material/Twitter';

export const Title = () => {
  const H1 = styled.h1`
    display: inline;
    margin-right: 10px;
    vertical-align: middle;
  `;

  const Main = styled.div`
    margin-bottom: 10px;
  `;

  const Img = styled.img`
    border-radius: 50%;
    height: 45px;
    vertical-align: middle;
    width: 45px;
  `;

  const Icon = styled.a`
    margin-right: 8px;
  `;

  return (
    <>
      <Main>
        <H1>
          <Link href="/">roaris.io</Link>
        </H1>
        <Img src="/icon.png" />
      </Main>
      <Icon href="https://github.com/roaris">
        <GitHubIcon />
      </Icon>
      <Icon href="https://twitter.com/jev_mk">
        <TwitterIcon />
      </Icon>
    </>
  );
};
