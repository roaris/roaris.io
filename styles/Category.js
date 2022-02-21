import styled from 'styled-components';

export const Category = styled.span`
  padding: 0.2em;
  color: ${(props) => props.color};
  background-color: ${(props) => props.backgroundColor};
  border: 1px solid ${(props) => props.backgroundColor};
  border-radius: 2em;
`;
