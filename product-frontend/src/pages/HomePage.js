import React, { useState } from 'react';
import { Tab, Tabs, Container } from 'react-bootstrap';
import ProductList from '../components/ProductList.js';
import ProductForm from '../components/AddProduct.js';
import '../styles/HomePage.css';

const HomePage = () => {
  const [key, setKey] = useState('list');
  const [refresh, setRefresh] = useState(false);

  return (
    <Container className="mt-3">
      <div className="header">
        <h1>CRUD de Produtos</h1>
      </div>
      <div className="explanation">
        <p>Bem-vindo à aplicação de gerenciamento de produtos! Aqui você pode listar, adicionar, editar e excluir produtos de forma fácil e rápida. Utilize as abas abaixo para navegar pelas funcionalidades da aplicação.</p>
      </div>
      <Tabs
        activeKey={key}
        onSelect={(k) => {
          setKey(k);
          if (k === 'list') {
            setRefresh(!refresh);
          }
        }}
        className="mb-3"
      >
        <Tab eventKey="list" title="Lista de Produtos">
          <ProductList key={refresh} />
        </Tab>
        <Tab eventKey="add" title="Adicionar Produto">
          <ProductForm setKey={setKey} />
        </Tab>
      </Tabs>
    </Container>
  );
};

export default HomePage;
