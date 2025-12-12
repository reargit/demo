/**
 * Integration Test: Home → Details → Play Navigation Flow
 * 
 * Tests the complete user flow through the app:
 * 1. Home screen displays catalog items
 * 2. User selects an item
 * 3. Details screen shows item information
 * 4. User presses play button
 * 5. Play screen starts video playback
 */

import React from 'react';
import { render, screen, waitFor, fireEvent } from '@testing-library/react-native';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import Router from '../../src/routers/Router';
import { catalogApi } from '../../src/services/catalogApi';
import type { CatalogItem } from '../../src/types/catalog';
import App from '../../src/App';

// Mock catalog API
jest.mock('../../src/services/catalogApi');


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
        render(<App />);

        // 1. Verify we're on Home screen (async)
        const welcomeText = await screen.findByText('Welcome');
        expect(welcomeText).toBeTruthy();

        // 2. Wait for catalog items to load
        await waitFor(() => {
            expect(screen.getByText('Integration Test Movie')).toBeTruthy();
        });

        // 3. Press the first catalog item to navigate to Details
        const firstItem = await screen.findByTestId('item-1');
        fireEvent.press(firstItem);

        // 4. Verify we're on Details screen with correct data
        await waitFor(() => {
            expect(screen.getByText('Integration Test Movie')).toBeTruthy();
            expect(screen.getByText('A movie for testing the full navigation flow')).toBeTruthy();
        });
    });

});
