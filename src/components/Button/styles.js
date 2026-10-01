import styled from 'styled-components';

export const StyledButton = styled.button`
    background-color: ${({ theme }) => theme.buttonBg || '#2d333b'};
    border: 1px solid ${({ theme }) => theme.cardBorder || 'rgba(255, 255, 255, 0.2)'};
    border-radius: 20px;
    color: ${({ theme }) => theme.buttonText || '#ffffff'};
    font-size: 16px;
    padding: 10px 24px;
    cursor: pointer;
    transition: background-color 0.2s ease, opacity 0.2s ease, transform 0.1s ease;
    white-space: nowrap;

    &:hover:not(:disabled) {
        opacity: 0.9;
        transform: scale(1.02);
    }

    &:disabled {
        opacity: 0.5;
        cursor: not-allowed;
    }
`;
