import React from 'react';
import { TouchableOpacity, Text, StyleSheet, ViewStyle } from 'react-native';

interface ButtonProps {
    title: string;
    onPress: () => void;
    testID?: string;
    style?: ViewStyle;
}

const Button = ({
    title,
    onPress,
    testID,
    style,
}: ButtonProps) => {
    return (
        <TouchableOpacity
            style={[styles.button, style]}
            onPress={onPress}
            testID={testID}
            activeOpacity={0.7}>
            <Text style={styles.buttonText}>{title}</Text>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    button: {
        backgroundColor: '#61DAFB',
        paddingVertical: 15,
        paddingHorizontal: 30,
        borderRadius: 8,
        alignItems: 'center',
        marginVertical: 10,
        borderWidth: 2,
        borderColor: 'transparent',
    },
    buttonText: {
        color: '#282c34',
        fontSize: 18,
        fontWeight: 'bold',
    },
});

export default Button;
