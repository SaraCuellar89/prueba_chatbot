/**
 * Modulo de estilos asociado a componentes reutilizables de la interfaz.
 */

import { StyleSheet } from "react-native";
import { colores } from "../../estilos_global";

export const estilos_filtros = StyleSheet.create({

  // --------- Estilos de los filtros del foro ---------

  container: {
    flexDirection: "row",
    gap: 5,
  },
  boton: {
    flex: 1,
    alignItems: "center",
    paddingVertical: 6,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: colores.color_4,
  },
  botonActivo: {
    backgroundColor: colores.color_5,
  },
  texto: {
    fontSize: 14,
    fontWeight: "500",
    color: "#000",
  },
});