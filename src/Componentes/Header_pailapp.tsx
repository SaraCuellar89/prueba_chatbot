/**
 * Header principal con la marca PailApp y acceso rapido a configuracion.
 */

import React from "react";
import { View, TouchableOpacity, Image } from "react-native";
import {estilos_header_pailapp} from "./css/header_pailapp_css";
import { useNavigation } from "@react-navigation/native";
import Texto from "./Texto";
import estilos_global from "../estilos_global";

const Header_pailapp = ({cantidad_notificaciones}: any) => {

  const navigation = useNavigation<any>();

  return (
    <View style={[estilos_header_pailapp.contenedor, estilos_global.sombra_contenedor]}>

      <Texto style={estilos_header_pailapp.titulo}>PailApp</Texto>
      
      <TouchableOpacity onPress={() => navigation.navigate("Notificaciones")}>
        <Image
          source={require("../Img/icono-campana.png")}
          style={estilos_header_pailapp.icono}
        />
        {cantidad_notificaciones === 0 ?
        (null) :
        (
          <>
            {cantidad_notificaciones > 9 ?
            (
              <Texto style={estilos_header_pailapp.cantidad_notificaciones_2}>+9</Texto>
            ) : 
            (
              <Texto style={estilos_header_pailapp.cantidad_notificaciones}>{cantidad_notificaciones}</Texto>
            )}
          </>
          
        )}
      </TouchableOpacity>

    </View>
  );
}

export default Header_pailapp;