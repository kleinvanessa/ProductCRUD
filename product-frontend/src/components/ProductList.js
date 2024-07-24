import React, { useState, useEffect } from 'react';
import { Table, Button, Spinner, Alert, Modal, Form, Pagination } from 'react-bootstrap';
import API_ENDPOINTS from '../config/apiConfig';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faEdit } from '@fortawesome/free-solid-svg-icons';
import '../styles/ProductList.css';

const ProductList = ({ refresh }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showConfirmDelete, setShowConfirmDelete] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [productToDelete, setProductToDelete] = useState(null);
  const [productToEdit, setProductToEdit] = useState(null);
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');

  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage] = useState(10);

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

  const handleDelete = async () => {
    try {
      await fetch(API_ENDPOINTS.DELETE_PRODUCT(productToDelete.id), { method: 'DELETE' });
      setShowConfirmDelete(false);
      fetchProducts();
    } catch (error) {
      console.error('Error deleting product:', error);
      setError('Erro ao excluir o produto. Tente novamente.');
    }
  };

  const handleEdit = async () => {
    try {
      const productData = { name, price: parseFloat(price) };
      await fetch(API_ENDPOINTS.UPDATE_PRODUCT(productToEdit.id), {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(productData),
      });
      setShowEditModal(false);
      fetchProducts();
    } catch (error) {
      console.error('Error updating product:', error);
      setError('Erro ao atualizar o produto. Tente novamente.');
    }
  };

  const openDeleteConfirmation = (product) => {
    setProductToDelete(product);
    setShowConfirmDelete(true);
  };

  const handleCloseConfirmDelete = () => {
    setShowConfirmDelete(false);
    setProductToDelete(null);
  };

  const openEditModal = (product) => {
    setName(product.name);
    setPrice(product.price);
    setProductToEdit(product);
    setShowEditModal(true);
  };

  const handleCloseEditModal = () => {
    setShowEditModal(false);
    setProductToEdit(null);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = products.slice(indexOfFirstProduct, indexOfLastProduct);

  const totalPages = Math.ceil(products.length / productsPerPage);

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
            <th>#</th>
            <th>Nome do Produto</th>
            <th>Valor</th>
            <th>Data de Inclusão</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {currentProducts.length > 0 ? (
            currentProducts.map((product, index) => (
              <tr key={product.id}>
                <td>{indexOfFirstProduct + index + 1}</td>
                <td>{product.name}</td>
                <td>{product.price.toFixed(2)}</td>
                <td>
                  {new Date(product.dateAdded).toLocaleDateString()}{' '}
                  {new Date(product.dateAdded).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </td>
                <td>
                  <Button variant="link" onClick={() => openDeleteConfirmation(product)}>
                    <FontAwesomeIcon icon={faTrash} />
                  </Button>
                  <Button variant="link" onClick={() => openEditModal(product)}>
                    <FontAwesomeIcon icon={faEdit} />
                  </Button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5">Nenhum produto encontrado</td>
            </tr>
          )}
        </tbody>
      </Table>

      <Pagination>
        <Pagination.Prev onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1} />
        {[...Array(totalPages).keys()].map(page => (
          <Pagination.Item
            key={page + 1}
            active={page + 1 === currentPage}
            onClick={() => handlePageChange(page + 1)}
          >
            {page + 1}
          </Pagination.Item>
        ))}
        <Pagination.Next onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages} />
      </Pagination>

      <Modal show={showConfirmDelete} onHide={handleCloseConfirmDelete}>
        <Modal.Header closeButton>
          <Modal.Title>Confirmação de Exclusão</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Você tem certeza de que deseja excluir o produto <strong>{productToDelete?.name}</strong>?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseConfirmDelete}>
            Cancelar
          </Button>
          <Button variant="danger" onClick={handleDelete}>
            Excluir
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal show={showEditModal} onHide={handleCloseEditModal}>
        <Modal.Header closeButton>
          <Modal.Title>Editar Produto</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={(e) => { e.preventDefault(); handleEdit(); }}>
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
            <Button variant="secondary" className="ml-2" onClick={handleCloseEditModal}>
              Cancelar
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default ProductList;
