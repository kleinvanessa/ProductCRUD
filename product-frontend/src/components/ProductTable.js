import React from 'react';
import { Table, Button, Dropdown } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faEdit } from '@fortawesome/free-solid-svg-icons';

const ProductTable = ({
  products,
  sortField,
  sortOrder,
  onSortChange,
  currentPage,
  itemsPerPage,
  onEditClick,
  onDeleteClick,
}) => {
  const indexOfLastProduct = currentPage * itemsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - itemsPerPage;
  const currentProducts = products.slice(indexOfFirstProduct, indexOfLastProduct);

  return (
    <>
      <div className="header-controls">
        <Dropdown className="sort-dropdown">
          <Dropdown.Toggle variant="light" id="sort-dropdown">
            Ordenar
          </Dropdown.Toggle>
          <Dropdown.Menu>
            <Dropdown.Item onClick={() => onSortChange('name')}>
              Nome {sortField === 'name' && (sortOrder === 'asc' ? '↑' : '↓')}
            </Dropdown.Item>
            <Dropdown.Item onClick={() => onSortChange('price')}>
              Preço {sortField === 'price' && (sortOrder === 'asc' ? '↑' : '↓')}
            </Dropdown.Item>
            <Dropdown.Item onClick={() => onSortChange('dateAdded')}>
              Data {sortField === 'dateAdded' && (sortOrder === 'asc' ? '↑' : '↓')}
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </div>
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
          {currentProducts.map((product, index) => (
            <tr key={product.id}>
              <td>{index + 1 + indexOfFirstProduct}</td>
              <td>{product.name}</td>
              <td>{product.price.toFixed(2)}</td>
              <td>
                {new Date(product.dateAdded).toLocaleDateString()}{' '}
                {new Date(product.dateAdded).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </td>
              <td>
                <Button variant="link" onClick={() => onEditClick(product)}>
                  <FontAwesomeIcon icon={faEdit} />
                </Button>
                <Button variant="link" onClick={() => onDeleteClick(product)}>
                  <FontAwesomeIcon icon={faTrash} />
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </>
  );
};

export default ProductTable;
