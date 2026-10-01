import React from 'react';
import { StyledInput } from './styles';

const Input = ({ name, value, onChange, placeholder, ...rest }) => {
    return (
        <StyledInput
            name={name}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            {...rest}
        />
    );
};

export { Input };
