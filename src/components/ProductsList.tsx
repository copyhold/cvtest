import React, {useCallback, useState, useContext} from "react";
import styled from 'styled-components';
import {ProductsContext, TProduct} from "../context.tsx";
import {ProductListItem} from "./ProductListItem.tsx";
import {ListActions, type TFilterFields} from "./ListActions.tsx";

const ListContainer = styled.section`
    display: flex;
    flex-direction: column;
    gap: 1rem;
    padding-inline-start: 2rem;
    height: 100%;
    overflow: auto;
`

export const ProductsList: React.FC = () => {
  const {products} = useContext(ProductsContext);
  const [productsFilter, setProductsFilter] = useState<TFilterFields>({
    search: '',
    order: 'id',
  });
  const sortProducts = useCallback((a: TProduct, b: TProduct) => {
    const {order} = productsFilter;
    const v1 = a[order];
    const v2 = b[order];
    if (!v1) return -1;
    if (!v2) return +1;
    if (v1 > v2) {
      return +1;
    }
    if (v1 < v2) {
      return -1;
    }
    return 0;
  }, [productsFilter]);
  const filterProducts = useCallback((product: TProduct) => {
    const {search} = productsFilter;
    if (!search) return true;
    return product.name.includes(search) || product.description?.includes(search);
  }, [productsFilter]);
  return <>
    <ListContainer>
      <ListActions filter={productsFilter} onChange={setProductsFilter} />
      {products
        .filter(filterProducts)
        .toSorted(sortProducts)
        .map(product => <ProductListItem key={product.id} product={product} />)}
    </ListContainer>
    </>
}
