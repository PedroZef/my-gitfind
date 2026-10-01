# GitFind 🔍

Aplicação web desenvolvida em **React 19** e **JavaScript Moderno** com estilização via **styled-components** para buscar perfis de usuários no GitHub, exibir suas informações detalhadas e listar seus repositórios públicos com filtro dinâmico de repositórios de interesse em tempo real.

O projeto foi construído seguindo rigorosamente a fonte da verdade visual contida em `docs/GitFind.png`.

---

## 🎯 Objetivo do Projeto

- **Tema Escuro & Identidade Visual**: Paleta de cores moderna (`#1D2128`, `#2D333B`, `#539BF5`, `#999999`) e layout com a marca d'água decorativa do Octocat do GitHub.
- **Busca de Usuários**: Campo de pesquisa com formato pílula para inserção de `@usuario` com acionamento via botão "Buscar" ou tecla `Enter`.
- **Card de Perfil**: Exibição do avatar circular, nome completo, `@handle`, biografia e linha divisória horizontal.
- **Repositórios de Interesse**: Listagem completa dos repositórios públicos com título em link azul direcionando ao repositório no GitHub (`target="_blank" rel="noreferrer"`), descrição e um campo de filtro local em tempo real (`useMemo`) para encontrar rapidamente repositórios pelo nome ou tecnologia.
- **Tratamento de Estados**: Feedback visual de carregamento ("Buscando...") e mensagens amigáveis para usuários inexistentes (HTTP 404) ou sem repositórios públicos.

---

## ⚡ Workflow de Desenvolvimento (Superpowers)

O desenvolvimento seguiu rigorosamente o fluxo orientado a boas práticas e engenharia de software descrito nas diretrizes de agentes (`AGENTS.md` e `SKILLS.md`):

1. **`Brainstorming`**: Entendimento aprofundado dos requisitos, definição de arquitetura modular e aprovação prévia do design com o usuário.
2. **`Writing Plans`**: Criação de especificação técnica (`docs/superpowers/specs/`) e plano detalhado com passos atômicos (`docs/superpowers/plans/`).
3. **`Executing Plans & TDD`**: Implementação dirigida por testes unitários e de integração (Jest + React Testing Library) para cada componente e fluxo.
4. **`Verification Before Completion`**: Verificação formal de testes (100% de aprovação), validação de linting (`yarn eslint`) e compilação de produção (`yarn build`).
5. **`Commit Padronizado`**: Commits semânticos contendo histórico claro e atribuição de coautoria.

---

## 📁 Estrutura do Projeto

```
src/
├── assets/
│   └── github.png             # Imagem do Octocat (marca d'água de fundo)
├── components/
│   ├── Button/                # Botão em formato pílula com hover e estados
│   ├── Footer/                # Rodapé institucional
│   ├── Header/                # Cabeçalho superior com título GitFind
│   ├── Input/                 # Campo de entrada reutilizável estilizado
│   └── ItemList/              # Item da lista de repositórios com link e descrição
├── pages/
│   └── Home/                  # Orquestrador de busca, perfil, API e filtro de repositórios
├── services/
│   └── Api.js                 # Instância base do Axios para a API do GitHub
├── index.js                   # Ponto de entrada da aplicação React
├── setupTests.js              # Configuração de matchers do Jest DOM
└── styles.js                  # GlobalStyle com styled-components (reset e tipografia)
```

---

## 🚀 Comandos e Execução

O projeto utiliza o **Yarn** como gerenciador de pacotes:

| Ação | Comando |
| :--- | :--- |
| **Instalar dependências** | `yarn install` |
| **Iniciar dev server** | `yarn start` (acessível em `http://localhost:3000`) |
| **Compilar para produção** | `yarn build` |
| **Verificação de lint** | `yarn eslint src/caminho/arquivo.js` |

---

## 🛠️ Tecnologias Utilizadas

- **React 19**
- **JavaScript ES6+**
- **styled-components**
- **Axios / Fetch API**
- **Create React App (react-scripts 5)**

---

## 📄 Licença

Este projeto está licenciado sob a licença [MIT](file:///D:/Desafios/react/my-gitfind/LICENSE). Consulte o arquivo `LICENSE` para mais detalhes.

