import { Dimensions, StyleSheet } from "react-native";
import { colores } from "../../estilos_global";

const { height, width } = Dimensions.get('window');

export const estilos_formu_comentario = StyleSheet.create({

    // --------- Estilos del input de subir un comentario ---------

    contenedor: {
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "row",
        gap: 5,
        paddingVertical: 10,
    },
    input: {
        flex: 1,
        borderWidth: 1,
        borderTopWidth: 1,
        borderRadius: 10,
        backgroundColor: colores.color_3,
        color: colores.color_4
    },
    icono: {
        width: 30,
        height: 30
    }
});