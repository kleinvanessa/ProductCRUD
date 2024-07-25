import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import ProductList from '../components/ProductList';
import { getProducts } from '../services/ProductService';

jest.mock('../services/ProductService', () => ({
  getProducts: jest.fn()
}));

test('renders loading spinner initially', () => {
  getProducts.mockImplementation(() => new Promise(() => {}));

  const { container } = render(<ProductList />);
  expect(container.querySelector('.spinner-border')).toBeInTheDocument();
});

test('displays products and pagination', async () => {
  const mockProducts = [
    { id: 1, name: 'Produto 1', price: 100.00, dateAdded: '2024-07-01T12:00:00Z' }
  ];
  getProducts.mockResolvedValue(mockProducts);

  render(<ProductList />);

  await waitFor(() => {
    expect(screen.getByText('Produto 1')).toBeInTheDocument();
  });
});

test('displays no products message', async () => {
  getProducts.mockResolvedValue([]);

  render(<ProductList />);

  await waitFor(() => {
    expect(screen.getByText('Nenhum produto encontrado')).toBeInTheDocument();
  });
});
