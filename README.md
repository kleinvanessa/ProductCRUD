# ProductCRUD

Este é um projeto para gerenciar um CRUD de produtos, utilizando .NET Core para o back-end e React para o front-end. 
A aplicação permite criar, ler, atualizar e deletar produtos.

## Requisitos

Antes de começar, certifique-se de ter os seguintes requisitos instalados:

### Back-End (.NET Core)

- [ .NET SDK 8.0+ ](https://dotnet.microsoft.com/download/dotnet) — A versão 8.0 ou superior do .NET SDK é necessária para compilar e executar a aplicação.
- [ SQL Server ] (ou outro banco de dados compatível) — A aplicação utiliza o Entity Framework Core com SQL Server para gerenciamento de banco de dados.

### Front-End (React)

- [ Node.js 18+ ](https://nodejs.org/)
- [ npm ou yarn ] (gerenciador de pacotes para Node.js)

## Configuração do Ambiente

### 1. Clonando o Repositório

Clone o repositório para sua máquina local:

```bash
git clone https://github.com/kleinvanessa/ProductCRUD.git
cd ProductCRUD
```

### 2. Configuração do Back-End

#### 1. Instale as dependências:

Navegue até o diretório do back-end e execute:

```bash
cd ProductAPI
dotnet restore
```
#### 2. Configuração do Banco de Dados:

- Configure sua conexão com o banco de dados no arquivo appsettings.json. Exemplo:

```json
"ConnectionStrings": {
  "DefaultConnection": "Server=SEU_SERVIDOR;Database=ProductCRUD;Trusted_Connection=True;"
}
```

- Certifique-se de que o banco de dados está configurado e rode as migrações para criar o banco 
(ou crie manualmente com o script: *ProductCRUD\database-scripts\CreateDatabase.sql* ):

```bash
dotnet ef database update
```

- Se precisar de dados para teste use o script: *ProductCRUD\database-scripts\InsertData.sql*

#### 3. Rodando a Aplicação:

```bash
dotnet run
```
A API estará disponível em http://localhost:5000.


### 3. Configuração do Front-End

#### 1. Instale as dependências:

Navegue até o diretório do front-end e execute:

```bash
cd product-frontend
npm install
```

#### 1. Configuração da API:

No arquivo src/config/apiConfig.js, se necessário configure a URL base da API:

```javascript
const API_BASE_URL = 'http://localhost:5000/api/Product';
export default API_BASE_URL;
```

#### 3. Rodando a Aplicação:

Execute o seguinte comando para iniciar o front-end:

```bash
npm start
```
O front-end estará disponível em http://localhost:3000.

## Testes

### Testes de Back-End

#### 1. Executando Testes Unitários:

Navegue até o diretório ProductAPI.Tests e execute:

```bash
cd ProductAPI.Tests
dotnet test
```

### Testes de Front-End

#### 1. Executando Testes Unitários:

Navegue até o diretório product-frontend e execute:

```bash
npm test
```


Este README fornece instruções claras para configurar, rodar e testar a aplicação, 
bem como para configurar o apontamento da API e executar as aplicações front-end e back-end. 
Se precisar de mais ajustes ou informações, estou à disposição!
