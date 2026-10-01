# GitFind API & Repository List Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Construir a interface completa do GitFind com `styled-components`, consumindo a API do GitHub para buscar perfis de usuários, listar seus repositórios e filtrar repositórios de interesse em tempo real.

**Architecture:** Componentização modular (`Header`, `Input`, `Button`, `ItemList`) com estilos isolados via `styled-components`. A página `Home` orquestra as requisições assíncronas para a API do GitHub (`/users/{user}` e `/users/{user}/repos`), gerencia os estados de busca, perfil, repositórios, erro e carregamento, além de fornecer um filtro memoizado em tempo real para os repositórios de interesse.

**Tech Stack:** React 19, JavaScript (ES6+), `styled-components`, Jest, React Testing Library, Yarn.

**Spec:** `docs/superpowers/specs/2026-10-01-gitfind-api-and-repo-list-design.md`

## Global Constraints

- React 19 com JavaScript puro (sem TypeScript).
- Utilizar `styled-components` para estilização dos componentes e páginas.
- Padrão de formatação: 4 espaços de indentação, aspas simples (`'`), ponto e vírgula (`;`).
- Package manager: `yarn` (`yarn test`, `yarn start`, `yarn build`).
- Commits devem incluir a atribuição:
  `Co-Authored-By: Gemini <noreply@example.com>`
  `Co-Authored-By: https://github.com/PedroZef/PedroZef`
- Fidelidade visual ao mockup `docs/GitFind.png` (tema escuro `#1D2128`, barra `#2D333B`, links azuis `#539BF5`, textos `#FFFFFF` e `#999999`).

---

### Task 1: Setup do Ambiente de Testes e Componente Header com Styled-Components

**Files:**
- Create: `src/setupTests.js`
- Create: `src/components/Header/styles.js`
- Modify: `src/components/Header/index.js`
- Test: `src/components/Header/Header.test.js`

**Interfaces:**
- Consumes: nada
- Produces: `<Header />` que renderiza o cabeçalho superior escuro `#2D333B` com título "GitFind".

- [ ] **Step 1: Criar setupTests.js e escrever o teste de falha do Header**

Criar `src/setupTests.js`:
```javascript
import '@testing-library/jest-dom';
```

Criar `src/components/Header/Header.test.js`:
```javascript
import React from 'react';
import { render, screen } from '@testing-library/react';
import { Header } from './index';

describe('Header Component', () => {
    it('deve renderizar o título GitFind', () => {
        render(<Header />);
        const headingElement = screen.getByRole('heading', { level: 1 });
        expect(headingElement).toBeInTheDocument();
        expect(headingElement).toHaveTextContent('GitFind');
    });
});
```

- [ ] **Step 2: Executar o teste para verificar a falha**

Run: `yarn test --watchAll=false src/components/Header/Header.test.js`
Expected: FAIL (o Header atual renderiza "My GitFind" e não "GitFind").

- [ ] **Step 3: Implementar estilos com styled-components e atualizar o Header**

Criar `src/components/Header/styles.js`:
```javascript
import styled from 'styled-components';

export const HeaderContainer = styled.header`
    width: 100%;
    height: 60px;
    background-color: #2d333b;
    display: flex;
    align-items: center;
    justify-content: center;
`;

export const Title = styled.h1`
    font-family: Arial, Helvetica, sans-serif;
    color: #ffffff;
    font-size: 24px;
    font-weight: 700;
`;
```

Modificar `src/components/Header/index.js`:
```javascript
import React from 'react';
import { HeaderContainer, Title } from './styles';

const Header = () => {
    return (
        <HeaderContainer>
            <Title>GitFind</Title>
        </HeaderContainer>
    );
};

export { Header };
```

- [ ] **Step 4: Executar o teste para verificar se passa**

Run: `yarn test --watchAll=false src/components/Header/Header.test.js`
Expected: PASS

- [ ] **Step 5: Commit**

