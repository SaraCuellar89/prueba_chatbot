import { Dimensions, StyleSheet } from "react-native";
import { colores } from "../../estilos_global";

const { height, width } = Dimensions.get('window');

const estilos_header_perfil = StyleSheet.create({

    // --------- Estilos del header que tiene la informacion del usuario (Pantalla de perfil) ---------

    contenedor: {
        justifyContent: "center",
        borderRadius: 10,
        borderWidth: 1,
        borderColor: colores.color_4,
        padding: 20,
        gap: 20
    },
    caja_perfil: {
        flexDirection: "row",
        alignItems: "center",
        gap: 10
    },
    nombre_usuario: {
        fontFamily: "JetBrainsMono_700Bold",
        fontSize: 20,
    },
    foto_perfil: {
        width: 80,
        height: 80,
        borderWidth: 1,
        borderColor: colores.color_4,
        borderRadius: 40
    },
    caja_info_extra: {
        flexDirection: "row",
        flexWrap: "wrap",
        gap: 5
    },
    info_extra: {
        width: "auto",
        backgroundColor: colores.color_5,
        flexDirection: "row",
        justifyContent: "center",
        alignContent: "center",
        padding: 5,
        borderRadius: 10,
        borderWidth: 1
    },
    texto_info_extra: {
        fontSize: 12
    },
});

export default estilos_header_perfil;