import styled from 'styled-components';

export const StyledButton = styled.button`
    background-color: #2d333b;
    border: 1px solid rgba(255, 255, 255, 0.2);
    border-radius: 20px;
    color: #ffffff;
    font-size: 16px;
    padding: 10px 24px;
    cursor: pointer;
    transition: background-color 0.2s ease, opacity 0.2s ease;
    white-space: nowrap;

    &:hover:not(:disabled) {
        background-color: #373e47;
    }

    &:disabled {
        opacity: 0.5;
        cursor: not-allowed;
    }
`;
