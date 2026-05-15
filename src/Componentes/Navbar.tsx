import React, { useContext } from "react";
/**
 * Barra inferior de navegacion con accesos al chatbot, foro, guardados y perfil.
 */


import { View, TouchableOpacity, Image, StyleSheet } from "react-native";
import estilos_navbar from "./css/navbar_css";
import estilos_global from "../estilos_global";
import { AuthContext } from "../utils/Auth_Context";

export default function Navbar({ navigation }: any) {

  // ================= Datos del usuario por un contexto difinido =================
  const authContext = useContext(AuthContext);
  if (!authContext) throw new Error("AuthContext no está disponible");
  const { usuario, setUsuario } = authContext;

  return (
    <View style={[estilos_navbar.container, estilos_global.sombra_contenedor]}>

      {/* --- Boton para ir al inicio (o chatbot) --- */}
      <TouchableOpacity onPress={() => navigation.navigate("Chatbot")}>
        <Image
          source={require("../Img/icono-robot.png")}
          style={estilos_navbar.icon}
        />
      </TouchableOpacity>

      {/* --- Boton para ir al foro --- */}
      <TouchableOpacity onPress={() => navigation.navigate("Foro")}>
        <Image
          source={require("../Img/icono-chat.png")}
          style={estilos_navbar.icon}
        />
      </TouchableOpacity>

      {/* --- Boton para ir a los platos guardados del usuario --- */}
      <TouchableOpacity onPress={() => navigation.navigate("MisPlatos")}>
        <Image
          source={require("../Img/icono-comida.png")}
          style={estilos_navbar.icon}
        />
      </TouchableOpacity>

      {/* --- Boton para ir al perfil del usuario --- */}
      <TouchableOpacity onPress={() => navigation.navigate("Perfil")}> 
        <Image
          source={{ uri: usuario?.avatar ?? "" }}
          style={[estilos_navbar.foto_perfil, estilos_navbar.icon]}
          resizeMode="contain"
        />
      </TouchableOpacity>

    </View>
  );
}