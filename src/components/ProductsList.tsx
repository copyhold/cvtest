import React, {useMemo, useCallback, useState, useContext} from "react";
import styled from 'styled-components';
import {ProductsContext, TProduct} from "../context.tsx";
import {ProductListItem} from "./ProductListItem.tsx";
import {ListActions, type TFilterFields} from "./ListActions.tsx";
import {Pagination} from "./Pagination.tsx";

const ListContainer = styled.section`
    display: flex;
    flex-direction: column;
    gap: 1rem;
    padding-inline-start: 2rem;
`

const PAGE_SIZE = 5;
export const ProductsList: React.FC = () => {
  const [pageNumber, setPageNumber] = useState(0);
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
  const filteredProducts = useMemo(() => products.filter(filterProducts).toSorted(sortProducts)
    , [products, filterProducts, sortProducts]);
  return <>
    <ListContainer>
      <ListActions filter={productsFilter} onChange={setProductsFilter} />
      {
        filteredProducts
        .slice(PAGE_SIZE * pageNumber, PAGE_SIZE * pageNumber + PAGE_SIZE)
        .map(product => <ProductListItem key={product.id} product={product} />)
      }
      <Pagination totalPages={filteredProducts.length / PAGE_SIZE} pageNumber={pageNumber} onChange={setPageNumber} />
    </ListContainer>
    </>
}
