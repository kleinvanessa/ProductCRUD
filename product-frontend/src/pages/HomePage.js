import React from 'react';
import '../styles/HomePage.css'; // Importa o CSS personalizado

const HomePage = () => (
  <div className="container mt-3">
    <div className="header">
      <h1>CRUD de Produtos</h1>
    </div>
    <div className="explanation">
      <p>Bem-vindo à aplicação de gerenciamento de produtos! Aqui você pode listar, adicionar, editar e excluir produtos de forma fácil e rápida. Utilize os links abaixo para navegar pelas funcionalidades da aplicação.</p>
    </div>
    <div className="links-container">
      <a href="/products">Lista de Produtos</a>
      <a href="/create">Adicionar Produto</a>
    </div>
  </div>
);

export default HomePage;
