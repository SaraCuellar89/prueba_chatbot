/**
 * Boton flotante reutilizable para abrir la pantalla de creacion de recetas.
 */

import React from "react";
import { TouchableOpacity, Text, Image } from "react-native";
import { estilos_boton_agregar } from "./css/boton_agregar_css";
import estilos_global from "../estilos_global";

export default function BotonAgregar({ onPress }: any) {

  return (
    <TouchableOpacity style={[estilos_boton_agregar.boton, estilos_global.sombra_contenedor]} onPress={onPress}>
      <Image
        source={require("../Img/icono-mas.png")}
        style={estilos_boton_agregar.icon}
      />
    </TouchableOpacity>
  );
}