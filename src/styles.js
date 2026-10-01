import { createGlobalStyle } from 'styled-components';

export const darkTheme = {
    name: 'dark',
    background: '#1d2128',
    headerBg: '#2d333b',
    text: '#ffffff',
    textSecondary: '#999999',
    cardBorder: 'rgba(255, 255, 255, 0.2)',
    inputBg: '#1d2128',
    inputText: '#ffffff',
    buttonBg: '#2d333b',
    buttonText: '#ffffff',
    divider: 'rgba(229, 229, 229, 0.2)',
    repoTitle: '#f1871d',
    repoDesc: '#b9b2b2',
};

export const lightTheme = {
    name: 'light',
    background: '#f6f8fa',
    headerBg: '#ffffff',
    text: '#24292f',
    textSecondary: '#57606a',
    cardBorder: 'rgba(0, 0, 0, 0.15)',
    inputBg: '#ffffff',
    inputText: '#24292f',
    buttonBg: '#24292f',
    buttonText: '#ffffff',
    divider: 'rgba(0, 0, 0, 0.12)',
    repoTitle: '#f1871d',
    repoDesc: '#57606a',
};

export const GlobalStyle = createGlobalStyle`
    * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
    }

    body {
        font-family: Arial, Helvetica, sans-serif;
        background-color: ${({ theme }) => theme.background || '#1d2128'};
        color: ${({ theme }) => theme.text || '#ffffff'};
        line-height: 1.6;
        transition: background-color 0.3s ease, color 0.3s ease;
    }

    hr {
        background-color: ${({ theme }) => theme.divider || 'rgba(229, 229, 229, 0.2)'};
        border: none;
        height: 1px;
    }
`;
