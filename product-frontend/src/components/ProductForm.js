import React, { useState, useEffect } from 'react';
import axios from 'axios';
import API_ENDPOINTS from '../config/apiConfig.js';
import { useNavigate, useParams } from 'react-router-dom';

const ProductForm = ({ productToEdit, setProductToEdit }) => {
  const [name, setName] = useState('');
  const [value, setValue] = useState('');
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    if (productToEdit) {
      setName(productToEdit.Nome);
      setValue(productToEdit.Valor);
    }
  }, [productToEdit]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (productToEdit) {
        await axios.put(API_ENDPOINTS.UPDATE_PRODUCT(productToEdit.IdProduto), { Nome: name, Valor: value });
      } else {
        await axios.post(API_ENDPOINTS.CREATE_PRODUCT, { Nome: name, Valor: value });
      }
      navigate('/products');
    } catch (error) {
      console.error('Error saving product:', error);
    }
  };

  return (
    <div className="container mt-3">
      <h1>{productToEdit ? 'Editar Produto' : 'Adicionar Produto'}</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Nome</label>
          <input
            type="text"
            className="form-control"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="value">Valor</label>
          <input
            type="number"
            className="form-control"
            id="value"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">Salvar</button>
        <button type="button" className="btn btn-secondary ml-2" onClick={() => navigate('/')}>Fechar</button>
      </form>
    </div>
  );
};

export default ProductForm;