```bash
git add src/setupTests.js src/components/Header/
git commit -m "feat(header): configurar setupTests e implementar Header com styled-components`n`nCo-Authored-By: Gemini <noreply@example.com>`nCo-Authored-By: https://github.com/PedroZef/PedroZef"
```

---

### Task 2: Componentes Input e Button com Styled-Components

**Files:**
- Create: `src/components/Input/styles.js`
- Modify: `src/components/Input/index.js`
- Test: `src/components/Input/Input.test.js`
- Create: `src/components/Button/styles.js`
- Modify: `src/components/Button/index.js`
- Test: `src/components/Button/Button.test.js`

**Interfaces:**
- Consumes: propriedades padrão de inputs (`value`, `onChange`, `placeholder`, `name`, `aria-label`, etc.) e buttons (`onClick`, `disabled`, `children`).
- Produces:
  - `<Input value={val} onChange={fn} placeholder="@usuario" ... />`
  - `<Button onClick={fn} disabled={bool}>Buscar</Button>`

- [ ] **Step 1: Escrever os testes de falha para Input e Button**

Criar `src/components/Input/Input.test.js`:
```javascript
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Input } from './index';

describe('Input Component', () => {
    it('deve renderizar o input com o placeholder correto e disparar onChange', () => {
        const handleChange = jest.fn();
        render(
            <Input
                name="usuario"
                value="pedro"
                placeholder="@usuario"
                onChange={handleChange}
            />
        );

        const inputElement = screen.getByPlaceholderText('@usuario');
        expect(inputElement).toBeInTheDocument();
        expect(inputElement).toHaveValue('pedro');

        fireEvent.change(inputElement, { target: { value: 'pedrozef' } });
        expect(handleChange).toHaveBeenCalledTimes(1);
    });
});
```

Criar `src/components/Button/Button.test.js`:
```javascript
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Button } from './index';

describe('Button Component', () => {
    it('deve renderizar o botão com texto e disparar o clique', () => {
        const handleClick = jest.fn();
        render(<Button onClick={handleClick}>Buscar</Button>);

        const buttonElement = screen.getByRole('button', { name: /buscar/i });
        expect(buttonElement).toBeInTheDocument();

        fireEvent.click(buttonElement);
        expect(handleClick).toHaveBeenCalledTimes(1);
    });

    it('não deve disparar clique quando desabilitado', () => {
        const handleClick = jest.fn();
        render(<Button onClick={handleClick} disabled>Buscar</Button>);

        const buttonElement = screen.getByRole('button', { name: /buscar/i });
        expect(buttonElement).toBeDisabled();

        fireEvent.click(buttonElement);
        expect(handleClick).not.toHaveBeenCalled();
    });
});
```

- [ ] **Step 2: Executar os testes para verificar a falha**

Run: `yarn test --watchAll=false src/components/Input/Input.test.js src/components/Button/Button.test.js`
Expected: FAIL (Input e Button estão atualmente vazios).

- [ ] **Step 3: Implementar Input e Button com styled-components**

Criar `src/components/Input/styles.js`:
```javascript
import styled from 'styled-components';

export const StyledInput = styled.input`
    border: 1px solid rgba(255, 255, 255, 0.2);
    border-radius: 20px;
    background-color: #1d2128;
    color: #ffffff;
    font-size: 16px;
    padding: 10px 20px;
    outline: none;
    transition: border-color 0.2s ease, box-shadow 0.2s ease;
    width: 100%;

    &::placeholder {
        color: #999999;
    }

    &:focus {
        border-color: #539bf5;
        box-shadow: 0 0 0 2px rgba(83, 155, 245, 0.2);
    }
`;
```

Modificar `src/components/Input/index.js`:
```javascript
import React from 'react';
import { StyledInput } from './styles';

const Input = ({ name, value, onChange, placeholder, ...rest }) => {
    return (
        <StyledInput
            name={name}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            {...rest}
        />
    );
};

export { Input };
```

Criar `src/components/Button/styles.js`:
```javascript
import styled from 'styled-components';

export const StyledButton = styled.button`
    background-color: #2d333b;
    border: 1px solid rgba(255, 255, 255, 0.2);
    border-radius: 20px;
    color: #ffffff;
    font-size: 16px;
    padding: 10px 24px;
    cursor: pointer;
    transition: background-color 0.2s ease, opacity 0.2s ease;
    white-space: nowrap;

    &:hover:not(:disabled) {
        background-color: #373e47;
    }

    &:disabled {
        opacity: 0.5;
        cursor: not-allowed;
    }
`;
```

Modificar `src/components/Button/index.js`:
```javascript
import React from 'react';
import { StyledButton } from './styles';

