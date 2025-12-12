import React from 'react';
import { renderApiScreen, screen, waitFor, fireEvent } from './utils/testUtils';
import HomeScreen from '../src/screens/HomeScreen';
import { catalogApi } from '../src/services/catalogApi';
import type { CatalogItem } from '../src/types/catalog';
import { Routes } from '../src/routers/routeTypes';

// Mock navigation
const mockNavigate = jest.fn();
const mockNavigation = {
    navigate: mockNavigate,
    goBack: jest.fn(),
    setOptions: jest.fn(),
} as any;

const mockRoute = {
    key: Routes.Details,
    name: Routes.Details,
} as any;

// Mock catalog API
jest.mock('../src/services/catalogApi', () => ({
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

    it('displays loading state initially', () => {
        (catalogApi.getAllItems as jest.Mock).mockImplementation(
            () => new Promise(() => { }) // Never resolves
        );

        renderHomeScreen();

        expect(screen.getByText('Welcome')).toBeTruthy();
        expect(screen.getByLabelText('loading-row')).toBeTruthy();
        expect(screen.getByText('Loading…')).toBeTruthy();
    });

    it('displays catalog items on successful load', async () => {
        (catalogApi.getAllItems as jest.Mock).mockResolvedValue(mockItems);

        renderHomeScreen();

        await waitFor(() => {
            expect(screen.getByText('Test Item 1')).toBeTruthy();
            expect(screen.getByText('Test Item 2')).toBeTruthy();
        });
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

        await waitFor(() => {
            expect(screen.getByText('No items')).toBeTruthy();
        });
    });

    it('navigates to Details screen when item is pressed', async () => {
        (catalogApi.getAllItems as jest.Mock).mockResolvedValue(mockItems);

        const { getByTestId } = renderHomeScreen();

        await waitFor(() => {
            expect(screen.getByText('Test Item 1')).toBeTruthy();
        });

        const item = getByTestId('item-1');
        fireEvent.press(item);

        expect(mockNavigate).toHaveBeenCalledWith('Details', {
            item: mockItems[0],
        });
    });

    it('renders grid with 3 columns', async () => {
        (catalogApi.getAllItems as jest.Mock).mockResolvedValue(mockItems);

        const { getByTestId } = renderHomeScreen();

        await waitFor(() => {
            expect(getByTestId('item-1')).toBeTruthy();
            expect(getByTestId('item-2')).toBeTruthy();
        });
    });
});

