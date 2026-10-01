import React from 'react';
import { ItemContainer, ItemTitleLink, ItemDescription, Divider } from './styles';

const ItemList = ({ title, description, link }) => {
    return (
        <ItemContainer>
            <ItemTitleLink href={link} target="_blank" rel="noreferrer">
                {title}
            </ItemTitleLink>
            <ItemDescription>
                {description || 'Sem descrição informada.'}
            </ItemDescription>
            <Divider />
        </ItemContainer>
    );
};

export { ItemList };
