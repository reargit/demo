import React from 'react';
import { render, screen, waitFor } from '@testing-library/react-native';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import HomeScreen from '../src/screens/HomeScreen';
import { catalogApi } from '../src/services/catalogApi';

jest.mock('../src/services/catalogApi');

const mockedCatalogApi = catalogApi as jest.Mocked<typeof catalogApi>;

function renderWithProviders(ui: React.ReactElement) {
    const client = new QueryClient();
    return render(<QueryClientProvider client={client}>{ui}</QueryClientProvider>);
}

const navigation: any = { navigate: jest.fn() };

describe('HomeScreen', () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    it('shows loading state initially', async () => {
        mockedCatalogApi.getAllItems.mockResolvedValueOnce([]);
        renderWithProviders(<HomeScreen navigation={navigation} route={{}} /> as any);
        expect(screen.getByAccessibilityLabel('loading-row')).toBeTruthy();
        await waitFor(() => {
            expect(mockedCatalogApi.getAllItems).toHaveBeenCalled();
        });
    });

    it('renders items from API', async () => {
        mockedCatalogApi.getAllItems.mockResolvedValueOnce([
            { id: 'bbb-hls', title: 'Big Buck Bunny', description: 'HLS stream' },
        ] as any);
        renderWithProviders(<HomeScreen navigation={navigation} route={{}} /> as any);

        await screen.findByText('Big Buck Bunny');
        expect(screen.getByText('HLS stream')).toBeTruthy();
    });

    it('shows error state when API fails', async () => {
        mockedCatalogApi.getAllItems.mockRejectedValueOnce(new Error('boom'));
        renderWithProviders(<HomeScreen navigation={navigation} route={{}} /> as any);

        await screen.findByText('Failed to load catalog');
        expect(screen.getByText('Failed to load catalog')).toBeTruthy();
    });
});
