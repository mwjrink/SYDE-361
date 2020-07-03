import styled from "styled-components";

interface DividerProps {
    shown: boolean;
}

export const Divider = styled.hr<DividerProps>`
    margin: 0 1rem;
    padding: 0;
    border: none;
    height: ${({ shown }) => shown ? '1' : '0'}px;
    background: ${({ theme }) => theme.colors.unfocusedLight};
    opacity: ${({ shown }) => shown ? '1' : '0'};
    width: 100%;
`;
