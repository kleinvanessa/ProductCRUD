const API_BASE_URL = 'http://localhost:5000/api/Product';

const API_ENDPOINTS = {
  GET_ALL_PRODUCTS: `${API_BASE_URL}/GetAllProducts`,
  GET_PRODUCT_BY_ID: (id) => `${API_BASE_URL}/GetProductById/${id}`,
  CREATE_PRODUCT: `${API_BASE_URL}/CreateProduct`,
  UPDATE_PRODUCT: (id) => `${API_BASE_URL}/UpdateProduct/${id}`,
  DELETE_PRODUCT: (id) => `${API_BASE_URL}/DeleteProduct/${id}`
};

export default API_ENDPOINTS;
