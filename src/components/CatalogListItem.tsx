import React, { useState } from 'react';
import { TouchableOpacity, Text, StyleSheet, ViewStyle, Image } from 'react-native';
import type { CatalogItem } from '../types/catalog';
import { colors, spacing, typography, focus } from '../theme';

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
            <Image
                source={{ uri: item.thumbnail }}
                style={[
                    styles.thumbnail,
                    focused ? styles.thumbnailFocused : null,
                ]}
                resizeMode="cover"
            />
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
        shadowColor: '#000',
        shadowOpacity: focus.shadowOpacity,
        shadowRadius: focus.shadowRadius,
        shadowOffset: focus.shadowOffset,
        elevation: focus.elevation,
    },
    thumbnail: {
        width: '100%',
        height: 120,
        borderRadius: 6,
        marginBottom: spacing.sm,
        backgroundColor: colors.background.overlay,
    },
    thumbnailFocused: {
        transform: [{ scale: focus.scale }],
    },
    itemTitle: {
        ...typography.body,
        color: colors.text.accent,
        marginBottom: 0,
    },
});

export default CatalogListItem;
