import styled from 'styled-components';

export const ItemContainer = styled.div`
    margin: 20px 0;
`;

export const ItemTitleLink = styled.a`
    color: #f1871d;
    font-size: 20px;
    font-weight: 700;
    text-decoration: none;
    transition: text-decoration 0.2s ease;

    &:hover {
        text-decoration: underline;
    }
`;

export const ItemDescription = styled.p`
    color: #b9b2b2;
    font-size: 14px;
    margin: 8px 0 16px 0;
    line-height: 1.5;
`;

export const Divider = styled.hr`
    background-color: ${({ theme }) => theme.divider || 'rgba(229, 229, 229, 0.2)'};
    border: none;
    height: 1px;
    margin: 16px 0;
`;
