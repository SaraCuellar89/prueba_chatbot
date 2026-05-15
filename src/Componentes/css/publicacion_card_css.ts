/**
 * Modulo de estilos asociado a componentes reutilizables de la interfaz.
 */

import { StyleSheet, Dimensions } from "react-native";
import { colores } from "../../estilos_global";

const { height, width } = Dimensions.get('window');

const estilos_publicacion_card = StyleSheet.create({

    // --------- Estilos de las publicaciones ---------

    contenedor: {
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 10,
        borderWidth: 1,
        borderColor: colores.color_4,
        padding: 20
    },
    titulo: {
        fontFamily: "JetBrainsMono_700Bold",
        fontSize: 18,
        paddingBottom: 10
    },
    caja_reducida: {
        width: '100%',
        height: height * 0.1,
        borderBottomWidth: 1,
        borderColor: "#00000025",
        gap: 15,
        overflow: "hidden"
    },
    caja_ampliada: {
        width: '100%',
        height: "auto",
        gap: 15
    },
    texto_mediano: {
        fontSize: 12,
    },
    btn_ver_mas: {
        paddingVertical: 10
    },
    texto_ver_mas: {
        fontFamily: "JetBrainsMono_700Bold",
        fontSize: 12
    },
    img_publicacion: {
        width: '100%',
        height: 180,
        borderRadius: 10,
        marginTop: 20,
        marginBottom: 10,
    },
    contenedor_especificaciones: {
        flexDirection: "row",
        gap: 10
    },
    dificultad: {
        alignSelf: "flex-start", 
        justifyContent: "center",
        alignItems: "center",
        paddingHorizontal: 15,
        paddingVertical: 5,
        borderColor: colores.color_4,
        borderWidth: 1,
        borderRadius: 20,
    },
    texto_pequeno: {
        fontSize: 11,
    },
    tiempo: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        gap: 5,
        paddingHorizontal: 15,
        paddingVertical: 5,
        borderColor: colores.color_4,
        borderWidth: 1,
        borderRadius: 20,
    },
    icono_tiempo: {
        width: 13,
        height: 13
    },
    contenedor_interacciones: {
        width: "100%",
        flexDirection: "row",
        justifyContent: "space-between",
        marginVertical: 25,
    },
    caja_interacciones: {
        flexDirection: "row",
        gap: 15,
        justifyContent: "center",
        alignItems: "center",
    },
    interacciones: {
        flexDirection: "row",
        gap: 5,
        justifyContent: "center",
        alignItems: "center",
    },
    iconos: {
        width: 25,
        height: 25
    },
    texto_interacciones: {
        fontSize: 16
    },
    fecha: {
        width: '100%'
    }

})

export default estilos_publicacion_card;