# 🛒 Ecommerce Shop

Sistema completo de e-commerce desenvolvido com React + Vite, permitindo cadastro de usuários, navegação de produtos, gerenciamento de carrinho de compras e avaliações.

## 📋 Funcionalidades

### Autenticação
- ✅ Registro de novos usuários com informações completas (endereço, cidade, estado)
- ✅ Login com e-mail e senha via Supabase Auth
- ✅ Proteção de rotas (públicas e privadas)
- ✅ Gerenciamento de sessão com localStorage

### Produtos
- ✅ Listagem de produtos com informações detalhadas
- ✅ Filtro de produtos por categoria
- ✅ Busca de produtos por nome
- ✅ Exibição de preço, descrição e categoria
- ✅ Visualização de média de avaliações

### Carrinho de Compras
- ✅ Adicionar produtos ao carrinho
- ✅ Ajustar quantidade de produtos (aumentar/diminuir)
- ✅ Remover produtos do carrinho
- ✅ Cálculo automático do valor total
- ✅ Persistência do carrinho no localStorage
- ✅ Finalização de compra com criação de pedidos

### Conta do Usuário
- ✅ Visualização e edição de dados pessoais
- ✅ Atualização de endereço (endereço, CEP, cidade, estado)
- ✅ Histórico de pedidos realizados
- ✅ Visualização de status dos pedidos

### Sistema de Avaliações
- ✅ Avaliar produtos com sistema de estrelas (1 a 5)
- ✅ Visualizar média de avaliações de cada produto
- ✅ Contador de número de avaliações
- ✅ Validação: usuário só pode avaliar produtos que comprou

### Favoritos
- ✅ Adicionar/remover produtos dos favoritos
- ✅ Visualização de lista de favoritos
- ✅ Persistência dos favoritos no backend

## 🚀 Tecnologias Utilizadas

### Frontend
- **React 18** - Biblioteca para construção de interfaces
- **TypeScript** - Tipagem estática para JavaScript
- **Vite** - Build tool e dev server rápido
- **React Router DOM** - Gerenciamento de rotas
- **TanStack Query (React Query)** - Gerenciamento de estado assíncrono e cache
- **Axios** - Cliente HTTP para requisições à API

### UI/Estilização
- **Tailwind CSS** - Framework CSS utility-first
- **shadcn/ui** - Componentes UI acessíveis e customizáveis
- **Lucide React** - Biblioteca de ícones
- **React Toastify** - Notificações toast

### Autenticação
- **Supabase** - Plataforma de autenticação e banco de dados

### Formatação
- **React Intl** - Formatação de moeda e internacionalização

## 📁 Estrutura do Projeto

```
src/
├── cases/                      # Módulos de negócio
│   ├── account/               # Gerenciamento de conta
│   ├── auth/                  # Autenticação (login, registro)
│   ├── cart/                  # Carrinho de compras
│   ├── categories/            # Categorias de produtos
│   ├── cities/                # Cidades (endereço)
│   ├── customers/             # Clientes
│   ├── favorites/             # Produtos favoritos
│   ├── orders/                # Pedidos
│   ├── products/              # Produtos
│   ├── reviews/               # Avaliações
│   └── states/                # Estados (UF)
├── components/                # Componentes compartilhados
│   ├── layout/               # Componentes de layout (Header, etc)
│   └── ui/                   # Componentes UI (shadcn/ui)
├── lib/                      # Configurações e utilitários
│   ├── axios.ts             # Configuração do Axios
│   ├── supabase-client.ts   # Cliente Supabase
│   └── utils.ts             # Utilitários gerais
├── App.tsx                   # Componente principal com rotas
└── main.tsx                  # Entry point da aplicação
```

### Padrão de Organização por Módulo

Cada módulo em `cases/` segue a estrutura:

```
module/
├── components/              # Componentes específicos do módulo
├── dtos/                   # Data Transfer Objects (TypeScript interfaces)
├── hooks/                  # Custom hooks do módulo
└── services/               # Serviços de comunicação com API
```

## 🔧 Instalação e Configuração

### Pré-requisitos

- Node.js 18+ 
- npm ou yarn
- Backend da aplicação rodando (ecommerce-backend)

### Passos para instalação

