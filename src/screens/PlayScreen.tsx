import React, { useEffect, useState } from 'react';
import { View, StyleSheet, ActivityIndicator, Text, BackHandler } from 'react-native';
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
    const [errorMsg, setErrorMsg] = useState<string | null>(null);

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
                testID="video-player"
                onBuffer={({ isBuffering }) => setBuffering(isBuffering)}
                onLoad={() => {
                    setLoaded(true);
                    setBuffering(false);
                }}
                onError={() => {
                    setErrorMsg('Unable to play this video. Please try again later.');
                    setBuffering(false);
                }}
                onProgress={() => {
                    if (showHeader) setShowHeader(false);
                }}
            />
            {(buffering || errorMsg) && (
                <View style={styles.loadingOverlay} accessibilityLabel="loading">
                    {errorMsg ? (
                        <View style={styles.errorBox} accessibilityRole="alert">
                            <Text style={styles.errorText}>{errorMsg}</Text>
                            <Text style={styles.errorHint} onPress={() => navigation.goBack()}>Go back</Text>
                        </View>
                    ) : (
                        <ActivityIndicator size="large" color={colors.text.accent} />
                    )}
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
    errorBox: {
        backgroundColor: colors.background.secondary,
        borderColor: colors.border.subtle,
        borderWidth: 1,
        padding: 16,
        borderRadius: 8,
        maxWidth: 320,
        alignItems: 'center',
    },
    errorText: {
        color: colors.text.primary,
        fontSize: 16,
        textAlign: 'center',
        marginBottom: 8,
    },
    errorHint: {
        color: colors.text.accent,
        fontSize: 14,
    },
});

export default PlayScreen;
