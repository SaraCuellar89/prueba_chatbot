import React, { useEffect, useContext } from "react";
import { View, ActivityIndicator, Image } from "react-native";
import estilos_pantalla_carga from "./css/carga_css"
import estilos_global from "../estilos_global"
import Texto from "../Componentes/Texto";
import { AuthContext } from "../utils/Auth_Context";

export default function Carga({ navigation }: any) {

  // ================= Datos del usuario por un contexto difinido =================
  const authContext = useContext(AuthContext);
  if (!authContext) throw new Error("AuthContext no está disponible");
  const { usuario, cargando } = authContext;

  // ================= Funcion para cambiar de vista despues de 2.5 segudnos =================
  useEffect(() => {

    // Espera a que el contexto termine de cargar
    if (cargando) return;

    const timer = setTimeout(() => {

      if(usuario){
        navigation.replace("Chatbot");
      }
      else{
        navigation.replace("Inicio");
      }
    }, 2500);

    return () => clearTimeout(timer);
  }, [cargando]);

  return (
    <View style={[estilos_global.fondo_1, estilos_pantalla_carga.contenedor]}>
      <Texto style={estilos_pantalla_carga.titulo}>PailApp</Texto>
      <Image
        source={require("../Img/logo_pailapp.png")}
        style={estilos_pantalla_carga.logo}
        resizeMode="contain"
      />
      <ActivityIndicator size="large" color="#000" />
    </View>
  );
}