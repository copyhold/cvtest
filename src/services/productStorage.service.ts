import {TProduct} from "../context.tsx";

const PRODUCT_KEYS = 'store-products';
const updateProduct: (product: TProduct) => Promise<TProduct> = async product => {
  return await new Promise((res, rej) => {
    try {
      const productKeys: number[] = JSON.parse(localStorage.getItem(PRODUCT_KEYS) || '[]');
      product.id ??= productKeys.length === 0 ? 1 : Math.max(...productKeys) + 1;
      const productKey = `product-${product.id}`;
      productKeys.push(product.id);
      localStorage.setItem(productKey, JSON.stringify(product));
      const uniqueProductIds = Array.from(new Set(productKeys));
      localStorage.setItem('store-products', JSON.stringify(uniqueProductIds));
      res(product);
    } catch (e) {
      rej(e);
    }
  })
}

const loadProducts: () => Promise<TProduct[]> = async () => {
  const productKeys: number[] = JSON.parse(localStorage.getItem(PRODUCT_KEYS) || '[]');
  return  await Promise.all<TProduct>(productKeys.map(productKey => {
    const productString = localStorage.getItem(`product-${productKey}`);
    if (productString) {
      return JSON.parse(productString);
    } else {
      throw new Error('Failed to load product');
    }
  }));
}

const clearStorage = async () => {
  const productKeys: number[] = JSON.parse(localStorage.getItem(PRODUCT_KEYS) || '[]');
  try {
    await Promise.allSettled(productKeys.map(productKey => localStorage.removeItem(`product-${productKey}`)));
  } catch (e) {
    console.error(e);
  } finally {
    localStorage.setItem('store-products', JSON.stringify([]));
  }
}
export const productStorageService = {
  updateProduct,
  clearStorage,
  loadProducts,
}
