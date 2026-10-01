import styled from 'styled-components';

export const HeaderContainer = styled.header`
    width: 100%;
    height: 64px;
    background-color: ${({ theme }) => theme.headerBg || '#2d333b'};
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    border-bottom: 2px solid rgba(83, 155, 245, 0.5);
    box-shadow: 0 4px 18px rgba(83, 155, 245, 0.45);
    z-index: 10;
    transition: background-color 0.3s ease, border-color 0.3s ease;
`;

export const Title = styled.h1`
    font-family: Arial, Helvetica, sans-serif;
    color: ${({ theme }) => (theme.headerBg === '#ffffff' ? '#24292f' : '#ffffff')};
    font-size: 24px;
    font-weight: 700;
    letter-spacing: 0.5px;
    transition: color 0.3s ease;
`;

export const ThemeToggleButton = styled.button`
    position: absolute;
    right: 24px;
    top: 50%;
    transform: translateY(-50%);
    width: 38px;
    height: 38px;
    border-radius: 50%;
    background-color: #79c0ff;
    color: #0d1117;
    border: none;
    padding: 0;
    font-size: 18px;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: 0 0 14px rgba(83, 155, 245, 0.85), 0 2px 6px rgba(0, 0, 0, 0.25);
    transition: transform 0.2s ease, box-shadow 0.2s ease, background-color 0.2s ease;

    &:hover {
        background-color: #a5d6ff;
        transform: translateY(-50%) scale(1.1);
        box-shadow: 0 0 20px rgba(83, 155, 245, 1), 0 4px 10px rgba(0, 0, 0, 0.35);
    }

    &:active {
        transform: translateY(-50%) scale(0.95);
    }

    @media (max-width: 480px) {
        width: 34px;
        height: 34px;
        font-size: 16px;
        right: 14px;
    }
`;
