/**
 * Modulo de estilos asociado a componentes reutilizables de la interfaz.
 */

import { Dimensions, StyleSheet } from "react-native";

const { height, width } = Dimensions.get('window');

const header_css = StyleSheet.create({

    // --------- Estilos del header (el que tiene la flecha de retorno) ---------

    contenedor: {
        padding: 20,
        alignItems: "center",
        alignContent: "center",
        justifyContent: "center",
        borderBottomEndRadius: 10,
        borderBottomStartRadius: 10,
        zIndex: 100
    },
    contenedor_boton: {
        position: "absolute",
        left: 20,
        justifyContent: 'center',
    },
    flecha: {
        width: width * 0.05,
        height: height * 0.5
    },
    titulo: {
        fontSize: 20,
        fontFamily: "JetBrainsMono_700Bold"
    },
    contenedor_icono: {
        position: "absolute",
        right: 20,
        justifyContent: 'center',
    },
    icono: {
        width: 30,
        height: 30,
    },

    autor_avatar: {
        width: 35,
        height: 35,
        borderRadius: 50,
        borderWidth: 2
    }
});

export default header_css;