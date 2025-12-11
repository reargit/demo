import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Dimensions, ActivityIndicator, Image, TouchableOpacity, Text, BackHandler } from 'react-native';
import Video from 'react-native-video';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList, Routes } from '../routers/routeTypes';
import { colors } from '../theme';
import Thumbnail from '../components/Thumbnail';

type Props = NativeStackScreenProps<RootStackParamList, Routes.Play>;

const PlayScreen = ({ route, navigation }: Props) => {
    const { uri, thumbnail } = route.params;
    const [buffering, setBuffering] = useState(true);
    const [loaded, setLoaded] = useState(false);
    const [showHeader, setShowHeader] = useState(true);

    useEffect(() => {
        // Android TV hardware back
        const backSub = BackHandler.addEventListener('hardwareBackPress', () => {
            navigation.goBack();
            return true;
        });

        const hideTimer = setTimeout(() => setShowHeader(false), 2000);

        return () => {
            backSub.remove();
            clearTimeout(hideTimer);
        };
    }, [navigation]);

    return (
        <View style={styles.container}>
            {!loaded && (<Thumbnail
                uri={thumbnail}
                style={[styles.thumb]} />
            )}
            <Video
                source={{ uri }}
                style={[styles.video]}
                controls
                resizeMode="contain"
                paused={false}
                onBuffer={({ isBuffering }) => setBuffering(isBuffering)}
                onLoad={() => {
                    setLoaded(true);
                    setBuffering(false);
                }}
                onError={e => {
                    console.warn('Video error', e);
                    setBuffering(false);
                }}
                onProgress={() => {
                    if (showHeader) setShowHeader(false);
                }}
            />
            {buffering && (
                <View style={styles.loadingOverlay} accessibilityLabel="loading">
                    <ActivityIndicator size="large" color={colors.text.accent} />
                </View>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.background.primary,
    },
    video: {
        flex: 1,
        height: '100%',
    },
    thumb: {
        height: '100%',
    },
    loadingOverlay: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgba(0,0,0,0.25)',
    },
});

export default PlayScreen;
