/**
 * Paleta y estilos compartidos en toda la aplicacion para mantener consistencia visual.
 */

import { StyleSheet } from 'react-native';

export const colores = {
  color_1: '#FFDB0C',
  color_2: '#FFF8D4',
  color_3: '#FFFFFF',
  color_4: '#000000',
  color_5: '#FFE979',
};

const estilos_global = StyleSheet.create({
    fondo_1: {
        backgroundColor: colores.color_1,
    },

    fondo_2: {
        backgroundColor: colores.color_2,
    },

    caja_input: {
        width: '100%',
        backgroundColor: colores.color_3,
        borderRadius: 10,
        color: colores.color_4,
        borderColor: colores.color_4,
        borderWidth: 1,
    },

    btn_1: {
        backgroundColor: colores.color_4,
        padding: 10,
        borderRadius: 10,
    },
    texto_btn_1: {
        color: colores.color_3,
        fontSize: 16,
        textAlign: 'center'
    },

    sombra_contenedor: {
        borderWidth: 1,
        borderColor: "black",
        shadowColor: "#000000",
        shadowOffset: { width: 0, height: 8 },
        shadowOpacity: 1,
        shadowRadius: 6,
        elevation: 8,
    },
  
});

export default estilos_global;