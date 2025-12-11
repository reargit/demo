export const colors = {
    // Backgrounds
    background: {
        primary: '#282c34',
        secondary: '#20232a',
        overlay: '#1a1d23',
        header: '#20232a',
    },

    // Text
    text: {
        primary: '#ffffff',
        secondary: '#999',
        accent: '#80cbc4',
    },

    // UI Elements
    border: {
        default: 'transparent',
        focus: '#80cbc4',
        subtle: '#444',
    },

    // Status/States
    status: {
        success: '#388e3c',
        error: '#c51162',
        warning: '#ff9800',
        info: '#80deea',
    },
} as const;

export type Colors = typeof colors;
