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

// Mock only what's necessary - catalogApi and react-native-video
jest.mock('../../src/services/catalogApi');
jest.mock('react-native-video', () => {
    const React = require('react');
    return React.forwardRef((props: any, ref: any) =>
        React.createElement('Video', { ...props, ref })
    );
});

import React from 'react';
import { screen, waitFor, fireEvent } from '@testing-library/react-native';
import { render } from '../utils/testUtils';
import HomeScreen from '../../src/screens/HomeScreen';
import DetailsScreen from '../../src/screens/DetailsScreen';
import PlayScreen from '../../src/screens/PlayScreen';
import { catalogApi } from '../../src/services/catalogApi';
import type { CatalogItem } from '../../src/types/catalog';

// Mock navigation for integration flow
const createMockNavigation = () => {
    const navigation = {
        navigate: jest.fn(),
        goBack: jest.fn(),
        setOptions: jest.fn(),
        push: jest.fn(),
    } as any;
    return navigation;
};

const createMockRoute = (name: string, params?: any) => ({
    key: name.toLowerCase(),
    name,
    params,
} as any);


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
        const navigation = createMockNavigation();
        const route = createMockRoute('Home');

        // 1. Render Home screen
        const { rerender, getByTestId } = render(<HomeScreen navigation={navigation} route={route} />);

        // 2. Wait for catalog items to load
        await waitFor(() => {
            expect(screen.getByText('Integration Test Movie')).toBeTruthy();
        });

        // 3. Press the first catalog item
        const firstItem = getByTestId('item-1');
        fireEvent.press(firstItem);

        // 4. Verify navigation to Details was called
        expect(navigation.navigate).toHaveBeenCalledWith('Details', {
            item: mockItems[0],
        });

        // 5. Simulate navigating to Details screen
        const detailsNavigation = createMockNavigation();
        const detailsRoute = createMockRoute('Details', { item: mockItems[0] });

        rerender(<DetailsScreen navigation={detailsNavigation} route={detailsRoute} />);

        // 6. Verify Details screen content
        await waitFor(() => {
            expect(screen.getByText('Integration Test Movie')).toBeTruthy();
            expect(screen.getByText('A movie for testing the full navigation flow')).toBeTruthy();
        });

        // 7. Press the play button
        const playButton = screen.getByTestId('play-button');
        fireEvent.press(playButton);

        // 8. Verify navigation to Play screen
        expect(detailsNavigation.navigate).toHaveBeenCalledWith('Play', {
            uri: mockItems[0].streamUrl,
            thumbnail: mockItems[0].thumbnail,
        });

        // 9. Simulate navigating to Play screen
        const playNavigation = createMockNavigation();
        const playRoute = createMockRoute('Play', {
            uri: mockItems[0].streamUrl,
            thumbnail: mockItems[0].thumbnail,
        });

        rerender(<PlayScreen navigation={playNavigation} route={playRoute} />);

        // 10. Verify Play screen is rendered with video
        await waitFor(() => {
            expect(screen.getByTestId('video-player')).toBeTruthy();
        });
    });
});
