import React from 'react';
import { HeaderContainer, Title, ThemeToggleButton } from './styles';

const Header = ({ themeMode, onToggleTheme }) => {
    return (
        <HeaderContainer>
            <Title>GitFind</Title>
            {onToggleTheme && (
                <ThemeToggleButton
                    onClick={onToggleTheme}
                    aria-label={`Alternar para tema ${themeMode === 'dark' ? 'claro' : 'escuro'}`}
                    title={`Alternar para tema ${themeMode === 'dark' ? 'claro' : 'escuro'}`}
                >
                    {themeMode === 'dark' ? '☀️' : '🌙'}
                </ThemeToggleButton>
            )}
        </HeaderContainer>
    );
};

export { Header };
