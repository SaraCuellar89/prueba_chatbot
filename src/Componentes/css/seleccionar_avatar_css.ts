/**
 * Modulo de estilos asociado a componentes reutilizables de la interfaz.
 */

import { Dimensions, StyleSheet } from "react-native";
import { colores } from "../../estilos_global";

const { height, width } = Dimensions.get('window');

const seleccionar_avatar_css = StyleSheet.create({

    // --------- Estilos del modal para escoger el avatar de foto de perfil ---------

    contenedor: {
        backgroundColor: colores.color_5,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 25,
        borderWidth: 1,
        borderColor: colores.color_4,
        borderTopEndRadius: 10,
        borderTopStartRadius: 10,
        zIndex: 100
    },
    grid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
        borderTopEndRadius: 10,
        borderTopStartRadius: 10,
        gap: 10,
    },
    contenedor_avatar: {
        width: 80,
        height: 80,
    },
    seleccionado: {
        borderColor: '#000000',
        backgroundColor: 'rgba(0,0,0,0.1)',
    },
    avatar: {
        width: '100%',
        height: '100%',
        borderRadius: 40,
        borderWidth: 1.5,
        borderColor: colores.color_4,
    },
    contenedor_boton: {
        width: width*0.5,
        marginTop: 20
    }
});

export default seleccionar_avatar_css;