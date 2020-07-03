import { createGlobalStyle } from 'styled-components';

interface GlobalStylesProps {
    settingsWidth?: string;
    settingsHeight?: string;
}

export const GlobalStyles = createGlobalStyle<GlobalStylesProps>`
    html, body {
        margin: 0;
        padding: 0;
        font-size: 16px;
        overflow: hidden;
        min-width: ${({ settingsWidth }) => settingsWidth ?? ''};
        width: ${({ settingsWidth }) => settingsWidth ?? ''};
        min-height: ${({ settingsHeight }) => settingsHeight ?? ''};
        height: ${({ settingsHeight }) => settingsHeight ?? ''};

        overscroll-behavior: none;
    }
    *, *::after, *::before {
        box-sizing: border-box;
    }
    body {
        align-items: center;
        background: ${({ theme }) => (theme as any).colors.background};
        color: #EFFFFA;
        display: flex;
        font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"${({
            theme,
        }) =>
            (theme as any).text.fonts.length
                ? ''
                : (theme as any).text.fonts.reduce((acc: string, cur: string) => acc + ', ' + cur, ', ')};
        height: 100vh;
        justify-content: center;
        text-rendering: optimizeLegibility;
    }
`;
