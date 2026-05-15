import { StyleSheet } from "react-native";
import { colores } from "../../estilos_global";

export const estilos_opciones = StyleSheet.create({

    // --------- Estilos de la caja de opciones (eliminar/editar) ---------

    contenedor: {
        width: 150,
        justifyContent: "center",
        borderRadius: 10,
        borderWidth: 1,
        backgroundColor: colores.color_5,
        borderColor: colores.color_4,
        paddingVertical: 10,
        gap: 15,
        zIndex: 100
    },
    caja_opcion: {
        flexDirection: "row",
        gap: 10,
        justifyContent: "center",
        alignItems: "center"
    },
    iconos: {
        width: 20, 
        height: 20
    },
    texto: {
        fontFamily: "JetBrainsMono_700Bold"
    }
});