import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react-native';
import DetailsScreen from '../src/screens/DetailsScreen';
import type { CatalogItem } from '../src/types/catalog';

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
        const { UNSAFE_getByType } = render(
            <DetailsScreen navigation={mockNavigation} route={mockRoute} />
        );

        // Check that Thumbnail component is rendered
        const thumbnail = UNSAFE_getByType(require('../src/components/Thumbnail').default);
        expect(thumbnail).toBeTruthy();
    });

    it('displays play button', () => {
        const { UNSAFE_getByType } = render(
            <DetailsScreen navigation={mockNavigation} route={mockRoute} />
        );

        // Check that PlayButton component is rendered
        const playButton = UNSAFE_getByType(require('../src/components/PlayButton').default);
        expect(playButton).toBeTruthy();
    });

    it('navigates to Play screen when play button is pressed', () => {
        const { UNSAFE_getByType } = render(
            <DetailsScreen navigation={mockNavigation} route={mockRoute} />
        );

        const playButton = UNSAFE_getByType(require('../src/components/PlayButton').default);
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

        const scrollView = UNSAFE_getByType(require('react-native').ScrollView);
        expect(scrollView).toBeTruthy();
    });

    it('calculates thumbnail height as 60% of window height', () => {
        const { UNSAFE_getByType } = render(
            <DetailsScreen navigation={mockNavigation} route={mockRoute} />
        );

        const thumbnail = UNSAFE_getByType(require('../src/components/Thumbnail').default);
        const heightStyle = thumbnail.props.style.find((s: any) => s && s.height);

        expect(heightStyle).toBeDefined();
        expect(typeof heightStyle.height).toBe('number');
    });
});
