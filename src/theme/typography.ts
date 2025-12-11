import { TextStyle } from 'react-native';

export const fontSize = {
    xs: 12,
    sm: 14,
    md: 16,
    lg: 18,
    xl: 24,
    xxl: 36,
} as const;

export const fontWeight = {
    regular: '400',
    medium: '500',
    semiBold: '600',
    bold: '700',
} as const;

export const typography = {
    h1: {
        fontSize: fontSize.xxl,
        fontWeight: fontWeight.bold,
        lineHeight: 44,
    } as TextStyle,

    h2: {
        fontSize: fontSize.xl,
        fontWeight: fontWeight.bold,
        lineHeight: 32,
    } as TextStyle,

    body: {
        fontSize: fontSize.md,
        fontWeight: fontWeight.regular,
        lineHeight: 24,
    } as TextStyle,

    bodyLarge: {
        fontSize: fontSize.lg,
        fontWeight: fontWeight.regular,
        lineHeight: 28,
    } as TextStyle,

    caption: {
        fontSize: fontSize.sm,
        fontWeight: fontWeight.regular,
        lineHeight: 20,
    } as TextStyle,
} as const;

export type Typography = typeof typography;
