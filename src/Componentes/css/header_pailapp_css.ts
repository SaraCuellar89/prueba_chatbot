/**
 * Modulo de estilos asociado a componentes reutilizables de la interfaz.
 */

import { StyleSheet } from "react-native";
import { colores } from "../../estilos_global";

export const estilos_header_pailapp = StyleSheet.create({

    // --------- Estilos del header que tiene el nombre de la aplicacion y el icono de notificaciones ---------

    contenedor: {
      padding: 18,
      flexDirection: "row",
      alignItems: "center",
      alignContent: "center",
      justifyContent: "space-between",
      borderBottomEndRadius: 10,
      borderBottomStartRadius: 10,
      zIndex: 100,
      backgroundColor: colores.color_1
    },
    titulo: {
      fontSize: 20,
      fontFamily: "JetBrainsMono_700Bold"
    },
    icono: {
      width: 30,
      height: 30,
    },
    caja_cantidad_notificaciones: {

    },
    cantidad_notificaciones: {
      position: "absolute",
      bottom: 0,
      right: 0,
      backgroundColor: "#f71707",
      borderRadius: 40,
      textAlign: "center",
      alignSelf: "flex-start",
      paddingHorizontal: 4,
      fontSize: 10,
      color: colores.color_3,
      borderWidth: 2,
      borderColor: colores.color_1
    }
});