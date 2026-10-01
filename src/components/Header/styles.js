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
    background-color: #ffd700;
    color: #1d2128;
    border: none;
    border-radius: 20px;
    padding: 8px 16px;
    font-size: 13px;
    font-weight: 700;
    cursor: pointer;
    display: flex;
    align-items: center;
    gap: 6px;
    box-shadow: 0 0 14px rgba(83, 155, 245, 0.85), 0 2px 6px rgba(0, 0, 0, 0.25);
    transition: transform 0.2s ease, box-shadow 0.2s ease, background-color 0.2s ease;

    &:hover {
        background-color: #ffcc00;
        transform: translateY(-50%) scale(1.05);
        box-shadow: 0 0 20px rgba(83, 155, 245, 1), 0 4px 10px rgba(0, 0, 0, 0.35);
    }

    &:active {
        transform: translateY(-50%) scale(0.98);
    }

    @media (max-width: 480px) {
        padding: 6px 10px;
        font-size: 12px;
        right: 12px;
    }
`;
