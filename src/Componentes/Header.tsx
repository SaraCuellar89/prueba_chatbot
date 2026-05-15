/**
 * Header reutilizable con titulo, boton de retroceso e icono auxiliar.
 */

import React from "react";
import { View, Text,TouchableOpacity, Image } from "react-native";
import header_css from "./css/header_css";
import estilos_global, { colores } from "../estilos_global";
import Texto from "./Texto";

export default function Header({ title, onBack, navegar, icono }: any) {
  
  return (
    <View style={[header_css.contenedor, { backgroundColor: colores.color_1 }, estilos_global.sombra_contenedor]}>
      {onBack && (
        <TouchableOpacity onPress={onBack} style={header_css.contenedor_boton}>
          <Image
            source={require("../Img/flecha_retorno.png")}
            style={header_css.flecha}
            resizeMode="contain"
          />
        </TouchableOpacity>
      )}

      <Texto style={header_css.titulo}>{title}</Texto>

      <TouchableOpacity onPress={navegar} style={header_css.contenedor_icono}>
        <Image
          source={icono}
          style={header_css.icono}
          resizeMode="contain"
        />
      </TouchableOpacity>

    </View>
  );
}