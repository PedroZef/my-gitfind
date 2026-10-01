import React from 'react';
import { HeaderContainer, Title, ThemeToggleButton } from './styles';

const Header = ({ themeMode, onToggleTheme }) => {
    return (
        <HeaderContainer>
            <Title>GitFind</Title>
            {onToggleTheme && (
                <ThemeToggleButton
                    onClick={onToggleTheme}
                    aria-label="Alternar tema claro e escuro"
                    title={`Alternar para modo ${themeMode === 'dark' ? 'claro' : 'escuro'}`}
                >
                    {themeMode === 'dark' ? '☀️ Light' : '🌙 Dark'}
                </ThemeToggleButton>
            )}
        </HeaderContainer>
    );
};

export { Header };
