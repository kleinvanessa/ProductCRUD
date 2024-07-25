import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import AddProduct from '../components/AddProduct';
import { addProduct } from '../services/ProductService';

jest.mock('../services/ProductService', () => ({
  addProduct: jest.fn(),
}));

describe('AddProduct Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders AddProduct component', () => {
    render(<AddProduct />);
    
    expect(screen.getByLabelText(/Nome/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Valor/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Salvar/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Limpar/i })).toBeInTheDocument();
  });

  test('shows success modal on successful product addition', async () => {
    addProduct.mockResolvedValueOnce({});
    
    render(<AddProduct />);
    
    fireEvent.change(screen.getByLabelText(/Nome/i), { target: { value: 'Produto Teste' } });
    fireEvent.change(screen.getByLabelText(/Valor/i), { target: { value: '100.00' } });
    fireEvent.click(screen.getByRole('button', { name: /Salvar/i }));

    await waitFor(() => {
      expect(screen.getByText(/Produto adicionado com sucesso!/i)).toBeInTheDocument();
    });
  });

  test('shows error modal on failed product addition', async () => {
    addProduct.mockRejectedValueOnce(new Error('Error saving product'));
    
    render(<AddProduct />);
    
    fireEvent.change(screen.getByLabelText(/Nome/i), { target: { value: 'Produto Teste' } });
    fireEvent.change(screen.getByLabelText(/Valor/i), { target: { value: '100.00' } });
    fireEvent.click(screen.getByRole('button', { name: /Salvar/i }));

    await waitFor(() => {
      expect(screen.getByText(/Ocorreu um erro ao salvar o produto. Tente novamente./i)).toBeInTheDocument();
    });
  });

  test('clears input fields on clicking Clear button', () => {
    render(<AddProduct />);
    
    fireEvent.change(screen.getByLabelText(/Nome/i), { target: { value: 'Produto Teste' } });
    fireEvent.change(screen.getByLabelText(/Valor/i), { target: { value: '100.00' } });
    fireEvent.click(screen.getByRole('button', { name: /Limpar/i }));
    
    expect(screen.getByLabelText(/Nome/i).value).toBe('');
    expect(screen.getByLabelText(/Valor/i).value).toBe('');
  });
});