const Button = ({ children, onClick, disabled, ...rest }) => {
    return (
        <StyledButton onClick={onClick} disabled={disabled} {...rest}>
            {children}
        </StyledButton>
    );
};

export { Button };
```

- [ ] **Step 4: Executar os testes para verificar se passam**

Run: `yarn test --watchAll=false src/components/Input/Input.test.js src/components/Button/Button.test.js`
Expected: PASS

- [ ] **Step 5: Commit**

```bash
git add src/components/Input/ src/components/Button/
git commit -m "feat(ui): implementar componentes Input e Button com styled-components`n`nCo-Authored-By: Gemini <noreply@example.com>`nCo-Authored-By: https://github.com/PedroZef/PedroZef"
```

---

### Task 3: Componente ItemList com Styled-Components

**Files:**
- Create: `src/components/ItemList/styles.js`
- Create: `src/components/ItemList/index.js`
- Test: `src/components/ItemList/ItemList.test.js`

**Interfaces:**
- Consumes: `title` (string), `description` (string), `link` (string)
- Produces: `<ItemList title="repo-nome" description="texto" link="https://github.com/..." />`

- [ ] **Step 1: Escrever o teste de falha para ItemList**

Criar `src/components/ItemList/ItemList.test.js`:
```javascript
import React from 'react';
import { render, screen } from '@testing-library/react';
import { ItemList } from './index';

describe('ItemList Component', () => {
    it('deve renderizar o título como link para o repositório e a descrição', () => {
        render(
            <ItemList
                title="fisiotheapp-challenge"
                description="Desafio técnico em React"
                link="https://github.com/usuario/fisiotheapp-challenge"
            />
        );

        const linkElement = screen.getByRole('link', { name: 'fisiotheapp-challenge' });
        expect(linkElement).toBeInTheDocument();
        expect(linkElement).toHaveAttribute('href', 'https://github.com/usuario/fisiotheapp-challenge');
        expect(linkElement).toHaveAttribute('target', '_blank');
        expect(linkElement).toHaveAttribute('rel', 'noreferrer');

        const descElement = screen.getByText('Desafio técnico em React');
        expect(descElement).toBeInTheDocument();
    });

    it('deve exibir fallback quando não houver descrição', () => {
        render(
            <ItemList
                title="repo-sem-desc"
                link="https://github.com/usuario/repo-sem-desc"
            />
        );

        expect(screen.getByText('Sem descrição informada.')).toBeInTheDocument();
    });
});
```

- [ ] **Step 2: Executar o teste para verificar a falha**

Run: `yarn test --watchAll=false src/components/ItemList/ItemList.test.js`
Expected: FAIL (o módulo ItemList ainda não existe).

- [ ] **Step 3: Implementar o ItemList com styled-components**

Criar `src/components/ItemList/styles.js`:
```javascript
import styled from 'styled-components';

export const ItemContainer = styled.div`
    margin: 20px 0;
`;

export const ItemTitleLink = styled.a`
    color: #539bf5;
    font-size: 20px;
    font-weight: 700;
    text-decoration: none;
    transition: text-decoration 0.2s ease;

    &:hover {
        text-decoration: underline;
    }
`;

export const ItemDescription = styled.p`
    color: #999999;
    font-size: 14px;
    margin: 8px 0 16px 0;
    line-height: 1.5;
`;

export const Divider = styled.hr`
    background-color: rgba(229, 229, 229, 0.2);
    border: none;
    height: 1px;
    margin: 16px 0;
`;
```

Criar `src/components/ItemList/index.js`:
```javascript
import React from 'react';
import { ItemContainer, ItemTitleLink, ItemDescription, Divider } from './styles';

const ItemList = ({ title, description, link }) => {
    return (
        <ItemContainer>
            <ItemTitleLink href={link} target="_blank" rel="noreferrer">
                {title}
            </ItemTitleLink>
            <ItemDescription>
                {description || 'Sem descrição informada.'}
            </ItemDescription>
            <Divider />
        </ItemContainer>
    );
};

