import React from 'react';
import { View, StyleSheet, ViewStyle } from 'react-native';
import SkeletonView from '../../../components/Skeleton';
import { homeStyles } from '../styles';
import { colors, spacing } from '../../../theme';

export interface CatalogListItemSkeletonProps {
    style?: ViewStyle;
    testID?: string;
}

const CatalogListItemSkeleton: React.FC<CatalogListItemSkeletonProps> = ({ style, testID }) => {
    return (
        <View
            style={[homeStyles.catalogItem, style]}
            testID={testID}
        >
            <SkeletonView style={styles.thumbnail} />
            <SkeletonView style={styles.title} />
        </View>
    );
};

const styles = StyleSheet.create({
    title: {
        width: '70%',
        height: 16,
    },
    thumbnail: {
        ...homeStyles.catalogItemThumbnail,
        marginBottom: spacing.sm,
        backgroundColor: colors.background.skeleton,
    },

});

export default CatalogListItemSkeleton;
