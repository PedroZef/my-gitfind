# Especificação de Design: GitFind - Consumo de API do GitHub e Lista de Repositórios de Interesse

**Data:** 2026-10-01  
**Status:** Aprovado  
**Fonte da verdade visual:** `docs/GitFind.png`

---

## 1. Visão Geral e Objetivos

O GitFind é uma aplicação web desenvolvida em React para buscar perfis de usuários no GitHub e listar seus repositórios públicos, permitindo ao usuário filtrar localmente os repositórios de seu maior interesse.

A interface deve ser fiel ao layout definido em `docs/GitFind.png`:
- Tema escuro (Dark Theme: `#1D2128`).
- Header fixo com o título "GitFind".
- Background estilizado com a imagem do Octocat (`gitlogo.png`) como marca d'água no canto esquerdo.
- Barra de busca com campo de texto arredondado (`@usuario`) e botão "Buscar".
- Card de perfil com avatar circular, nome completo, handle (`@usuario`) e biografia.
- Seção "Repositórios" com título em destaque, campo de busca/filtro local de repositórios de interesse e lista detalhada com nome (link azul), descrição e divisória.

---

## 2. Arquitetura de Componentes

O projeto segue as convenções do repositório (`src/components/<Nome>/index.js` e `src/pages/<Nome>/index.js`):

```
src/
├── assets/
│   └── gitlogo.png
├── components/
│   ├── Button/
│   │   ├── index.js
│   │   ├── style.css
│   │   └── Button.test.js
│   ├── Footer/
│   │   ├── index.js
│   │   └── style.css
│   ├── Header/
│   │   ├── index.js
│   │   ├── style.css
│   │   └── Header.test.js
│   ├── Input/
│   │   ├── index.js
│   │   ├── style.css
│   │   └── Input.test.js
│   └── ItemList/
│       ├── index.js
│       ├── style.css
│       └── ItemList.test.js
├── pages/
│   └── Home/
│       ├── index.js
│       ├── styles.css
│       └── Home.test.js
├── index.js
└── styles.css
```

### 2.1 Detalhamento dos Componentes

1. **`Header`** (`src/components/Header/index.js`):
   - Elemento `<header>` com fundo `#2D333B` e altura de ~60px.
   - Título `<h1>GitFind</h1>` em branco (`#FFFFFF`), fonte sem serifa, centralizado vertical e horizontalmente.

2. **`Input`** (`src/components/Input/index.js`):
   - Input reutilizável aceitando `name`, `value`, `onChange`, `placeholder`, `aria-label`, `className`, etc.
   - Estilo: formato de pílula (*border-radius: 20px*), borda `1px solid rgba(255, 255, 255, 0.2)`, fundo `#1D2128`, texto `#FFFFFF`, placeholder `#999999`, padding interno adequado (`10px 20px`).
   - Usado na busca principal (`placeholder="@usuario"`) e no filtro da lista de repositórios (`placeholder="Filtrar repositórios de interesse..."`).

3. **`Button`** (`src/components/Button/index.js`):
   - Botão reutilizável com `onClick`, `children`, `disabled`, `type`.
   - Estilo: formato de pílula (*border-radius: 20px*), fundo `#2D333B`, borda `1px solid rgba(255, 255, 255, 0.2)`, texto `#FFFFFF`, cursor pointer, efeito de hover e focus suave, e estado `disabled` com opacidade reduzida.

4. **`ItemList`** (`src/components/ItemList/index.js`):
   - Representa cada repositório na lista.
   - Propriedades recebidas: `title`, `description`, `link` (URL do repositório no GitHub).
   - Renderização:
     - Título renderizado como link `<strong><a href={link} target="_blank" rel="noreferrer">{title}</a></strong>` estilizado em azul (`#539BF5`), sem sublinhado por padrão, com hover underline.
     - Descrição `<p>{description || 'Sem descrição informada.'}</p>` estilizada em cinza (`#999999`).
     - Divisória `<hr />` ao final com `border: none; border-top: 1px solid rgba(229, 229, 229, 0.2); margin: 16px 0;`.

