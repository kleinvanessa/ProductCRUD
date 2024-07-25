import {
    fetchProducts as apiFetchProducts,
    createProduct as apiCreateProduct,
    updateProduct as apiUpdateProduct,
    deleteProduct as apiDeleteProduct,
  } from '../config/apiConfig';
  
  export const getProducts = async () => {
    const products = await apiFetchProducts();
    return products;
  };
  
  export const addProduct = async (product) => {
    const newProduct = await apiCreateProduct(product);
    return newProduct;
  };
  
  export const editProduct = async (id, product) => {
    const updatedProduct = await apiUpdateProduct(id, product);
    return updatedProduct;
  };
  
  export const removeProduct = async (id) => {
    const deletedProduct = await apiDeleteProduct(id);
    return deletedProduct;
  };
  