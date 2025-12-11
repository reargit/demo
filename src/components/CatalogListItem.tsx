import React from 'react';
import { TouchableOpacity, Text, StyleSheet, ViewStyle } from 'react-native';
import type { CatalogItem } from '../types/catalog';
import { colors, spacing, typography } from '../theme';

export interface CatalogListItemProps {
    item: CatalogItem;
    onPress: (item: CatalogItem) => void;
    style?: ViewStyle;
    testID?: string;
}

export const CatalogListItem: React.FC<CatalogListItemProps> = ({ item, onPress, style, testID }) => {
    return (
        <TouchableOpacity
            style={[styles.item, style]}
            onPress={() => onPress(item)}
            testID={testID ?? `item-${item.id}`}
            accessibilityRole="button"
        >
            <Text style={styles.itemTitle}>{item.title}</Text>
            <Text style={styles.itemDescription}>{item.description}</Text>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    item: {
        backgroundColor: colors.background.secondary,
        padding: spacing.lg,
        marginVertical: spacing.sm,
        borderRadius: 8,
        borderWidth: 2,
        borderColor: colors.border.default,
    },
    itemTitle: {
        ...typography.h2,
        color: colors.text.accent,
        marginBottom: 5,
    },
    itemDescription: {
        ...typography.body,
        color: colors.text.primary,
    },
});

export default CatalogListItem;
