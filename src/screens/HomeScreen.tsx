import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    FlatList,
    TouchableOpacity,
    Platform,
} from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList, Routes } from '../routers/routeTypes';
import Button from '../components/Button';

type Props = NativeStackScreenProps<RootStackParamList, Routes.Home>;

interface ContentItem {
    id: string;
    title: string;
    description: string;
}

const SAMPLE_DATA: ContentItem[] = [
    { id: '1', title: 'Item 1', description: 'First sample item' },
    { id: '2', title: 'Item 2', description: 'Second sample item' },
    { id: '3', title: 'Item 3', description: 'Third sample item' },
    { id: '4', title: 'Item 4', description: 'Fourth sample item' },
    { id: '5', title: 'Item 5', description: 'Fifth sample item' },
];

const HomeScreen = ({ navigation }: Props): React.JSX.Element => {
    const renderItem = ({ item }: { item: ContentItem }) => (
        <TouchableOpacity
            style={styles.item}
            onPress={() =>
                navigation.navigate(Routes.Details, {
                    itemId: item.id,
                    title: item.title,
                })
            }
            testID={`item-${item.id}`}>
            <Text style={styles.itemTitle}>{item.title}</Text>
            <Text style={styles.itemDescription}>{item.description}</Text>
        </TouchableOpacity>
    );

    return (
        <View style={styles.container}>
            <Text style={styles.welcomeText}>Welcome to TV Demo!</Text>
            <FlatList
                data={SAMPLE_DATA}
                renderItem={renderItem}
                keyExtractor={item => item.id}
                style={styles.list}
                contentContainerStyle={styles.listContent}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#282c34',
        padding: 20,
    },
    welcomeText: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#61DAFB',
        marginBottom: 10,
        textAlign: 'center',
    },
    list: {
        flex: 1,
    },
    listContent: {
        paddingBottom: 20,
    },
    item: {
        backgroundColor: '#20232a',
        padding: 20,
        marginVertical: 8,
        borderRadius: 8,
        borderWidth: 2,
        borderColor: 'transparent',
    },
    itemTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#61DAFB',
        marginBottom: 5,
    },
    itemDescription: {
        fontSize: 16,
        color: '#ffffff',
    },
});

export default HomeScreen;
