/**
 * Modulo de estilos asociado a componentes reutilizables de la interfaz.
 */

import { StyleSheet, Dimensions } from "react-native";
import { colores } from "../../estilos_global";

const { height, width } = Dimensions.get('window');

const estilos_robot = StyleSheet.create({

    // --------- Estilos de las publicaciones ---------

    caja_texto: {
        alignItems: "center",
        paddingTop: 20,
    },
    texto: {
        width: "50%",
        textAlign: "center",
        fontSize: 20,
        fontFamily: "JetBrainsMono_700Bold"
    },
    caja_robot: {
        height: height * 0.4,
        overflow: 'hidden',
        alignItems: 'center',
        justifyContent: 'center',
    },
    caja_robot_pequeno: {
        height: height * 0.15,
        overflow: 'hidden',
        alignItems: 'center',
        justifyContent: 'center',
    },
    robot: {
        width: "150%",
        height: height * 0.8,
    },
    robot_pequeno: {
        width: "50%",
        height: height * 0.5,
    }


})

export default estilos_robot;