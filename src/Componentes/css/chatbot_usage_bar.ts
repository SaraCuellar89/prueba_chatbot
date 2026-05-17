import { StyleSheet, Dimensions } from "react-native";
import { colores } from "../../estilos_global";

const { height, width } = Dimensions.get('window');

const estilos_usage_bar = StyleSheet.create({

    // --------- Estilos de la barra de uso del robot ---------

    usageWrapper: {
        width: "70%",
        paddingVertical: 10,
        alignItems: "center",
    },

    usageHeader: {
        marginBottom: 4,
    },

    usageTitle: {},

    usageMeta: {
        fontSize: 12,
        color: colores.color_4
    },

    usageBarTrack: {
        width: "100%",
        height: 6,
        borderRadius: 5,
        borderWidth: 1,
        borderColor: colores.color_4
    },

    usageBarFill: {
        height: "100%",
        backgroundColor: colores.color_4,
        borderRadius: 3,
    },
})

export default estilos_usage_bar;