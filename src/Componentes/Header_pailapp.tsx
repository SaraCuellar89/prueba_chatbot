/**
 * Header principal con la marca PailApp y acceso rapido a configuracion.
 */

import React from "react";
import { View, TouchableOpacity, Image } from "react-native";
import {estilos_header_pailapp} from "./css/header_pailapp_css";
import { useNavigation } from "@react-navigation/native";
import Texto from "./Texto";
import estilos_global from "../estilos_global";

const Header_pailapp = () => {

  const navigation = useNavigation<any>();

  return (
    <View style={[estilos_header_pailapp.contenedor, estilos_global.sombra_contenedor]}>

      <Texto style={estilos_header_pailapp.titulo}>PailApp</Texto>
      
      <TouchableOpacity onPress={() => navigation.navigate("Notificaciones")}>
        <Image
          source={require("../Img/icono-campana.png")}
          style={estilos_header_pailapp.icono}
        />
        <Texto style={estilos_header_pailapp.cantidad_notificaciones}>1</Texto>
      </TouchableOpacity>

    </View>
  );
}

export default Header_pailapp;