import React, { useState } from 'react';
import { TouchableOpacity, Text, StyleSheet, ViewStyle } from 'react-native';
import type { CatalogItem } from '../types/catalog';
import { colors, spacing, typography } from '../theme';
import Thumbnail from './Thumbnail';

export interface CatalogListItemProps {
    item: CatalogItem;
    onPress: (item: CatalogItem) => void;
    style?: ViewStyle;
    testID?: string;
    hasTVPreferredFocus?: boolean;
}

export const CatalogListItem: React.FC<CatalogListItemProps> = ({ item, onPress, style, testID, hasTVPreferredFocus }) => {
    const [focused, setFocused] = useState(false);
    return (
        <TouchableOpacity
            style={[styles.item, focused ? styles.itemFocused : null, style]}
            onPress={() => onPress(item)}
            testID={testID ?? `item-${item.id}`}
            accessibilityRole="button"
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
            focusable={hasTVPreferredFocus}
        >
            <Thumbnail focused={focused} uri={item.thumbnail} />
            <Text style={styles.itemTitle} numberOfLines={1}>{item.title}</Text>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    item: {
        flex: 1,
        backgroundColor: colors.background.secondary,
        padding: spacing.md,
        marginVertical: spacing.sm,
        borderRadius: 8,
        borderWidth: 2,
        borderColor: colors.border.default,
    },
    itemFocused: {
        borderColor: colors.border.focus,
        backgroundColor: colors.background.overlay,
    },
    itemTitle: {
        ...typography.body,
        color: colors.text.accent,
        marginBottom: 0,
    },
});

export default CatalogListItem;
