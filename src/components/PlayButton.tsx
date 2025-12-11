// components/PlayButton.tsx
import React from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";
import { colors, spacing } from "../theme";
import { borderRadius } from "../theme/borderRadius";

interface Props {
    onPress: () => void;
    hasFocus?: boolean;
}

const PlayButton = ({ onPress, hasFocus = false }: Props) => {
    return (
        <TouchableOpacity
            onPress={onPress}
            style={[styles.button, hasFocus && styles.focused]}
            activeOpacity={1}
            focusable={hasFocus} // auto-focus if needed
        >
            <Text style={styles.text}>▶ Play</Text>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    button: {
        backgroundColor: colors.background.overlay,
        paddingVertical: spacing.lg,
        paddingHorizontal: spacing.xxl,
        borderRadius: borderRadius.button,
    },
    focused: {
        borderWidth: 2,
        borderColor: colors.border.focus,
    },
    text: {
        color: colors.border.focus,
        fontSize: 24,
        fontWeight: "bold",
    },
});

export default PlayButton;
