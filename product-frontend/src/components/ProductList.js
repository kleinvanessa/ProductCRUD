import React, { useState, useEffect } from 'react';
import { Table, Button, Spinner, Alert } from 'react-bootstrap';
import API_ENDPOINTS from '../config/apiConfig';
import '../styles/ProductList.css';

const ProductList = ({ refresh }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchProducts();
  }, [refresh]);

  const fetchProducts = async () => {
    try {
      const response = await fetch(API_ENDPOINTS.GET_ALL_PRODUCTS);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      setProducts(data);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    // 
  };

  const handleEdit = async (id) => {
    // 
  };

  if (loading) {
    return <Spinner animation="border" />;
  }

  if (error) {
    return <Alert variant="danger">Erro: {error}</Alert>;
  }

  return (
    <div className="product-list">
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Nome do Produto</th>
            <th>Valor</th>
            <th>Data de Inclusão</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {products.length > 0 ? (
            products.map(product => (
              <tr key={product.id}>
                <td>{product.name}</td>
                <td>{product.price.toFixed(2)}</td>
                <td>{new Date(product.dateAdded).toLocaleDateString()}</td>
                <td>
                  <Button variant="danger" onClick={() => handleDelete(product.id)}>Excluir</Button>
                  <Button variant="primary" onClick={() => handleEdit(product.id)}>Editar</Button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4">Nenhum produto encontrado</td>
            </tr>
          )}
        </tbody>
      </Table>
    </div>
  );
};

export default ProductList;
