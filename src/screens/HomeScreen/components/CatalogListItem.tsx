import React, { useState } from 'react';
import { TouchableOpacity, Text, StyleSheet, ViewStyle } from 'react-native';
import type { CatalogItem } from '../../../types/catalog';
import { colors, typography } from '../../../theme';
import Thumbnail from '../../../components/Thumbnail';
import { homeStyles } from '../styles';

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
            style={[homeStyles.catalogItem, focused ? styles.itemFocused : null, style]}
            onPress={() => onPress(item)}
            testID={testID ?? `item-${item.id}`}
            accessibilityRole="button"
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
            focusable={hasTVPreferredFocus}
        >
            <Thumbnail focused={focused} uri={item.thumbnail} style={homeStyles.catalogItemThumbnail} />
            <Text style={styles.itemTitle} numberOfLines={1}>{item.title}</Text>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
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
