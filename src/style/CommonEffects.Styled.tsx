import { css } from 'styled-components';
import { BoxShadow, AnimationDurTFn } from './utils';

export interface BoxShadowHoverFragmentProps {
    heightBefore: number;
    heightAfter: number;
}

export const BoxShadowHoverFragment = css<BoxShadowHoverFragmentProps>`
    transform: translateZ(0);

    &::before,
    &::after {
        content: ' ';
        position: absolute;
        transform: translateZ(0);
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        width: 100%;
        height: 100%;
        /* allow click through */
        pointer-events: none;
    }

    &::before {
        transition: opacity ${({ theme }) => AnimationDurTFn(theme, 'out')};
        box-shadow: ${({ heightBefore }) => BoxShadow(heightBefore)};
        opacity: 1;
    }

    &::after {
        transition: opacity ${({ theme }) => AnimationDurTFn(theme, 'out')};
        box-shadow: ${({ heightAfter }) => BoxShadow(heightAfter)};
        opacity: 0;
    }

    &:hover::before {
        transition: opacity ${({ theme }) => AnimationDurTFn(theme, 'in')};
        opacity: 0;
    }

    &:hover::after {
        transition: opacity ${({ theme }) => AnimationDurTFn(theme, 'in')};
        opacity: 1;
    }
`;
