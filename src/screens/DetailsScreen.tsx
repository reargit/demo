import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
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
        <View style={styles.container}>
            <View style={styles.imageContainer}>
                <Thumbnail testID="details-thumbnail" uri={item.thumbnail} style={[styles.img, { height: thumHeight }]} />
                <View style={styles.playButton}  >
                    <PlayButton onPress={handlePlay} />
                </View>
            </View>
            <Text style={styles.title}>{item.title}</Text>
            <Text style={styles.description}>
                {item.description}
            </Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.background.primary,
        padding: spacing.lg,
        rowGap: spacing.lg,
    },
    img: {
        overflow: 'hidden',
        position: 'relative',
    },
    imageContainer: {
        position: 'relative',
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
    },
    description: {
        ...typography.bodyLarge,
        color: colors.text.primary,
    },
});

export default DetailsScreen;