export { ItemList };
```

- [ ] **Step 4: Executar o teste para verificar se passa**

Run: `yarn test --watchAll=false src/components/ItemList/ItemList.test.js`
Expected: PASS

- [ ] **Step 5: Commit**

```bash
git add src/components/ItemList/
git commit -m "feat(itemlist): implementar componente ItemList com styled-components`n`nCo-Authored-By: Gemini <noreply@example.com>`nCo-Authored-By: https://github.com/PedroZef/PedroZef"
```

---

### Task 4: Layout Principal da Home, Consumo da API do GitHub e Card de Perfil

**Files:**
- Create: `src/pages/Home/styles.js`
- Modify: `src/pages/Home/index.js`
- Test: `src/pages/Home/Home.test.js`

**Interfaces:**
- Consumes: `<Header />`, `<Input />`, `<Button />`, `gitlogo.png`, API do GitHub `/users/{username}` e `/users/{username}/repos`
- Produces: Tela principal com background do Octocat, formulário de busca, card de perfil com avatar, nome, handle, bio e mensagens de status.

- [ ] **Step 1: Escrever os testes de integração para a Home (Busca e Perfil)**

Criar `src/pages/Home/Home.test.js`:
```javascript
import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import App from './index';

describe('Home Page - Busca e Perfil', () => {
    afterEach(() => {
        jest.restoreAllMocks();
    });

    it('deve renderizar os elementos iniciais de busca e background', () => {
        render(<App />);

        expect(screen.getByText('GitFind')).toBeInTheDocument();
        expect(screen.getByPlaceholderText('@usuario')).toBeInTheDocument();
        expect(screen.getByRole('button', { name: /buscar/i })).toBeInTheDocument();
        expect(screen.getByAltText('GitHub Octocat Logo')).toBeInTheDocument();
    });

    it('deve buscar o usuário na API e exibir o card de perfil', async () => {
        const mockUser = {
            name: 'Pablo Henrique',
            login: 'pablohdev',
            avatar_url: 'https://avatars.githubusercontent.com/u/123456?v=4',
            bio: 'Full Stack Developer web and mobile'
        };

        const mockRepos = [
            {
                id: 1,
                name: 'fisiotheapp-challenge',
                description: 'Desafio React',
                html_url: 'https://github.com/pablohdev/fisiotheapp-challenge'
            }
        ];

        jest.spyOn(global, 'fetch').mockImplementation((url) => {
            if (url.includes('/repos')) {
                return Promise.resolve({
                    ok: true,
                    json: () => Promise.resolve(mockRepos)
                });
            }
            return Promise.resolve({
                ok: true,
                json: () => Promise.resolve(mockUser)
            });
        });

        render(<App />);

        const input = screen.getByPlaceholderText('@usuario');
        const button = screen.getByRole('button', { name: /buscar/i });

        fireEvent.change(input, { target: { value: 'pablohdev' } });
        fireEvent.click(button);

        await waitFor(() => {
            expect(screen.getByText('Pablo Henrique')).toBeInTheDocument();
        });

        expect(screen.getByText('@pablohdev')).toBeInTheDocument();
        expect(screen.getByText('Full Stack Developer web and mobile')).toBeInTheDocument();
        expect(screen.getByAltText('Avatar de Pablo Henrique')).toHaveAttribute('src', mockUser.avatar_url);
    });

    it('deve exibir mensagem de erro quando o usuário não for encontrado', async () => {
        jest.spyOn(global, 'fetch').mockImplementation(() =>
            Promise.resolve({
                ok: false,
                status: 404,
                json: () => Promise.resolve({ message: 'Not Found' })
            })
        );

        render(<App />);

        const input = screen.getByPlaceholderText('@usuario');
        const button = screen.getByRole('button', { name: /buscar/i });

        fireEvent.change(input, { target: { value: 'usuarioinexistente9999' } });
        fireEvent.click(button);

        await waitFor(() => {
            expect(screen.getByText('Usuário não encontrado!')).toBeInTheDocument();
        });
    });
});
```

- [ ] **Step 2: Executar o teste para verificar a falha**

Run: `yarn test --watchAll=false src/pages/Home/Home.test.js`
Expected: FAIL (a Home atual só possui o placeholder inicial).

- [ ] **Step 3: Implementar estilos da Home e lógica de busca do usuário com styled-components**

Criar `src/pages/Home/styles.js`:
```javascript
import styled from 'styled-components';

export const Container = styled.div`
    width: 100%;
    min-height: 100vh;
    background-color: #1d2128;
    position: relative;
    overflow-x: hidden;
`;

