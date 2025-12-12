import React from 'react';
import { render, screen } from 'test-utils';
import DetailsScreen from 'src/screens/DetailsScreen';
import type { CatalogItem } from 'src/types/catalog';
import { Routes } from 'src/routers/routeTypes';


const mockNavigate = jest.fn();
const mockNavigation = {
    navigate: mockNavigate,
    goBack: jest.fn(),
    setOptions: jest.fn(),
} as any;

const mockItem: CatalogItem = {
    id: '1',
    title: 'Test Movie',
    description: 'This is a test movie description with some details about the content.',
    thumbnail: 'https://example.com/thumb.jpg',
    streamUrl: 'https://example.com/stream.mp4',
    duration: 120,
};

const mockRoute = {
    key: 'details',
    name: Routes.Details,
    params: { item: mockItem },
} as any;

describe('DetailsScreen', () => {
    beforeEach(() => {
        mockNavigate.mockClear();
    });

    it('renders item details correctly', () => {
        render(<DetailsScreen navigation={mockNavigation} route={mockRoute} />);

        expect(screen.getByText('Test Movie')).toBeTruthy();
        expect(screen.getByText('This is a test movie description with some details about the content.')).toBeTruthy();
    });

    it('displays thumbnail image', () => {
        render(
            <DetailsScreen navigation={mockNavigation} route={mockRoute} />
        );
        const thumbnail = screen.getByTestId('details-thumbnail');
        expect(thumbnail).toBeTruthy();
    });

    it('displays play button', () => {
        render(
            <DetailsScreen navigation={mockNavigation} route={mockRoute} />
        );
        const playButton = screen.getByTestId('play-button');
        expect(playButton).toBeTruthy();
    });

});
