import React from 'react';
import { render, screen } from '@testing-library/react';
import { Footer } from './index';

describe('Footer Component', () => {
    it('deve renderizar o rodapé com os direitos autorais', () => {
        render(<Footer />);
        expect(screen.getByText(/Pedro Zeferino da Silva/i)).toBeInTheDocument();
    });
});
