export const focus = {
    ringColor: '#61DAFB',
    elevation: 4,
    shadowOpacity: 0.4,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 4 } as const,
    scale: 1.03,
} as const;

export type FocusTokens = typeof focus;
