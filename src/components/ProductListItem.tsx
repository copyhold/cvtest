import React, {useContext} from 'react';
import styled from 'styled-components';
import {ProductsContext, TProduct} from "../context.tsx";

const StyledProductRow = styled.div<{isSelected: boolean}>`
    display: grid;
    border-radius: 4px;
    gap: .5rem 1rem;
    grid-template-columns: 150px 1fr auto;
    grid-template-rows: auto auto;
    grid-template-areas: 
    "img title title"
    "img description button";
    background: ${({isSelected}) => isSelected ? '#ddd' : 'unset'};
    border: 1px solid #ddd;
    border-radius: 4px;
    padding: 1rem;
    
    img {
        grid-area: img;
        width: 100%;
        height: 100%;
        object-fit: cover;
    }
    h3 {
        cursor: pointer;
        margin: 0;
        grid-area: title;
    }
    > div {
        grid-area: description;
        display: -webkit-box;
        -webkit-line-clamp: 3;
        -webkit-box-orient: vertical;
        overflow: hidden;
    }
    button {
        grid-area: button;
        align-self: end;
    }
`
export const ProductListItem:React.FC<{product: TProduct}> = ({product}) => {
  const {products, setProducts, selectedProduct, setSelectedProduct} = useContext(ProductsContext);
  const handleSelectProduct = () => {
    setSelectedProduct(product);
  }
  const handleProductDelete = () => {
    setProducts(products.filter(({id}) => id !== product.id));
  }
  return <StyledProductRow isSelected={selectedProduct?.id === product.id}>
    <img src={product.image} />
    <h3 onClick={handleSelectProduct}>{product.name}</h3>
    <div>{product.description}</div>
    <button type={'button'} onClick={handleProductDelete}>Delete</button>
  </StyledProductRow>
}
