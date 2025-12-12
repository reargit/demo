import React, { ReactElement } from 'react';
import { render, RenderOptions } from '@testing-library/react-native';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';

interface TestProvidersProps {
    children: React.ReactNode;
}

const TestProviders = ({ children }: TestProvidersProps) => {
    const queryClient = new QueryClient({
        defaultOptions: {
            queries: {
                retry: false,
            },
        },
    });

    return (
        <SafeAreaProvider>
            <QueryClientProvider client={queryClient}>
                <NavigationContainer>
                    {children}
                </NavigationContainer>
            </QueryClientProvider>
        </SafeAreaProvider>
    );
};

const renderWithContext = (
    ui: ReactElement,
    options?: Omit<RenderOptions, 'wrapper'>,
) => {
    return render(ui, { wrapper: TestProviders, ...options });
};

// Re-export everything from testing library
export * from '@testing-library/react-native';

// Override render with our custom version
export { renderWithContext as render };
