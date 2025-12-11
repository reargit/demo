import { Image, StyleSheet, View, type StyleProp, type ViewStyle } from "react-native";
import { colors } from "../theme";

interface Props {
    uri: string;

    focused?: boolean;
    style?: StyleProp<ViewStyle>;
    testID?: string;
}
const Thumbnail = ({ focused, uri, style, testID }: Props) => {

    return (
        <View style={[
            styles.container,
            focused ? styles.containerFocused : null,
            style,
        ]} testID={testID}>
            <Image
                source={{ uri }}
                style={styles.image}
                resizeMode="cover"
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        borderRadius: 6,
        backgroundColor: colors.background.overlay,
        overflow: 'hidden',
        position: 'relative',
        height: 120,
    },
    image: {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '200%',
    },
    containerFocused: {
        transform: [{ scale: 1.05 }],
    },
});

export default Thumbnail;