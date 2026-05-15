/**
 * Modulo de estilos exclusivo de una pantalla. Centraliza colores, espacios y distribucion visual.
 */

import { StyleSheet, Dimensions } from "react-native";

const { height, width } = Dimensions.get('window');

const estilos_pantalla_carga = StyleSheet.create({

    // --------- Estilo de pantalla de carga ---------
    contenedor: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    titulo: {
        fontSize: 40,
        fontFamily: 'JetBrainsMono_700Bold',
    },
    logo: {
        width: width * 0.5,  
        height: height * 0.5,
    }

})

export default estilos_pantalla_carga;