5. **`Home`** (`src/pages/Home/index.js`):
   - Componente orquestrador da aplicação.
   - Contém o layout geral:
     - Imagem decorativa de fundo do Octocat posicionada à esquerda, semi-transparente e responsiva.
     - Container de conteúdo à direita com largura máxima de ~700px a 800px.
     - Bloco de busca no topo (Input + Button), com tratamento do evento `Enter` e clique no botão.
     - Feedback de carregamento (spinner ou texto "Carregando...") e mensagens de erro (ex: "Usuário não encontrado").
     - Card de perfil (quando usuário carregado):
       - Avatar circular de 120px com borda sutil.
       - Nome do usuário em destaque (`<h2>`).
       - Handle `@login` em cinza (`<span>`).
       - Biografia (`<p>`).
       - Linha horizontal divisória `<hr />`.
     - Seção de Repositórios:
       - Título "Repositórios" centralizado/alinhado em destaque (`<h3>`).
       - Campo de filtro para busca em tempo real de repositórios de interesse.
       - Lista de itens renderizados via `ItemList`.
       - Mensagem caso a lista filtrada esteja vazia: "Nenhum repositório encontrado com o termo pesquisado." ou se o usuário não possuir repositórios públicos.

---

## 3. Fluxo de Dados e Integração com a API do GitHub

### 3.1 Endpoints Utilizados
- Dados do usuário: `GET https://api.github.com/users/{username}`
- Repositórios do usuário: `GET https://api.github.com/users/{username}/repos?sort=updated&per_page=100`

### 3.2 Estados da Aplicação (useState / useMemo)
- `user` (string): valor atual do input de busca de usuário.
- `currentUser` (object | null): perfil retornado pelo GitHub contendo `{ avatar_url, name, login, bio }`.
- `repos` (array): lista bruta de repositórios públicos retornada pela API.
- `repoFilter` (string): valor do input de filtro local de repositórios.
- `isLoading` (boolean): `true` durante a requisição, desabilitando o botão para evitar múltiplos cliques.
- `errorMessage` (string | null): mensagem amigável exibida quando a API retornar status 404 ou erro de rede.

### 3.3 Regras de Negócio e Filtragem
1. Se o campo de busca estiver vazio ao clicar em "Buscar", nenhuma requisição desnecessária é disparada.
2. Se o usuário for encontrado:
   - Os dados do perfil são preenchidos.
   - A requisição de repositórios é concluída e salva em `repos`.
   - `repoFilter` e `errorMessage` são resetados.
3. Se o usuário não for encontrado (HTTP 404):
   - `currentUser` e `repos` são limpos (`null` e `[]`).
   - `errorMessage` é definido como "Usuário não encontrado!".
4. A lista `filteredRepos` é derivada via `useMemo`:
   ```javascript
   const filteredRepos = useMemo(() => {
       if (!repoFilter.trim()) return repos;
       const term = repoFilter.toLowerCase();
       return repos.filter(repo =>
           repo.name?.toLowerCase().includes(term) ||
           repo.description?.toLowerCase().includes(term)
       );
   }, [repos, repoFilter]);
   ```

---

## 4. Estratégia de Testes

Utilização de Jest e React Testing Library (`@testing-library/react` e `@testing-library/jest-dom` já presentes no `package.json`):

1. **Testes Unitários:**
   - `Header.test.js`: renderiza com texto "GitFind".
   - `Input.test.js`: renderiza com propriedades corretas e dispara `onChange`.
   - `Button.test.js`: renderiza com texto e dispara `onClick`.
   - `ItemList.test.js`: renderiza título, link clicável para o GitHub com atributos seguros e descrição.

2. **Testes de Integração (`Home.test.js`):**
   - Renderização inicial (sem perfil ou repositórios expostos).
   - Busca com sucesso (mock da API com `fetch`):
     - Exibe avatar, nome, login e bio.
     - Exibe seção "Repositórios" com lista de repositórios mockados.
   - Filtragem local de repositórios de interesse:
     - Ao digitar no campo de filtro, exibe apenas os repositórios que correspondem à busca.
   - Tratamento de erro 404:
     - Ao simular resposta com erro 404, exibe mensagem "Usuário não encontrado!".

---

## 5. Critérios de Aceitação

- [x] Header com texto "GitFind" fiel ao design.
- [x] Busca funcional consumindo a API oficial do GitHub.
- [x] Card de perfil com foto, nome, @login e bio.
- [x] Seção "Repositórios" listando os repositórios públicos retornados.
- [x] Filtro de repositórios de interesse funcional em tempo real.
- [x] Todos os links de repositório abrindo a respectiva página no GitHub em nova aba (`target="_blank" rel="noreferrer"`).
- [x] Interface escura fiel ao screenshot `docs/GitFind.png`.
- [x] Testes automatizados passando com `yarn test --watchAll=false`.
- [x] Código limpo, seguindo as convenções de lint e formatação.
