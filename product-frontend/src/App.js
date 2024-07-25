import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage.js';
import AddProduct from './components/AddProduct.js';
import ProductList from './components/ProductList.js';

const App = () => (
  <Router>
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/products-list" element={<ProductList />} />
      <Route path="/add-product" element={<AddProduct />} />
    </Routes>
  </Router>
);

export default App;
