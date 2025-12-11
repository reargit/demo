import { Image, StyleSheet, type ImageStyle, type StyleProp } from "react-native";
import { colors, focus } from "../theme";

interface Props {
    focused: boolean;
    uri: string;
    style?: StyleProp<ImageStyle>;
}
const Thumbnail = ({ focused, uri, style }: Props) => {


    return (<Image
        source={{ uri }}
        style={[
            styles.thumbnail,
            focused ? styles.thumbnailFocused : null,
            style,
        ]}
        resizeMode="cover"
    />)
}

const styles = StyleSheet.create({

    thumbnail: {
        width: '100%',
        height: 120,
        borderRadius: 6,
        backgroundColor: colors.background.overlay,
    },
    thumbnailFocused: {
        transform: [{ scale: focus.scale }],
    },
});

export default Thumbnail;