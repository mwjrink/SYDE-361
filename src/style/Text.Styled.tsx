import styled, { css } from 'styled-components';

interface TextThemeTemplate {
    fontFamily: string;
    fontSize: string;
    fontWeight: string;
    letterSpacing: string;
}

export function CreateStyledTextSnippet(obj: TextThemeTemplate) {
    return css`
        font-family: ${obj.fontFamily};
        font-size: ${obj.fontSize};
        font-weight: ${obj.fontWeight};
        letter-spacing: ${obj.letterSpacing};
        text-rendering: optimizeLegibility;
    `;
}

export const Text = {
    H1: styled.span`
        ${({ theme }) => CreateStyledTextSnippet(theme.text.Headline1)};
    `,
    H2: styled.span`
        ${({ theme }) => CreateStyledTextSnippet(theme.text.Headline2)};
    `,
    H3: styled.span`
        ${({ theme }) => CreateStyledTextSnippet(theme.text.Headline3)};
    `,
    H4: styled.span`
        ${({ theme }) => CreateStyledTextSnippet(theme.text.Headline4)};
    `,
    H5: styled.span`
        ${({ theme }) => CreateStyledTextSnippet(theme.text.Headline5)};
    `,
    H6: styled.span`
        ${({ theme }) => CreateStyledTextSnippet(theme.text.Headline6)};
    `,

    S1: styled.span`
        ${({ theme }) => CreateStyledTextSnippet(theme.text.Subtitle1)};
    `,
    S2: styled.span`
        ${({ theme }) => CreateStyledTextSnippet(theme.text.Subtitle2)};
    `,

    B1: styled.span`
        ${({ theme }) => CreateStyledTextSnippet(theme.text.Body1)};
    `,
    B2: styled.span`
        ${({ theme }) => CreateStyledTextSnippet(theme.text.Body2)};
    `,

    Button: styled.span`
        ${({ theme }) => CreateStyledTextSnippet(theme.text.Button)};
        text-transform: uppercase;
    `,
    Caption: styled.span`
        ${({ theme }) => CreateStyledTextSnippet(theme.text.Caption)};
    `,
    Overline: styled.span`
        ${({ theme }) => CreateStyledTextSnippet(theme.text.Overline)};
        text-transform: uppercase;
    `,
};
