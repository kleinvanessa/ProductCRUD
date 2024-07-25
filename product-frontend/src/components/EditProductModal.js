import React, { useState, useEffect } from 'react';
import { Modal, Button, Form, Alert } from 'react-bootstrap';
import { editProduct } from '../services/ProductService';
import '../styles/ProductList.css';

const EditProductModal = ({ show, onHide, product }) => {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [showValidationError, setShowValidationError] = useState(false);

  useEffect(() => {
    if (product) {
      setName(product.name);
      setPrice(product.price.toString());
    }
  }, [product]);

  const handleEdit = async (e) => {
    e.preventDefault();
    if (name.trim() === '' || price.trim() === '') {
      setShowValidationError(true);
      return;
    }
    setShowValidationError(false);

    try {
      const productData = { name, price: parseFloat(price) };
      await editProduct(product.id, productData);
      onHide();
    } catch (error) {
      console.error('Error updating product:', error);
      alert('Erro ao atualizar o produto. Tente novamente.');
    }
  };

  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>Editar Produto</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {showValidationError && (
          <Alert variant="danger">
            Por favor, preencha todos os campos.
          </Alert>
        )}
        <Form onSubmit={handleEdit}>
          <Form.Group controlId="formProductName">
            <Form.Label>Nome</Form.Label>
            <Form.Control
              type="text"
              placeholder="Digite o nome do produto"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </Form.Group>
          <Form.Group controlId="formProductPrice" className="mt-3">
            <Form.Label>Valor</Form.Label>
            <Form.Control
              type="number"
              step="0.01"
              placeholder="Digite o preço do produto"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              required
            />
          </Form.Group>
          <Button variant="primary" type="submit" className="mt-3">
            Salvar alterações
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default EditProductModal;
