/**
 * Modulo de estilos asociado a componentes reutilizables de la interfaz.
 */

// Estilos de los formularios de inicio de sesion y registro de usuario

import { StyleSheet, Dimensions } from "react-native";
import { colores } from "../../estilos_global";

const { height, width } = Dimensions.get('window');

const estilo_formu_inicio_sesion_css = StyleSheet.create({

    // --------- Estilos del formulario de inicio de sesion - correo recuperacion - codigo - cambio de contraseña ---------

    content: {
        flex: 1,
        alignItems: "center",
    },
    card: {
        width: "100%",
        padding: 20,
        borderRadius: 12,
        borderWidth: 1,
        borderColor: 'black',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 30,
    },
    texto_label: {
        fontFamily: "JetBrainsMono_700Bold",
        fontSize: 16,
    },
    contenedor_input: {
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 10,
    },
    caja_contrasena: {
        width: '100%',
        flexDirection: 'row',
        backgroundColor: "white",
        borderRadius: 10,
        color: "black",
        borderColor: "black",
        borderWidth: 1,
    },
    caja_input_contrasena: {
        flex: 1,
        color: colores.color_4  
    },
    ver_contrasena: {
        width: width * 0.09,
        height: height * 0.05,
    },
    no_ver_contrasena: {
        width: width * 0.09,
        height: height * 0.05,
        opacity: 0.4
    },

    googleBtn: {
        width: "60%",
        borderWidth: 1,
        borderColor: "#000",
        paddingVertical: 12,
        borderRadius: 10,
        alignItems: "center",
        marginTop: 25,
    },

    register: {
        marginTop: 20,
        textAlign: "center",
    },
});

export default estilo_formu_inicio_sesion_css;