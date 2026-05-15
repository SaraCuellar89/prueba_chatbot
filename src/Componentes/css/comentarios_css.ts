import { StyleSheet } from "react-native";
import { colores } from "../../estilos_global";

export const estilos_comentarios = StyleSheet.create({

    // --------- Estilos de los comentarios ---------

    contenedor: {
        justifyContent: "center",
        borderRadius: 10,
        borderWidth: 1,
        borderColor: colores.color_4,
        padding: 10,
        gap: 10
    },
    contenedor_info: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between"
    },
    caja_info: {
        flexDirection: "row",
        alignItems: "center",
        gap: 10
    },
    foto_usuario: {
        width: 35,
        height: 35,
        borderWidth: 1,
        borderRadius: 40
    },
    icono_puntos: {
        width: 35,
        height: 35,
    },
    nombre_usuario:{
        fontSize: 12,
        fontFamily: "JetBrainsMono_700Bold"
    },
    texto:{
        fontSize: 12
    },
    contenedor_respuestas: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        gap: 10,
        marginTop: 5
    },
    caja_respuestas: {
        flexDirection: "row",
        alignItems: "center",
        gap: 5
    },
    icono_respuesta: {
        width: 25,
        height: 25
    },


    // --------- Estilos de las respuestas ---------

    contenedor_componente_respuestas: {
        margin: 10
    },


    // --------- Estilos de editar comentario/respuesta ---------
    caja_opciones: {
        position: "absolute",
        top: 40,
        right: 30,
    },
    input_editar: {
        flex: 1,
        borderWidth: 1,
        borderTopWidth: 1,
        borderRadius: 10,
        backgroundColor: colores.color_3,
        color: colores.color_4
    },
    caja_btn_editar: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginTop: 20
    }
});