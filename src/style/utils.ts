import { umbraMap, penumbraMap, ambientMap } from './lightingMaps';

export function BoxShadow(height: number): string {
    return `
        ${umbraMap[height]} rgba(0,0,0,.2),
        ${penumbraMap[height]} rgba(0,0,0,.14),
        ${ambientMap[height]} rgba(0,0,0,.12);
        `;
}

export function AnimationDurTFn(theme: any, animIn: 'out' | 'in' | boolean) {
    if (animIn === 'in' || animIn === true) return [theme.animation.inSpeed, theme.animation.inTimingFn].join(' ');
    if (animIn === 'out' || animIn === false) return [theme.animation.outSpeed, theme.animation.outTimingFn].join(' ');
}
