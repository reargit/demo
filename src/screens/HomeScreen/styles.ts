import { StyleSheet } from "react-native";
import { spacing, colors } from "../../theme";


export const homeStyles = StyleSheet.create({
    catalogItem: {
        flex: 1,
        backgroundColor: colors.background.secondary,
        padding: spacing.md,
        marginVertical: spacing.sm,
        borderRadius: 8,
        borderWidth: 2,
        borderColor: colors.border.default,
    },
    catalogItemThumbnail: {
        width: '100%',
        borderRadius: 6,
        backgroundColor: colors.background.overlay,
        overflow: 'hidden',
        position: 'relative',
        height: 120,
    }
});