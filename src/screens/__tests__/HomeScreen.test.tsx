import React from 'react';
import { renderApiScreen, screen, waitFor } from 'test-utils';
import HomeScreen from 'src/screens/HomeScreen/HomeScreen';
import { catalogApi } from 'src/services/catalogApi';
import type { CatalogItem } from 'src/types/catalog';
import { Routes } from 'src/routers/routeTypes';

const mockNavigate = jest.fn();
const mockNavigation = {
    navigate: jest.fn(),
} as any;

const mockRoute = {
    key: 'home',
    name: Routes.Home,
} as any;

jest.mock('src/services/catalogApi', () => ({
    catalogApi: {
        getAllItems: jest.fn(),
    },
}));

const mockItems: CatalogItem[] = [
    {
        id: '1',
        title: 'Test Item 1',
        description: 'Description 1',
        thumbnail: 'https://example.com/thumb1.jpg',
        streamUrl: 'https://example.com/stream1.mp4',
        duration: 120,
    },
    {
        id: '2',
        title: 'Test Item 2',
        description: 'Description 2',
        thumbnail: 'https://example.com/thumb2.jpg',
        streamUrl: 'https://example.com/stream2.mp4',
        duration: 180,
    },
];

describe('HomeScreen', () => {
    beforeEach(() => {
        mockNavigate.mockClear();
        jest.clearAllMocks();
    });

    const renderHomeScreen = () => {
        return renderApiScreen(
            <HomeScreen navigation={mockNavigation} route={mockRoute} />
        );
    };

    it('displays loading state initially', async () => {
        (catalogApi.getAllItems as jest.Mock).mockImplementation(
            () => new Promise(() => { })
        );

        renderHomeScreen();

        await waitFor(() => {
            expect(screen.getByText('Welcome')).toBeTruthy();
            // Skeletons are shown during loading
            expect(screen.getByTestId('skeleton-0')).toBeTruthy();
            expect(screen.getByTestId('skeleton-5')).toBeTruthy();
        });
    });

    it('displays catalog items on successful load', async () => {
        (catalogApi.getAllItems as jest.Mock).mockResolvedValue(mockItems);

        renderHomeScreen();

        // First verify skeletons are shown during loading
        await waitFor(() => {
            expect(screen.getByTestId('skeleton-0')).toBeTruthy();
        });

        // Then verify items appear after loading
        await waitFor(() => {
            expect(screen.getByText('Test Item 1')).toBeTruthy();
            expect(screen.getByText('Test Item 2')).toBeTruthy();
        }, { timeout: 3000 });
    });

    it('displays error message when API fails', async () => {
        (catalogApi.getAllItems as jest.Mock).mockRejectedValue(new Error('API Error'));

        renderHomeScreen();

        await waitFor(() => {
            const errorTexts = screen.getAllByText('Failed to load catalog');
            expect(errorTexts.length > 0).toBeTruthy();
            expect(screen.getByText('Tap to retry')).toBeTruthy();
        });
    });

    it('displays "No items" when catalog is empty', async () => {
        (catalogApi.getAllItems as jest.Mock).mockResolvedValue([]);

        renderHomeScreen();

        // First verify skeletons are shown during loading
        await waitFor(() => {
            expect(screen.getByTestId('skeleton-0')).toBeTruthy();
        });

        // Then verify empty state appears after loading completes
        await waitFor(() => {
            expect(screen.getByText('No items')).toBeTruthy();
        }, { timeout: 3000 });
    });
});

