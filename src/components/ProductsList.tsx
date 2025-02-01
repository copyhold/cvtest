import React, {useContext} from "react";
import styled from 'styled-components';
import {ProductsContext} from "../context.tsx";
import {ProductListItem} from "./ProductListItem.tsx";

const ListContainer = styled.section`
    display: flex;
    flex-direction: column;
    gap: 1rem;
    padding-inline-start: 2rem;
`
export const ProductsList: React.FC = () => {
  const {products} = useContext(ProductsContext);
  return <ListContainer>
    {products.map(product => <ProductListItem key={product.id} product={product} />)}
  </ListContainer>
}
