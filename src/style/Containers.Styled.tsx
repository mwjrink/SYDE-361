import styled, { css } from 'styled-components';
import { BoxShadow } from './utils';

export interface DefaultProps {
    materialHeight?: number;
}

export const defaults = css<DefaultProps>`
    border-radius: 2px;
    border: none;
    box-shadow: ${({ materialHeight }) => BoxShadow(materialHeight ?? 1)};
`;

export interface FlexProps {
    justifyContent?: string;
    alignItems?: string;
    flexDirection?: string;
    flex?: string;
    flexWrap?: string;
}

export const flex = css<FlexProps>`
    display: flex;
    justify-content: ${({ justifyContent }) => justifyContent ?? 'center'};
    align-items: ${({ alignItems }) => alignItems ?? 'center'};
    flex-direction: ${({ flexDirection }) => flexDirection ?? 'row'};
    flex: ${({ flex }) => flex ?? 'none'};
    flex-wrap: ${({ flexWrap }) => flexWrap ?? 'nowrap'};
`;

export const Card = styled.div<FlexProps & DefaultProps>`
    ${defaults}
    ${flex}
    background: ${({ theme }) => theme.colors.surface};
    color: ${({ theme }) => theme.colors.onSurface};
`;

export const Page = styled.div`
    position: relative;
    width: 100%;
    height: 90%;
    padding: 0px ${({ theme }) => theme.spacing.margin};
    background: ${({ theme }) => theme.colors.background};
    color: ${({ theme }) => theme.colors.onBackground};
`;

export interface SpacerProps {
    width?: string;
    height?: string;
}

export const Spacer = styled.div<SpacerProps>`
    width: ${({ width }) => width};
    height: ${({ height }) => height};
`;
