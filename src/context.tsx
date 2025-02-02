import {createContext} from 'react';

export type TProduct = {
  id?: number;
  name: string;
  description?: string;
  price: number;
  image?: string;
  createdAt: Date;
}

type TProductsContext = {
  products: TProduct[];
  selectedProduct: TProduct | undefined;
  setProducts: (product: TProduct[]) => void;
  setSelectedProduct: (product: TProduct) => void;
  updateProduct: (product: TProduct) => Promise<void>;
}

export const ProductsContext = createContext<TProductsContext>({
  products: [],
  selectedProduct: undefined,
  setProducts: () => {},
  setSelectedProduct: () => {},
  updateProduct: async () => {},
});
