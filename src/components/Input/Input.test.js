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
