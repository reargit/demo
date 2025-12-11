import React from 'react';
import { View, Text, StyleSheet, ScrollView, Dimensions } from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList, Routes } from '../routers/routeTypes';
import { colors, spacing, typography } from '../theme';
import Thumbnail from '../components/Thumbnail';
import PlayButton from '../components/PlayButton';

type Props = NativeStackScreenProps<RootStackParamList, Routes.Details>;

const DetailsScreen = ({ navigation, route }: Props) => {
    const { item } = route.params;
    const thumHeight = Math.round(Dimensions.get('window').height * 0.6);

    const handlePlay = () => { navigation.navigate(Routes.Play, { uri: item.streamUrl, thumbnail: item.thumbnail }); }

    return (
        <ScrollView style={styles.container}>
            <View style={styles.content}>
                <View style={styles.imageContainer}>
                    <Thumbnail uri={item.thumbnail} focused={false} style={[styles.image, { height: thumHeight }]} />
                    <View style={styles.playButton}  >
                        <PlayButton onPress={handlePlay} />
                    </View>
                </View>
                <Text style={styles.title}>{item.title}</Text>
                <Text style={styles.description}>
                    {item.description}
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
    imageContainer: {
        position: 'relative',
        width: '100%',
    },
    image: {
        borderRadius: 12,
    },
    playButton: {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: [{ translateX: -36 }, { translateY: -36 }],
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
    description: {
        ...typography.bodyLarge,
        color: colors.text.primary,
    },
});

export default DetailsScreen;
