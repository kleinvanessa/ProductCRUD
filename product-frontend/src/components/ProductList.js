import React, { useState, useEffect } from 'react';
import { Spinner, Alert } from 'react-bootstrap';
import ProductTable from './ProductTable';
import Pagination from './Pagination';
import EditProductModal from './EditProductModal';
import DeleteProductModal from './DeleteProductModal';
import { getProducts } from '../services/ProductService';
import "../styles/ProductList.css"

const ProductList = ({ refresh }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const [sortField, setSortField] = useState('name');
  const [sortOrder, setSortOrder] = useState('asc');
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [productToEdit, setProductToEdit] = useState(null);
  const [productToDelete, setProductToDelete] = useState(null);

  useEffect(() => {
    fetchProducts();
  }, [refresh, sortField, sortOrder]);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const data = await getProducts();
      const sortedData = sortProducts(data);
      setProducts(sortedData);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const refreshProducts = () => {
    fetchProducts();
  };

  const sortProducts = (products) => {
    return products.sort((a, b) => {
      let comparison = 0;
      if (sortField === 'price') {
        comparison = a.price - b.price;
      } else if (sortField === 'dateAdded') {
        comparison = new Date(a.dateAdded) - new Date(b.dateAdded);
      } else {
        comparison = a.name.localeCompare(b.name);
      }
      return sortOrder === 'asc' ? comparison : -comparison;
    });
  };

  const handleSortChange = (field) => {
    if (field === sortField) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortOrder('asc');
    }
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleEditClick = (product) => {
    setProductToEdit(product);
    setShowEditModal(true);
  };

  const handleDeleteClick = (product) => {
    setProductToDelete(product);
    setShowDeleteModal(true);
  };

  const handleModalClose = () => {
    setShowEditModal(false);
    setShowDeleteModal(false);
    refreshProducts();
  };

  if (loading) {
    return <Spinner animation="border" />;
  }

  if (error) {
    return <Alert variant="danger">Erro: {error}</Alert>;
  }

  return (
    <div className="product-list">
      {products.length > 0 ? (
        <>
          <ProductTable
            products={products}
            sortField={sortField}
            sortOrder={sortOrder}
            onSortChange={handleSortChange}
            onPageChange={handlePageChange}
            currentPage={currentPage}
            itemsPerPage={itemsPerPage}
            onEditClick={handleEditClick}
            onDeleteClick={handleDeleteClick}
          />
          <Pagination
            currentPage={currentPage}
            totalItems={products.length}
            itemsPerPage={itemsPerPage}
            onPageChange={handlePageChange}
          />
        </>
      ) : (
        <div className="no-products">
          <img src="/images/no-products.svg" alt="Nenhum produto encontrado" />
          <p>Nenhum produto encontrado</p>
        </div>
      )}

      {showEditModal && (
        <EditProductModal
          show={showEditModal}
          onHide={handleModalClose}
          product={productToEdit}
        />
      )}
      {showDeleteModal && (
        <DeleteProductModal
          show={showDeleteModal}
          onHide={handleModalClose}
          product={productToDelete}
        />
      )}
    </div>
  );
};

export default ProductList;