1. Clone o repositório:
```bash
git clone https://github.com/thiagohvo/ecommerce-shop-carros
cd ecommerce-shop
```

2. Instale as dependências:
```bash
npm install
```

3. Configure as variáveis de ambiente:

Crie um arquivo `.env` na raiz do projeto:

```env
VITE_API_URL=http://localhost:3000/api
```

4. Configure o Supabase:

Edite o arquivo `src/lib/supabase-client.ts` com suas credenciais:

```typescript
const supabaseUrl = 'sua-url-do-supabase';
const supabaseAnonKey = 'sua-chave-anonima';
```

5. Inicie o servidor de desenvolvimento:
```bash
npm run dev
```

A aplicação estará disponível em `http://localhost:5173`

## 🎯 Scripts Disponíveis

```bash
npm run dev          # Inicia servidor de desenvolvimento
npm run build        # Gera build de produção
npm run preview      # Preview do build de produção
npm run lint         # Executa linter
```

## 🔐 Fluxo de Autenticação

1. **Registro**:
   - Usuário preenche formulário com dados pessoais e endereço
   - Sistema cria usuário no Supabase Auth
   - Sistema cria registro de cliente no backend
   - Redireciona para login

2. **Login**:
   - Usuário fornece e-mail e senha
   - Supabase valida credenciais
   - Token JWT é armazenado no localStorage
   - Usuário é redirecionado para página de produtos

3. **Proteção de Rotas**:
   - Rotas protegidas verificam presença do token
   - Rotas públicas (login/registro) redirecionam usuários autenticados

## 🛍️ Fluxo de Compra

1. Usuário navega pelos produtos
2. Adiciona produtos ao carrinho (quantidade ajustável)
3. Acessa página do carrinho
4. Revisa itens e valores
5. Finaliza compra:
   - Sistema cria registro de pedido
   - Sistema cria itens do pedido
   - Carrinho é limpo
   - Pedido aparece no histórico do usuário

## ⭐ Sistema de Avaliações

- Usuário só pode avaliar produtos que comprou
- Componente `RatingStars`: permite avaliar (1 a 5 estrelas)
- Componente `AverageStars`: exibe média de avaliações (somente leitura)
- Avaliações são salvas e vinculadas ao cliente e produto

## 📦 Integração com Backend

A aplicação consome uma API REST seguindo o padrão:

- **Base URL**: Definida em `VITE_API_URL`
- **Endpoints principais**:
  - `/auth` - Autenticação
  - `/customers` - Clientes
  - `/products` - Produtos
  - `/categories` - Categorias
  - `/orders` - Pedidos
  - `/order-items` - Itens de pedidos
  - `/reviews` - Avaliações
  - `/cities` - Cidades
  - `/states` - Estados

Todos os serviços estão em `src/cases/[modulo]/services/`

## 🎨 Componentes Principais

### Header
- Logo com link para produtos
- Carrinho com badge de quantidade
- Menu do usuário (Conta, Favoritos, Sair)

### ProductCard
- Exibição de produto individual
- Botão de favoritar
- Sistema de avaliações
- Botão adicionar ao carrinho

### Cart
- Lista de produtos no carrinho
- Controles de quantidade
- Cálculo de subtotal e total
- Botão de finalizar compra

### OrderDataTable
- Tabela de pedidos do usuário
- Exibição de data, valor e status
- Badges coloridos por status

## 🚦 Status de Pedidos

- 🔵 **NEW** - Novo
- 🟡 **SEPARATION** - Em Separação
- 🟣 **INVOICED** - Faturado
- 🔷 **SHIPPED** - Enviado
- 🟢 **DELIVERED** - Entregue
- 🔴 **CANCELED** - Cancelado

## 📱 Responsividade

A aplicação é totalmente responsiva utilizando classes do Tailwind CSS:
- Mobile: layout em coluna única
- Tablet: grid de 2 colunas
- Desktop: grid de 3 colunas

## 🤝 Contribuindo

1. Fork o projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo `LICENSE` para mais detalhes.

## 👨‍💻 Autor

Desenvolvido como projeto acadêmico para a disciplina de Programação.

---

⭐ Se este projeto foi útil para você, considere dar uma estrela no repositório!