export const BackgroundLogo = styled.img`
    position: fixed;
    top: 50%;
    left: -120px;
    transform: translateY(-50%);
    height: 90vh;
    opacity: 0.15;
    pointer-events: none;
    user-select: none;

    @media (max-width: 900px) {
        height: 60vh;
        left: -150px;
        opacity: 0.08;
    }
`;

export const Content = styled.main`
    max-width: 780px;
    width: 90%;
    margin: 40px auto;
    display: flex;
    flex-direction: column;
    position: relative;
    z-index: 1;

    @media (min-width: 1024px) {
        margin-right: 10%;
        margin-left: auto;
    }
`;

export const SearchBar = styled.div`
    display: flex;
    gap: 12px;
    width: 100%;
    margin-bottom: 32px;

    @media (max-width: 480px) {
        flex-direction: column;
    }
`;

export const ProfileCard = styled.section`
    display: flex;
    flex-direction: column;
    margin-bottom: 24px;
`;

export const ProfileHeader = styled.div`
    display: flex;
    align-items: center;
    gap: 24px;
    margin-bottom: 20px;

    @media (max-width: 580px) {
        flex-direction: column;
        text-align: center;
    }
`;

export const Avatar = styled.img`
    width: 120px;
    height: 120px;
    border-radius: 50%;
    border: 2px solid rgba(255, 255, 255, 0.2);
    object-fit: cover;
`;

export const ProfileInfo = styled.div`
    display: flex;
    flex-direction: column;
`;

export const ProfileName = styled.h2`
    color: #ffffff;
    font-size: 24px;
    font-weight: 700;
    margin: 0;
`;

export const ProfileLogin = styled.span`
    color: #999999;
    font-size: 14px;
    margin-top: 4px;
`;

export const ProfileBio = styled.p`
    color: #999999;
    font-size: 14px;
    margin-top: 12px;
    line-height: 1.5;
`;

export const ProfileDivider = styled.hr`
    background-color: rgba(229, 229, 229, 0.2);
    border: none;
    height: 1px;
    margin-top: 24px;
    margin-bottom: 24px;
`;

export const MessageAlert = styled.div`
    color: ${(props) => (props.$error ? '#f85149' : '#999999')};
    background-color: ${(props) => (props.$error ? 'rgba(248, 81, 73, 0.1)' : 'transparent')};
    border: ${(props) => (props.$error ? '1px solid rgba(248, 81, 73, 0.4)' : 'none')};
    padding: ${(props) => (props.$error ? '12px 16px' : '8px 0')};
    border-radius: 8px;
    margin-bottom: 20px;
    font-size: 15px;
    text-align: center;
`;
```

Modificar `src/pages/Home/index.js`:
```javascript
import React, { useState } from 'react';
import { Header } from '../../components/Header';
import { Input } from '../../components/Input';
import { Button } from '../../components/Button';
import gitlogo from '../../assets/gitlogo.png';
import {
    Container,
    BackgroundLogo,
    Content,
    SearchBar,
    ProfileCard,
    ProfileHeader,
    Avatar,
    ProfileInfo,
    ProfileName,
    ProfileLogin,
    ProfileBio,
    ProfileDivider,
    MessageAlert
} from './styles';

