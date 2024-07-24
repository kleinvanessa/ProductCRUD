import React, { useState} from 'react';
import axios from 'axios';
import API_ENDPOINTS from '../config/apiConfig.js';
import { useNavigate, useParams } from 'react-router-dom';
import { Modal, Button, Form, Container } from 'react-bootstrap';

const AddProduct = ({ setKey }) => {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [showSuccess, setShowSuccess] = useState(false);
  const [showError, setShowError] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const productData = { name, price: parseFloat(price) };      
      await axios.post(API_ENDPOINTS.CREATE_PRODUCT, productData);
      setShowSuccess(true);
      handleClear();
    } catch (error) {
      console.error('Error saving product:', error);
      setShowError(true);
    }
  };

  const handleClear = () => {
    setName('');
    setPrice('');
  };

  return (
    <Container className="mt-3">
      <h1>Adicionar Produto</h1>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="formProductName">
          <Form.Label>Nome</Form.Label>
          <Form.Control
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </Form.Group>

        <Form.Group controlId="formProductPrice">
          <Form.Label>Valor</Form.Label>
          <Form.Control
            type="number"
            step="0.01"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
          />
        </Form.Group>

        <Button variant="primary" type="submit">
          Salvar
        </Button>
        <Button variant="secondary" className="ml-2" onClick={handleClear}>
          Limpar
        </Button>
      </Form>

      <Modal show={showSuccess} onHide={() => setShowSuccess(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Sucesso</Modal.Title>
        </Modal.Header>
        <Modal.Body>Produto adicionado com sucesso!</Modal.Body>
      </Modal>

      <Modal show={showError} onHide={() => setShowError(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Erro</Modal.Title>
        </Modal.Header>
        <Modal.Body>Ocorreu um erro ao salvar o produto. Tente novamente.</Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={() => setShowError(false)}>
            Fechar
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default AddProduct;
