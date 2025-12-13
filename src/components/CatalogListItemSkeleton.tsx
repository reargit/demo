import React from 'react';
import { View, StyleSheet, ViewStyle } from 'react-native';
import { colors, spacing } from '../theme';
import SkeletonView from './SkeletonView';

export interface CatalogListItemSkeletonProps {
    style?: ViewStyle;
    testID?: string;
}

const CatalogListItemSkeleton: React.FC<CatalogListItemSkeletonProps> = ({ style, testID }) => {
    return (
        <View
            style={[styles.container, style]}
            testID={testID}
        >
            {/* Thumbnail skeleton */}
            <SkeletonView style={styles.thumbnail} />

            {/* Title skeleton */}
            <SkeletonView style={styles.title} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.background.secondary,
        padding: spacing.md,
        marginVertical: spacing.sm,
        borderRadius: 8,
        borderWidth: 2,
        borderColor: colors.border.default,
    },
    thumbnail: {
        width: '100%',
        height: 120,
        backgroundColor: colors.background.skeleton,
        borderRadius: 4,
        marginBottom: spacing.sm,
    },
    title: {
        width: '70%',
        height: 16,
        backgroundColor: colors.background.skeleton,
        borderRadius: 4,
    },
});

export default CatalogListItemSkeleton;
