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

    const handlePress = useCallback((item: CatalogItem) => {
        navigation.navigate(Routes.Details, {
            itemId: item.id,
            title: item.title,
        });
    }, [navigation]);

    const renderItem = useCallback(({ item }: { item: CatalogItem }) => (
        <CatalogListItem item={item} onPress={handlePress} />
    ), [handlePress]);



    return (
        <View style={styles.container}>
            <Text style={styles.welcomeText}>Welcome to TV Demo!</Text>
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
