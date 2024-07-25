import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import Pagination from '../components/Pagination'; // ajuste o caminho conforme necessário

test('renders pagination buttons correctly', () => {
  render(<Pagination currentPage={1} totalItems={50} itemsPerPage={10} onPageChange={() => {}} />);

  expect(screen.getByRole('button', { name: /previous page/i })).toBeInTheDocument();
  expect(screen.getByRole('button', { name: /next page/i })).toBeInTheDocument();
  expect(screen.getByText('1')).toBeInTheDocument();
  expect(screen.getByText('2')).toBeInTheDocument();
  expect(screen.getByText('3')).toBeInTheDocument();
  expect(screen.getByText('4')).toBeInTheDocument();
  expect(screen.getByText('5')).toBeInTheDocument();
});

test('disables next button on the last page', () => {
  render(<Pagination currentPage={5} totalItems={50} itemsPerPage={10} onPageChange={() => {}} />);

  expect(screen.getByRole('button', { name: /previous page/i })).toBeEnabled();
  expect(screen.getByRole('button', { name: /next page/i })).toBeDisabled();
});

test('disables previous button on the first page', () => {
  render(<Pagination currentPage={1} totalItems={50} itemsPerPage={10} onPageChange={() => {}} />);

  expect(screen.getByRole('button', { name: /previous page/i })).toBeDisabled();
  expect(screen.getByRole('button', { name: /next page/i })).toBeEnabled();
});
