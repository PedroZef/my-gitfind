import styled from 'styled-components';

export const StyledInput = styled.input`
    border: 1px solid rgba(255, 255, 255, 0.2);
    border-radius: 20px;
    background-color: #1d2128;
    color: #ffffff;
    font-size: 16px;
    padding: 10px 20px;
    outline: none;
    transition: border-color 0.2s ease, box-shadow 0.2s ease;
    width: 100%;

    &::placeholder {
        color: #999999;
    }

    &:focus {
        border-color: #539bf5;
        box-shadow: 0 0 0 2px rgba(83, 155, 245, 0.2);
    }
`;
