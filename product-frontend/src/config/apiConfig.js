import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/api/Product';

const API_ENDPOINTS = {
  GET_ALL_PRODUCTS: `${API_BASE_URL}/GetAllProducts`,
  CREATE_PRODUCT: `${API_BASE_URL}/CreateProduct`,
  UPDATE_PRODUCT: (id) => `${API_BASE_URL}/UpdateProduct/${id}`,
  DELETE_PRODUCT: (id) => `${API_BASE_URL}/DeleteProduct/${id}`
};

export const fetchProducts = async () => {
  try {
    const response = await axios.get(API_ENDPOINTS.GET_ALL_PRODUCTS);
    return response.data;
  } catch (error) {
    throw new Error(`Failed to fetch products: ${error.message}`);
  }
};

export const createProduct = async (product) => {
  try {
    const response = await axios.post(API_ENDPOINTS.CREATE_PRODUCT, product, {
      headers: {
        'Content-Type': 'application/json'
      }
    });
    return response.data;
  } catch (error) {
    throw new Error(`Failed to create product: ${error.message}`);
  }
};

export const updateProduct = async (id, product) => {
  try {
    const response = await axios.put(API_ENDPOINTS.UPDATE_PRODUCT(id), product, {
      headers: {
        'Content-Type': 'application/json'
      }
    });
    return response.data;
  } catch (error) {
    throw new Error(`Failed to update product: ${error.message}`);
  }
};

export const deleteProduct = async (id) => {
  try {
    const response = await axios.delete(API_ENDPOINTS.DELETE_PRODUCT(id));
    return response.data;
  } catch (error) {
    throw new Error(`Failed to delete product: ${error.message}`);
  }
};
