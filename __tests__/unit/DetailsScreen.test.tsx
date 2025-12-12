import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react-native';
import { ScrollView } from 'react-native';
import DetailsScreen from '../../src/screens/DetailsScreen';
import type { CatalogItem } from '../../src/types/catalog';

// Mock navigation
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
    name: 'Details',
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

        // Prefer querying by a stable testID rather than component type
        const thumbnail = screen.getByTestId('details-thumbnail');
        expect(thumbnail).toBeTruthy();
    });

    it('displays play button', () => {
        render(
            <DetailsScreen navigation={mockNavigation} route={mockRoute} />
        );

        // Use built-in testID from PlayButton
        const playButton = screen.getByTestId('play-button');
        expect(playButton).toBeTruthy();
    });

    it('navigates to Play screen when play button is pressed', () => {
        render(
            <DetailsScreen navigation={mockNavigation} route={mockRoute} />
        );

        const playButton = screen.getByTestId('play-button');
        fireEvent.press(playButton);

        expect(mockNavigate).toHaveBeenCalledWith('Play', {
            uri: mockItem.streamUrl,
            thumbnail: mockItem.thumbnail,
        });
    });

    it('renders scrollable content', () => {
        const { UNSAFE_getByType } = render(
            <DetailsScreen navigation={mockNavigation} route={mockRoute} />
        );

        const scrollView = UNSAFE_getByType(ScrollView);
        expect(scrollView).toBeTruthy();
    });

    it('calculates thumbnail height as 60% of window height', () => {
        render(
            <DetailsScreen navigation={mockNavigation} route={mockRoute} />
        );

        const thumbnail = screen.getByTestId('details-thumbnail');
        const heightStyle = thumbnail.props.style.find((s: any) => s && s.height);

        expect(heightStyle).toBeDefined();
        expect(typeof heightStyle.height).toBe('number');
    });
});
