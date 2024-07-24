import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage.js';
import ProductForm from './components/AddProduct.js';
import ProductList from './components/ProductList.js';

const App = () => (
  <Router>
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/products" element={<ProductList />} />
      <Route path="/create" element={<ProductForm />} />
      <Route path="/edit-product/:id" element={<ProductForm />} />
    </Routes>
  </Router>
);

export default App;
