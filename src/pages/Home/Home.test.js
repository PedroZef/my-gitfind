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
