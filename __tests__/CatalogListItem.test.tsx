import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react-native';
import CatalogListItem from '../src/components/CatalogListItem';

describe('CatalogListItem', () => {
    it('renders title and description', () => {
        const item = { id: '1', title: 'Title', description: 'Desc' } as any;
        render(<CatalogListItem item={item} onPress={jest.fn()} />);
        expect(screen.getByText('Title')).toBeTruthy();
        expect(screen.getByText('Desc')).toBeTruthy();
    });

    it('calls onPress with item', () => {
        const item = { id: '1', title: 'Title', description: 'Desc' } as any;
        const onPress = jest.fn();
        render(<CatalogListItem item={item} onPress={onPress} />);
        fireEvent.press(screen.getByTestId('item-1'));
        expect(onPress).toHaveBeenCalledWith(item);
    });
});
