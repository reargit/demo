import React, { ReactElement } from 'react';
import { render, RenderOptions } from '@testing-library/react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const initialMetrics = {
    frame: { x: 0, y: 0, width: 390, height: 844 },
    insets: { top: 0, left: 0, right: 0, bottom: 0 },
};

const renderWithProviders = (
    ui: ReactElement,
    options?: Omit<RenderOptions, 'wrapper'>,
) => {
    // Create a fresh QueryClient for each test
    const queryClient = new QueryClient({
        defaultOptions: {
            queries: {
                retry: false,
            },
        },
    });

    return render(ui, {
        wrapper: ({ children }) => (
            <QueryClientProvider client={queryClient}>
                <SafeAreaProvider initialMetrics={initialMetrics}>
                    {children}
                </SafeAreaProvider>
            </QueryClientProvider>
        ),
        ...options,
    });
};

const renderApp = (
    ui: ReactElement,
    options?: Omit<RenderOptions, 'wrapper'>,
) => {
    return render(ui, {
        wrapper: ({ children }) => (
            <SafeAreaProvider initialMetrics={initialMetrics}>
                {children}
            </SafeAreaProvider>
        ),
        ...options,
    });
};


// Re-export everything from testing library
export * from '@testing-library/react-native';

// Override render with our custom version
export { renderWithProviders as render, renderApp };
