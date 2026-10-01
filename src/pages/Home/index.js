import React, { useState } from 'react';
import { Header } from '../../components/Header';
import { Input } from '../../components/Input';
import { Button } from '../../components/Button';
import gitlogo from '../../assets/github.png';
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
