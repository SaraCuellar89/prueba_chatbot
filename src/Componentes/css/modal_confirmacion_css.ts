/**
 * Hoja de estilos reutilizable para un componente o pantalla especifica del proyecto.
 */

import { StyleSheet } from "react-native";
import { colores } from "../../estilos_global";

export const estilos_modal_confirmacion = StyleSheet.create({

  // --------- Estilos del modal de confirmacion ---------

  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.4)",
    justifyContent: "center",
    alignItems: "center",
  },
  box: {
    backgroundColor: colores.color_5,
    padding: 20,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: "#000",
    width: "80%",
    gap: 20
  },
  text: {
    textAlign: "center",
    fontFamily: "JetBrainsMono_700Bold",
    fontSize: 20,
    marginBottom: 15,
  },
  buttons: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
  btn: {
    backgroundColor: "black",
    paddingHorizontal: 30,
    paddingVertical: 6,
    borderRadius: 10,
  },
  btnText: {
    color: "white",
    fontSize: 16,
  },
});