import React from "react";
import styled from 'styled-components';

const StyledFooter = styled.footer`
    display: flex;
    justify-content: center;
    gap: 1rem;
    > button {
        background: none;
        padding: 0;
        cursor: pointer;
    }
`;

export const Pagination: React.FC<{
  totalPages: number;
  pageNumber: number;
  onChange: (pageNumber: number) => void
}> = ({pageNumber, onChange, totalPages}) => {
  return (
    <StyledFooter>
      <button disabled={pageNumber===0} onClick={() => onChange(pageNumber - 1)}>&lt;&lt;</button>
      {`${pageNumber + 1} of ${totalPages}`}
      <button disabled={totalPages===pageNumber + 1} onClick={() => onChange(pageNumber + 1)}>&gt;&gt;</button>
    </StyledFooter>
  )
}
