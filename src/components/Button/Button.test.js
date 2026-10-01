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
