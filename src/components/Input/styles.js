import styled from 'styled-components';

export const StyledInput = styled.input`
    border: 1px solid ${({ theme }) => theme.cardBorder || 'rgba(255, 255, 255, 0.2)'};
    border-radius: 20px;
    background-color: ${({ theme }) => theme.inputBg || '#1d2128'};
    color: ${({ theme }) => theme.inputText || '#ffffff'};
    font-size: 16px;
    padding: 10px 20px;
    outline: none;
    transition: border-color 0.2s ease, box-shadow 0.2s ease, background-color 0.3s ease, color 0.3s ease;
    width: 100%;

    &::placeholder {
        color: ${({ theme }) => theme.textSecondary || '#999999'};
    }

    &:focus {
        border-color: #539bf5;
        box-shadow: 0 0 0 2px rgba(83, 155, 245, 0.25);
    }
`;
