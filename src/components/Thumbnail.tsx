import { Image, StyleSheet, View, type StyleProp, type ViewStyle } from "react-native";


interface Props {
    uri: string;
    height?: number;
    focused?: boolean;
    style?: StyleProp<ViewStyle>;
    testID?: string;
}
const Thumbnail = ({ focused, uri, style, testID, height }: Props) => {
    return (
        <View style={[
            styles.container,
            focused ? styles.containerFocused : null,
            style,
        ]} testID={testID}>
            <Image
                source={{ uri }}
                style={[styles.image, height ? { height } : null]}
                resizeMode="cover"
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        borderRadius: 6,
    },
    image: {
        width: '100%',
        height: undefined,
        aspectRatio: 1,
    },
    containerFocused: {
        transform: [{ scale: 1.05 }],
    },
});

export default Thumbnail;