function App() {
    const [user, setUser] = useState('');
    const [currentUser, setCurrentUser] = useState(null);
    const [repos, setRepos] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState(null);

    const handleGetData = async () => {
        const cleanUser = user.trim().replace(/^@/, '');
        if (!cleanUser) return;

        setIsLoading(true);
        setErrorMessage(null);

        try {
            const userDataResponse = await fetch(`https://api.github.com/users/${cleanUser}`);
            if (!userDataResponse.ok) {
                setCurrentUser(null);
                setRepos([]);
                setErrorMessage('Usuário não encontrado!');
                setIsLoading(false);
                return;
            }

            const newUser = await userDataResponse.json();
            const { avatar_url, name, login, bio } = newUser;
            setCurrentUser({ avatar_url, name: name || login, login, bio });

            const reposResponse = await fetch(`https://api.github.com/users/${cleanUser}/repos?sort=updated&per_page=100`);
            if (reposResponse.ok) {
                const newRepos = await reposResponse.json();
                setRepos(Array.isArray(newRepos) ? newRepos : []);
            }
        } catch (error) {
            setCurrentUser(null);
            setRepos([]);
            setErrorMessage('Erro ao conectar com a API do GitHub. Tente novamente mais tarde.');
        } finally {
            setIsLoading(false);
        }
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            handleGetData();
        }
    };

    return (
        <Container>
            <Header />
            <BackgroundLogo src={gitlogo} alt="GitHub Octocat Logo" />
            <Content>
                <SearchBar>
                    <Input
                        name="usuario"
                        value={user}
                        onChange={(event) => setUser(event.target.value)}
                        onKeyDown={handleKeyDown}
                        placeholder="@usuario"
                        aria-label="Buscar usuário no GitHub"
                    />
                    <Button onClick={handleGetData} disabled={isLoading}>
                        {isLoading ? 'Buscando...' : 'Buscar'}
                    </Button>
                </SearchBar>

                {errorMessage && (
                    <MessageAlert $error>{errorMessage}</MessageAlert>
                )}

                {currentUser && (
                    <ProfileCard>
                        <ProfileHeader>
                            <Avatar
                                src={currentUser.avatar_url}
                                alt={`Avatar de ${currentUser.name}`}
                            />
                            <ProfileInfo>
                                <ProfileName>{currentUser.name}</ProfileName>
                                <ProfileLogin>@{currentUser.login}</ProfileLogin>
                                <ProfileBio>
                                    {currentUser.bio || 'Este usuário não possui biografia.'}
                                </ProfileBio>
                            </ProfileInfo>
                        </ProfileHeader>
                        <ProfileDivider />
                    </ProfileCard>
                )}
            </Content>
        </Container>
    );
}

export default App;
```

- [ ] **Step 4: Executar o teste para verificar se passa**

Run: `yarn test --watchAll=false src/pages/Home/Home.test.js`
Expected: PASS

- [ ] **Step 5: Commit**

```bash
git add src/pages/Home/
git commit -m "feat(home): implementar layout styled-components, busca na API do GitHub e card de perfil`n`nCo-Authored-By: Gemini <noreply@example.com>`nCo-Authored-By: https://github.com/PedroZef/PedroZef"
```

---

### Task 5: Listagem de Repositórios e Filtro de Repositórios de Interesse

**Files:**
- Modify: `src/pages/Home/styles.js`
- Modify: `src/pages/Home/index.js`
- Test: `src/pages/Home/Home.test.js`

**Interfaces:**
- Consumes: `<ItemList />`, `currentUser`, `repos`
- Produces: Seção "Repositórios" com campo de busca/filtro local de interesse, lista dinâmica e filtrada em tempo real com `useMemo`.

- [ ] **Step 1: Adicionar testes de listagem e filtragem de repositórios em Home.test.js**

Modificar `src/pages/Home/Home.test.js` adicionando os testes para Repositórios:
```javascript
    it('deve listar os repositórios e permitir filtrar por repositórios de interesse', async () => {
        const mockUser = {
            name: 'Pablo Henrique',
            login: 'pablohdev',
            avatar_url: 'https://avatars.githubusercontent.com/u/123456?v=4',
            bio: 'Full Stack Developer'
        };

        const mockRepos = [
            {
                id: 1,
                name: 'fisiotheapp-challenge',
                description: 'Desafio React Native',
                html_url: 'https://github.com/pablohdev/fisiotheapp-challenge'
            },
            {
                id: 2,
                name: 'my-gitfind',
                description: 'Projeto busca github',
                html_url: 'https://github.com/pablohdev/my-gitfind'
            },
            {
                id: 3,
                name: 'api-nodejs',
                description: 'Backend em Express',
                html_url: 'https://github.com/pablohdev/api-nodejs'
            }
        ];

        jest.spyOn(global, 'fetch').mockImplementation((url) => {
            if (url.includes('/repos')) {
                return Promise.resolve({
                    ok: true,
                    json: () => Promise.resolve(mockRepos)
                });
            }
            return Promise.resolve({
                ok: true,
                json: () => Promise.resolve(mockUser)
            });
        });

        render(<App />);

        const inputUser = screen.getByPlaceholderText('@usuario');
        const button = screen.getByRole('button', { name: /buscar/i });

        fireEvent.change(inputUser, { target: { value: 'pablohdev' } });
        fireEvent.click(button);

        await waitFor(() => {
            expect(screen.getByRole('heading', { level: 3, name: 'Repositórios' })).toBeInTheDocument();
        });

        // Verifica renderização inicial de todos os repositórios
        expect(screen.getByText('fisiotheapp-challenge')).toBeInTheDocument();
        expect(screen.getByText('my-gitfind')).toBeInTheDocument();
        expect(screen.getByText('api-nodejs')).toBeInTheDocument();

        // Filtra por termo de interesse
        const filterInput = screen.getByPlaceholderText('Filtrar repositórios de interesse...');
        fireEvent.change(filterInput, { target: { value: 'gitfind' } });

        expect(screen.getByText('my-gitfind')).toBeInTheDocument();
        expect(screen.queryByText('fisiotheapp-challenge')).not.toBeInTheDocument();
        expect(screen.queryByText('api-nodejs')).not.toBeInTheDocument();

        // Filtro sem correspondência
        fireEvent.change(filterInput, { target: { value: 'termoinexistente' } });
        expect(screen.getByText('Nenhum repositório encontrado com o termo pesquisado.')).toBeInTheDocument();
    });
