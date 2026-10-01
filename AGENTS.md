# Instruções de Agente

## Objetivo do projeto
App **GitFind** (busca de perfil/repositórios no GitHub). Construir seguindo o design
de `docs/GitFind.png` (screenshot do Figma) — fonte da verdade visual: tema escuro,
header "GitFind", busca (`@usuario` + botão "Buscar"), card de perfil (avatar, nome,
@handle, bio) e seção "Repositórios" (link azul + descrição, com divisórias).

## Workflow obrigatório (superpowers)
Para construir funcionalidades, seguir o fluxo completo passo a passo:
1. `brainstorming` → 2. `writing-plans` → 3. `executing-plans` / `test-driven-development`
→ 4. `verification-before-completion` → 5. commit (nunca pular etapas)

## Package manager
Usar **yarn** (existe `yarn.lock`): `yarn install`, `yarn start`, `yarn build`

## Comandos
| Tarefa | Comando |
|--------|---------|
| Dev server | `yarn start` (localhost:3000) |
| Teste (watch) | `yarn test` |
| Teste único | `yarn test --watchAll=false <nome>` |
| Lint (arquivo) | `yarn eslint src/caminho/arquivo.js` |

## Convenções
- CRA (react-scripts 5) + React 19, JS puro (sem TS); config do ESLint fica no `package.json`
- Formato: 4 espaços, aspas simples, `;`, printWidth 100 (`.prettierrc`; Prettier não instalado)
- Estrutura: páginas em `src/pages/<Nome>/index.js`, componentes em `src/components/<Nome>/index.js`
- `public/index.html` já customizado (lang `pt-br`, título "App My-GitFind")

## Estado do repo
- Trabalho inicial **não commitado**: boilerplate CRA removido; componentes
  (`Header`, `Input`, `Button`, `Footer`) vazios e `Home` só com placeholder —
  rodar `git status` antes de criar arquivos

## Commit Attribution

AI commits MUST include:
`Co-Authored-By: https://github.com/PedroZef/PedroZef`
