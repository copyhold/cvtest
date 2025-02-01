import React, { useEffect, useState} from 'react';
import styled, {createGlobalStyle} from 'styled-components';
import {Header} from "./components/Header.tsx";
import {Footer} from './components/Footer.tsx';
import {ProductsList} from "./components/ProductsList.tsx";
import {ProductView} from "./components/ProductView.tsx";
import {ProductsContext, TProduct} from "./context.tsx";
import {productStorageService} from "./services/productStorage.service.ts";


const GlobalStyle = createGlobalStyle`
    html {
        font-size: 20px;
    }
    body {
        margin: 0;
        font-family: Arial, Helvetica, sans-serif;
        font-size: 100%;
    }
`
const AppGrid = styled.main`
display: grid;
    height: 100vh;
    width: 100vw;
    gap: 1em;
    grid-template-columns: 3fr 2fr;
    grid-template-rows: auto 1fr auto;
`
const useProductsApp = () => {
  const [products, setProducts] = useState<TProduct[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<TProduct>();
  const updateProduct = async (product: TProduct) => {
    await productStorageService.updateProduct(product);
    console.log("=>(App.tsx:34) product", product);
    setProducts([...products.filter(({id}) => id !== product.id), product]);
    setSelectedProduct(undefined);
  }
  return {
    products, selectedProduct, setSelectedProduct, updateProduct, setProducts
  }
}
export const App: React.FC = () => {
  const {products, selectedProduct, setSelectedProduct, updateProduct, setProducts} = useProductsApp();

  useEffect(() => {
    (async () => {
      setSelectedProduct(undefined);
      setProducts(await productStorageService.loadProducts());
    })()
  }, []);

  return (
    <ProductsContext.Provider value={{ updateProduct, setProducts, setSelectedProduct, products, selectedProduct}}>
      <AppGrid>
        <GlobalStyle />
        <Header />
        <ProductsList />
        <ProductView />
        <Footer />
      </AppGrid>
    </ProductsContext.Provider>
    )
}
