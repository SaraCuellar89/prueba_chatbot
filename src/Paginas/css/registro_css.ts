/**
 * Modulo de estilos exclusivo de una pantalla. Centraliza colores, espacios y distribucion visual.
 */

import { Dimensions, StyleSheet } from "react-native";
import { colores } from "../../estilos_global";

const { height, width } = Dimensions.get('window');

const registro_css = StyleSheet.create({

    // --------- Estilos de registro ---------

    contenedor: {
        flex: 1,
        backgroundColor: colores.color_2,
        paddingBottom: height*0.09
    }
});

export default registro_css;