```

- [ ] **Step 2: Executar o teste para verificar a falha**

Run: `yarn test --watchAll=false src/pages/Home/Home.test.js`
Expected: FAIL (seção Repositórios e filtro ainda não estão implementados na Home).

- [ ] **Step 3: Adicionar styled-components da seção de repositórios e lógica de filtragem**

Em `src/pages/Home/styles.js`, adicionar:
```javascript
export const ReposSection = styled.section`
    width: 100%;
    margin-top: 10px;
`;

export const ReposTitle = styled.h3`
    color: #ffffff;
    font-size: 28px;
    font-weight: 700;
    text-align: center;
    margin-bottom: 24px;
`;

export const FilterWrapper = styled.div`
    width: 100%;
    margin-bottom: 24px;
`;

export const EmptyReposMessage = styled.p`
    color: #999999;
    font-size: 15px;
    text-align: center;
    margin: 32px 0;
`;
```

Em `src/pages/Home/index.js`, importar `useMemo`, `ItemList`, e os novos estilos, integrando o filtro:
```javascript
import React, { useState, useMemo } from 'react';
import { Header } from '../../components/Header';
import { Input } from '../../components/Input';
import { Button } from '../../components/Button';
import { ItemList } from '../../components/ItemList';
import gitlogo from '../../assets/gitlogo.png';
import {
    Container,
    BackgroundLogo,
    Content,
    SearchBar,
    ProfileCard,
    ProfileHeader,
    Avatar,
    ProfileInfo,
    ProfileName,
    ProfileLogin,
    ProfileBio,
    ProfileDivider,
    MessageAlert,
    ReposSection,
    ReposTitle,
    FilterWrapper,
    EmptyReposMessage
} from './styles';

