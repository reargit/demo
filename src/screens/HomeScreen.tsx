import React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList, Routes } from '../routers/routeTypes';
import { colors, spacing, typography } from '../theme';
import { catalogApi } from '../services/catalogApi';
import type { CatalogItem } from '../types/catalog';
import { useQuery } from '@tanstack/react-query';
import CatalogListItem from '../components/CatalogListItem';
import { useCallback } from 'react';

type Props = NativeStackScreenProps<RootStackParamList, Routes.Home>;


const HomeScreen = ({ navigation }: Props): React.JSX.Element => {
    const { data: items = [], isLoading, error, refetch } = useQuery<CatalogItem[]>({
        queryKey: ['catalog'],
        queryFn: () => catalogApi.getAllItems(),
        staleTime: 60_000,
    });

    const ITEM_HEIGHT = 180;

    const handlePress = useCallback((item: CatalogItem) => {
        navigation.navigate(Routes.Details, { item });
    }, [navigation]);

    const renderItem = useCallback(({ item, index }: { item: CatalogItem; index: number }) => (
        <CatalogListItem
            item={item}
            onPress={handlePress}
            style={{ height: ITEM_HEIGHT }}
            hasTVPreferredFocus={index === 0}
        />
    ), [handlePress]);



    return (
        <View style={styles.container}>
            <Text style={styles.welcomeText}>Welcome</Text>
            {error && (
                <View style={styles.errorBox} accessibilityRole="alert">
                    <Text style={styles.errorText}>Failed to load catalog</Text>
                    <Text style={styles.errorHint} onPress={() => refetch()}>Tap to retry</Text>
                </View>
            )}
            <FlatList
                data={items}
                renderItem={renderItem}
                keyExtractor={item => item.id}
                style={styles.list}
                contentContainerStyle={styles.listContent}
                getItemLayout={(_, index) => ({ length: ITEM_HEIGHT, offset: ITEM_HEIGHT * index, index })}
                numColumns={3}
                columnWrapperStyle={styles.column}
                ListEmptyComponent={isLoading ? <LoadingRow /> : error ? (
                    <Text style={styles.welcomeText}>Failed to load catalog</Text>
                ) : (
                    <Text style={styles.welcomeText}>No items</Text>
                )}
            />
        </View>
    );
};

const LoadingRow = () => (
    <View accessibilityLabel="loading-row">
        <Text style={styles.welcomeText}>Loading…</Text>
        <Text style={styles.welcomeText}>Fetching catalog</Text>
    </View>
);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.background.primary,
        padding: spacing.lg,
    },
    welcomeText: {
        ...typography.h2,
        color: colors.text.accent,
        marginBottom: spacing.sm,
        textAlign: 'center',
    },
    list: {
        flex: 1,
    },
    listContent: {
        paddingBottom: spacing.lg,
    },
    column: {
        gap: spacing.sm,
    },
    errorBox: {
        backgroundColor: colors.background.secondary,
        padding: spacing.md,
        borderRadius: 8,
        marginBottom: spacing.sm,
        borderWidth: 1,
        borderColor: colors.border.subtle,
    },
    errorText: {
        ...typography.bodyLarge,
        color: colors.text.primary,
        textAlign: 'center',
    },
    errorHint: {
        ...typography.caption,
        color: colors.text.accent,
        textAlign: 'center',
        marginTop: spacing.xs,
    },
    // Item styles moved to CatalogListItem
});

export default HomeScreen;
