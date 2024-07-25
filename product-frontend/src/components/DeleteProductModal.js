import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import { removeProduct } from '../services/ProductService';

const DeleteProductModal = ({ show, onHide, product }) => {
  const handleDelete = async () => {
    try {
      await removeProduct(product.id);
      onHide();
    } catch (error) {
      console.error('Error deleting product:', error);
      alert('Erro ao excluir o produto. Tente novamente.');
    }
  };

  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>Excluir Produto</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>Você tem certeza que deseja excluir o produto <strong>{product?.name}</strong>?</p>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          Cancelar
        </Button>
        <Button variant="danger" onClick={handleDelete}>
          Excluir
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default DeleteProductModal;
