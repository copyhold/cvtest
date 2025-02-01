import React from 'react';
import styled from 'styled-components';

const StyledHeader = styled.header`
    background: #eee;
    place-content: center;
    grid-column: span 2;
    padding-inline: 2rem;
    padding-block: 1rem;
    h1 {
        font-size: 2rem;
        margin: 0;
    }
`

export const Header: React.FC = () => {
  return (
    <StyledHeader>
      <h1>Products app</h1>
    </StyledHeader>
  )
}
