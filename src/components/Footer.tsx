import React from 'react';
import styled from 'styled-components';

const StyledFooter = styled.footer`
    color: #fff;
    font-size: .8rem;
    padding-inline: 2rem;
    background: #444;
    grid-column: span 2;
    place-content: center;
`

export const Footer: React.FC = () => {
  return (
    <StyledFooter>
      <em>copyright by copyhold 2025</em>
    </StyledFooter>
  )
}
