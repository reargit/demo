import React from 'react';
import { View, Text, StyleSheet, ScrollView, Button } from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList, Routes } from '../routers/routeTypes';

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

                <Button
                    title="Go Back"
                    onPress={() => navigation.goBack()}
                    testID="back-button"
                />
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#282c34',
    },
    content: {
        padding: 20,
    },
    title: {
        fontSize: 36,
        fontWeight: 'bold',
        color: '#61DAFB',
        marginBottom: 20,
    },
    label: {
        fontSize: 18,
        color: '#999',
        marginTop: 10,
    },
    value: {
        fontSize: 24,
        color: '#ffffff',
        marginBottom: 20,
    },
    description: {
        fontSize: 18,
        color: '#ffffff',
        lineHeight: 28,
        marginVertical: 20,
    },
});

export default DetailsScreen;
