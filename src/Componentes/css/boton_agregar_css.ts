/**
 * Modulo de estilos asociado a componentes reutilizables de la interfaz.
 */

import { StyleSheet } from "react-native";
import { colores } from "../../estilos_global";

export const estilos_boton_agregar = StyleSheet.create({

  // --------- Estilos del boton para ir al formulario de subir una publicacion ---------

  boton: {
    width: "100%",
    backgroundColor: colores.color_1,
    alignItems: "center",
    borderTopStartRadius: 10,
    borderTopEndRadius: 10,
    paddingVertical: 15
  },
  icon: {
    width: 30,
    height: 30,
  },
});