/**
 * TRUE Integration Test: Home → Details → Play Navigation Flow
 * 
 * This is a real integration test that:
 * - Renders the full App with NavigationContainer
 * - Allows real navigation to happen when buttons are pressed
 * - No manual rerendering or navigation mocking
 */

// Mock catalogApi
jest.mock('../../src/services/catalogApi', () => ({
    catalogApi: {
        getAllItems: jest.fn(),
    },
}));

// Mock react-native-video
jest.mock('react-native-video', () => {
    const React = require('react');
    return React.forwardRef((props: any, ref: any) =>
        React.createElement('Video', { ...props, ref, testID: props.testID })
    );
});

import React from 'react';
import { render, screen, waitFor, fireEvent } from '@testing-library/react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import App from '../../src/App';
import { catalogApi } from '../../src/services/catalogApi';
import type { CatalogItem } from '../../src/types/catalog';

// Provide initial metrics for SafeAreaProvider
const initialMetrics = {
    frame: { x: 0, y: 0, width: 390, height: 844 },
    insets: { top: 0, left: 0, right: 0, bottom: 0 },
};

// Render with SafeAreaProvider to avoid context issues
function renderWithProviders(ui: React.ReactElement) {
    return render(
        <SafeAreaProvider initialMetrics={initialMetrics}>
            {ui}
        </SafeAreaProvider>
    );
}

const mockItems: CatalogItem[] = [
    {
        id: '1',
        title: 'Integration Test Movie',
        description: 'A movie for testing the full navigation flow',
        thumbnail: 'https://example.com/thumb1.jpg',
        streamUrl: 'https://example.com/stream1.mp4',
        duration: 120,
    },
    {
        id: '2',
        title: 'Second Test Movie',
        description: 'Another test movie',
        thumbnail: 'https://example.com/thumb2.jpg',
        streamUrl: 'https://example.com/stream2.mp4',
        duration: 180,
    },
];

describe('Integration: Home → Details → Play Navigation Flow', () => {
    beforeEach(() => {
        jest.clearAllMocks();
        (catalogApi.getAllItems as jest.Mock).mockResolvedValue(mockItems);
    });

    it('completes full navigation flow from Home to Details to Play', async () => {
        // Render the full App - real integration test!
        renderWithProviders(<App />);

        // 1. Wait for Home screen to load with catalog items
        await waitFor(() => {
            expect(screen.getByText('Welcome')).toBeTruthy();
            expect(screen.getByText('Integration Test Movie')).toBeTruthy();
        }, { timeout: 3000 });

        // 2. Press the first catalog item - navigation happens automatically
        const firstItem = screen.getByTestId('item-1');
        fireEvent.press(firstItem);

        // 3. Wait for Details screen to appear with item details
        await waitFor(() => {
            expect(screen.getByText('Integration Test Movie')).toBeTruthy();
            expect(screen.getByText('A movie for testing the full navigation flow')).toBeTruthy();
        }, { timeout: 2000 });

        // 4. Press the play button - navigation happens automatically
        const playButton = screen.getByTestId('play-button');
        fireEvent.press(playButton);

        // 5. Wait for Play screen with video player to appear
        await waitFor(() => {
            expect(screen.getByTestId('video-player')).toBeTruthy();
        }, { timeout: 2000 });
    });
});
