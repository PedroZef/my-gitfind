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
