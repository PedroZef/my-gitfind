import { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
    * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
    }

    body {
        font-family: Arial, Helvetica, sans-serif;
        background-color: #1d2128;
        color: #ffffff;
        line-height: 1.6;
    }

    hr {
        background-color: rgba(229, 229, 229, 0.2);
        border: none;
        height: 1px;
    }
`;
