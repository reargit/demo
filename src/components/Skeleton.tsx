import React, { useEffect, useRef } from 'react';
import { Animated, StyleSheet, ViewStyle } from 'react-native';
import { colors } from '../theme';

export interface SkeletonViewProps {
    style?: ViewStyle;
    testID?: string;
}

const Skeleton: React.FC<SkeletonViewProps> = ({ style, testID }) => {
    const shimmerAnim = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        const shimmerLoop = Animated.loop(
            Animated.sequence([
                Animated.timing(shimmerAnim, {
                    toValue: 1,
                    duration: 1000,
                    useNativeDriver: false,
                }),
                Animated.timing(shimmerAnim, {
                    toValue: 0,
                    duration: 1000,
                    useNativeDriver: false,
                }),
            ])
        );
        shimmerLoop.start();

        return () => shimmerLoop.stop();
    }, [shimmerAnim]);

    const opacity = shimmerAnim.interpolate({
        inputRange: [0, 1],
        outputRange: [0.5, 0.8],
    });

    return (
        <Animated.View
            style={[styles.bacground, style, { opacity }]}
            testID={testID}
        />
    );
};



const styles = StyleSheet.create({
    bacground: {
        backgroundColor: colors.background.skeleton,
        borderRadius: 4,
    },
});

export default Skeleton;
