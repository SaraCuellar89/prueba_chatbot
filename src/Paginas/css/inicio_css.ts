/**
 * Modulo de estilos exclusivo de una pantalla. Centraliza colores, espacios y distribucion visual.
 */

import { StyleSheet } from 'react-native';

const estilos_pantalla_inicio = StyleSheet.create({

    // --------- Estilos de la pantalla de inicio ---------

    contenedor: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    caja_titulo: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    titulo: {
        fontSize: 35,
        marginBottom: 40,
        fontFamily: 'JetBrainsMono_700Bold',
        textAlign: 'center',
    },
    btn: {
        width: '80%',
        backgroundColor: '#000',
        paddingVertical: 15,
        paddingHorizontal: 40,
        borderRadius: 8,
        marginBottom: 20,
    },
    btn_texto: {
        color: '#fff',
        fontSize: 16,
        textAlign: 'center',
    },
  
});

export default estilos_pantalla_inicio;