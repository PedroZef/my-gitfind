import { StyledButton } from './styles';

const Button = ({ children, onClick, disabled, ...rest }) => {
    return (
        <StyledButton onClick={onClick} disabled={disabled} {...rest}>
            {children}
        </StyledButton>
    );
};

export { Button };
