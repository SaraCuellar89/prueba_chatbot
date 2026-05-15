/**
 * Modulo de estilos exclusivo de una pantalla. Centraliza colores, espacios y distribucion visual.
 */

import { StyleSheet, Dimensions } from "react-native";
import { colores } from "../../estilos_global";

const { height, width } = Dimensions.get('window');

const estilos_foro = StyleSheet.create({

    // --------- Estilos del foro ---------

    contenedor: {
        flex: 1, 
        backgroundColor: colores.color_2 
    },
    contenedor_filtros: {
        paddingHorizontal: 20,
        marginTop: 20,
    },
    contenedor_publicaciones: {
        padding: 20,
        flexDirection: "column",
        gap: 30
    }
})

export default estilos_foro;