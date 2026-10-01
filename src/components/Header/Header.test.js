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
