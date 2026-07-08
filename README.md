# ExpensesControl 💸

Aplicação Web full-stack para Controle de Despesas Pessoais, com front-end em React e back-end em Node.js.

## 📋 Índice

- [Sobre o Projeto](#sobre-o-projeto)
- [✨ Features](#-features)
- [🚀 Tecnologias Utilizadas](#-tecnologias-utilizadas)
- [Estrutura do Projeto](#estrutura-do-projeto)
- [▶️ Como Executar (Getting Started)](#️-como-executar-getting-started)
  - [Pré-requisitos](#pré-requisitos)
  - [Configurando o Back-end](#configurando-o-back-end)
  - [Configurando o Front-end](#configurando-o-front-end)
- [🔧 Configuração da API](#-configuração-da-api)
- [Licença](#licença)

## Sobre o Projeto

O **ExpensesControl** é uma ferramenta desenhada para ajudar usuários a gerenciar suas finanças pessoais de forma simples e elegante. A plataforma permite o cadastro de despesas, sua categorização e a visualização de resumos e totais através de um dashboard interativo.

Este repositório contém o código do **front-end (cliente web)**. O back-end (API) está em um repositório separado e pode ser acessado [aqui](https://github.com/GabrielMuehlbauer/expenses-control-api.git).

## ✨ Features

- **Autenticação de Usuário:** Sistema de login e registro seguro com persistência de sessão via Token JWT.
- **Dashboard Interativo:** Visualização rápida do total de gastos, contagem de despesas e um resumo de gastos por categoria.
- **Gerenciamento de Despesas (CRUD):** Crie, visualize, edite e exclua despesas.
- **Gerenciamento de Categorias (CRUD):** Organize suas despesas criando categorias personalizadas.
- **Filtragem Avançada:** Encontre despesas específicas usando filtros por status, categoria, valor e data.
- **Interface Moderna:** Design limpo, responsivo e intuitivo construído com React e CSS Modules.

## 🚀 Tecnologias Utilizadas

### Front-end
- [React](https://reactjs.org/)
- [Vite](https://vitejs.dev/)
- [Axios](https://axios-http.com/) para requisições HTTP
- [React Router DOM](https://reactrouter.com/) para navegação
- CSS Modules para estilização escopada

### Back-end (Estrutura da API)
- Node.js
- Express.js
- JWT (JSON Web Tokens) para autenticação
- Sequelize ou outro ORM para interação com o banco de dados.

## Estrutura do Projeto

```
/
├── expenses-control-back-end/  (Diretório do Back-end, nome presumido)
└── expenses-control-front-end/ (Diretório do Front-end)
    ├── public/
    ├── src/
    │   ├── components/      # Componentes React reutilizáveis
    │   ├── contexts/        # Contextos para estado global (AuthContext)
    │   ├── pages/           # Páginas da aplicação (Login, Dashboard)
    │   └── services/        # Configuração da API (api.js)
    └── README.md            # Documentação específica do Front-end
```

## ▶️ Como Executar (Getting Started)

Siga os passos abaixo para configurar e executar o projeto em seu ambiente local.

### Pré-requisitos

- [Node.js](https://nodejs.org/en/) (versão 18.x ou superior)
- [npm](https://www.npmjs.com/) ou [yarn](https://yarnpkg.com/)
- A API Back-end do ExpensesControl deve estar em execução.

### Configurando o Back-end

Para que o front-end funcione, a API do back-end precisa estar rodando, geralmente na porta `3000`. Para instruções detalhadas de como configurar o back-end, consulte o `README.md` dentro do diretório da API.

### Configurando o Front-end

1.  **Navegue até o diretório do front-end:**
    ```bash
    cd expenses-control-front-end
    ```

2.  **Instale as dependências:**
    ```bash
    npm install
    ```

3.  **Inicie o servidor de desenvolvimento:**
    ```bash
    npm run dev
    ```

4.  **Acesse a aplicação:**
    Abra seu navegador e acesse o endereço fornecido pelo Vite (geralmente `http://localhost:5173`).

## 🔧 Configuração da API

Por padrão, o front-end tentará se conectar à API no endereço `http://localhost:3000/api`. Se o seu back-end estiver rodando em um endereço ou porta diferente, você **precisará** atualizar o arquivo `/src/services/api.js`.

## Licença

Distribuído sob a licença MIT.
