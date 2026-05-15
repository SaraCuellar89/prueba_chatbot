/**
 * Modulo de estilos asociado a componentes reutilizables de la interfaz.
 */

import { StyleSheet } from 'react-native';
import { colores } from '../../estilos_global';

const estilos_navbar = StyleSheet.create({

  // --------- Estilos de la barra de navegacion ---------

  container: {
    backgroundColor: colores.color_1,
    paddingVertical: 10,
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    borderTopEndRadius: 10,
    borderTopStartRadius: 10,
  },

  icon: {
    width: 40,
    height: 40,
  },

  foto_perfil: {
    borderWidth: 1,
    borderColor: colores.color_4,
    borderRadius: 40
  }
});

export default estilos_navbar;