function App() {
    const [user, setUser] = useState('');
    const [currentUser, setCurrentUser] = useState(null);
    const [repos, setRepos] = useState([]);
    const [repoFilter, setRepoFilter] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState(null);

    const handleGetData = async () => {
        const cleanUser = user.trim().replace(/^@/, '');
        if (!cleanUser) return;

        setIsLoading(true);
        setErrorMessage(null);
        setRepoFilter('');

        try {
            const userDataResponse = await fetch(`https://api.github.com/users/${cleanUser}`);
            if (!userDataResponse.ok) {
                setCurrentUser(null);
                setRepos([]);
                setErrorMessage('Usuário não encontrado!');
                setIsLoading(false);
                return;
            }

            const newUser = await userDataResponse.json();
            const { avatar_url, name, login, bio } = newUser;
            setCurrentUser({ avatar_url, name: name || login, login, bio });

            const reposResponse = await fetch(`https://api.github.com/users/${cleanUser}/repos?sort=updated&per_page=100`);
            if (reposResponse.ok) {
                const newRepos = await reposResponse.json();
                setRepos(Array.isArray(newRepos) ? newRepos : []);
            }
        } catch (error) {
            setCurrentUser(null);
            setRepos([]);
            setErrorMessage('Erro ao conectar com a API do GitHub. Tente novamente mais tarde.');
        } finally {
            setIsLoading(false);
        }
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            handleGetData();
        }
    };

    const filteredRepos = useMemo(() => {
        if (!repoFilter.trim()) return repos;
        const term = repoFilter.toLowerCase();
        return repos.filter(
            (repo) =>
                repo.name?.toLowerCase().includes(term) ||
                repo.description?.toLowerCase().includes(term)
        );
    }, [repos, repoFilter]);

    return (
        <Container>
            <Header />
            <BackgroundLogo src={gitlogo} alt="GitHub Octocat Logo" />
            <Content>
                <SearchBar>
                    <Input
                        name="usuario"
                        value={user}
                        onChange={(event) => setUser(event.target.value)}
                        onKeyDown={handleKeyDown}
                        placeholder="@usuario"
                        aria-label="Buscar usuário no GitHub"
                    />
                    <Button onClick={handleGetData} disabled={isLoading}>
                        {isLoading ? 'Buscando...' : 'Buscar'}
                    </Button>
                </SearchBar>

                {errorMessage && (
                    <MessageAlert $error>{errorMessage}</MessageAlert>
                )}

                {currentUser && (
                    <>
                        <ProfileCard>
                            <ProfileHeader>
                                <Avatar
                                    src={currentUser.avatar_url}
                                    alt={`Avatar de ${currentUser.name}`}
                                />
                                <ProfileInfo>
                                    <ProfileName>{currentUser.name}</ProfileName>
                                    <ProfileLogin>@{currentUser.login}</ProfileLogin>
                                    <ProfileBio>
                                        {currentUser.bio || 'Este usuário não possui biografia.'}
                                    </ProfileBio>
                                </ProfileInfo>
                            </ProfileHeader>
                            <ProfileDivider />
                        </ProfileCard>

                        <ReposSection>
                            <ReposTitle>Repositórios</ReposTitle>

                            {repos.length > 0 && (
                                <FilterWrapper>
                                    <Input
                                        name="filtro-repos"
                                        value={repoFilter}
                                        onChange={(event) => setRepoFilter(event.target.value)}
                                        placeholder="Filtrar repositórios de interesse..."
                                        aria-label="Filtrar repositórios de interesse"
                                    />
                                </FilterWrapper>
                            )}

                            {filteredRepos.length > 0 ? (
                                filteredRepos.map((repo) => (
                                    <ItemList
                                        key={repo.id}
                                        title={repo.name}
                                        description={repo.description}
                                        link={repo.html_url}
                                    />
                                ))
                            ) : repos.length > 0 ? (
                                <EmptyReposMessage>
                                    Nenhum repositório encontrado com o termo pesquisado.
                                </EmptyReposMessage>
                            ) : (
                                <EmptyReposMessage>
                                    Este usuário não possui repositórios públicos.
                                </EmptyReposMessage>
                            )}
                        </ReposSection>
                    </>
                )}
            </Content>
        </Container>
    );
}

export default App;
```

- [ ] **Step 4: Executar a suíte de testes para verificar se todos passam**

Run: `yarn test --watchAll=false src/pages/Home/Home.test.js`
Expected: PASS

- [ ] **Step 5: Commit**

```bash
git add src/pages/Home/
git commit -m "feat(repos): implementar listagem e filtro de repositórios de interesse com styled-components`n`nCo-Authored-By: Gemini <noreply@example.com>`nCo-Authored-By: https://github.com/PedroZef/PedroZef"
```

---

### Task 6: Verificação Completa e Limpeza

**Files:**
- Modify: `package.json` / `yarn.lock` (já com styled-components instalado)
- Test: Rodar todos os testes do projeto e build

- [ ] **Step 1: Rodar a suíte completa de testes**

Run: `yarn test --watchAll=false`
Expected: Todos os testes de Header, Input, Button, ItemList e Home passando com 100% de sucesso.

- [ ] **Step 2: Rodar o build de produção**

Run: `yarn build`
Expected: Build concluído com sucesso sem erros de compilação ou warnings.

- [ ] **Step 3: Commit final de verificação e package.json**

```bash
git add package.json yarn.lock
git commit -m "chore: adicionar styled-components às dependências`n`nCo-Authored-By: Gemini <noreply@example.com>`nCo-Authored-By: https://github.com/PedroZef/PedroZef"
```
