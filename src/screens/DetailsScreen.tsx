import React from 'react';
import { View, Text, StyleSheet, ScrollView, Button } from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList, Routes } from '../routers/routeTypes';
import { colors, spacing, typography } from '../theme';

type Props = NativeStackScreenProps<RootStackParamList, Routes.Details>;

const DetailsScreen = ({ route, navigation }: Props) => {
    const { itemId, title } = route.params;

    return (
        <ScrollView style={styles.container}>
            <View style={styles.content}>
                <Text style={styles.title}>{title}</Text>
                <Text style={styles.label}>Item ID:</Text>
                <Text style={styles.value}>{itemId}</Text>

                <Text style={styles.description}>
                    This is a detailed view for the selected item. On Android TV, you can
                    navigate using the D-pad on your remote control.
                </Text>
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.background.primary,
    },
    content: {
        padding: spacing.lg,
    },
    title: {
        ...typography.h1,
        color: colors.text.accent,
        marginBottom: spacing.lg,
    },
    label: {
        ...typography.bodyLarge,
        color: colors.text.secondary,
        marginTop: spacing.sm,
    },
    value: {
        ...typography.h2,
        color: colors.text.primary,
        marginBottom: spacing.lg,
    },
    description: {
        ...typography.bodyLarge,
        color: colors.text.primary,
        marginVertical: spacing.lg,
    },
});

export default DetailsScreen;
