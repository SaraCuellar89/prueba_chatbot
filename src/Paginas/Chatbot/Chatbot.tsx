import React, { useState, useMemo, useContext, useEffect, useCallback } from "react";
import { View, KeyboardAvoidingView, Platform, ScrollView, PanResponder, useWindowDimensions } from "react-native";
import Header_pailapp from "../../Componentes/Header_pailapp";
import Navbar from "../../Componentes/Navbar";
import { SafeAreaView } from "react-native-safe-area-context";
import { colores } from "../../estilos_global";
import estilos_publicaciones from "../css/publicaciones_css";
import Robot from "../../Componentes/Robot";
import Prueba_ChatBot from "../../Componentes/Prueba_ChatBot";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import ChatbotUsageBar from "../../Componentes/Chatbot/ChatbotUsageBar";
import { AuthContext } from "../../utils/Auth_Context";
import { useFocusEffect } from "@react-navigation/native";


export default function Chatbot({navigation}: any) {

   // ================= Datos del usuario por un contexto difinido =================
  const authContext = useContext(AuthContext);
  if (!authContext) throw new Error("AuthContext no está disponible");
  const { usuario } = authContext;


  // ================= Funciones y estados para obtener la cantidad de notificaciones =================
  const [cantidad_notificaciones, setCantidad_notificaciones] = useState(0);

  useFocusEffect(
    useCallback(() => {
      const Obtener_Notificaciones = async () => {
        const res = await fetch(`http://35.174.135.238/notificaciones/todas`, {
          method: 'GET',
          headers: { 'Authorization': `Bearer ${usuario.token}` }
        });
        const data = await res.json();
        if(data.success === true){
          setCantidad_notificaciones(data.data.info_notificaciones.length);
        }
        else{
          setCantidad_notificaciones(0);
        }
      }

      Obtener_Notificaciones();
    }, [])
  );


  const [cambiar_tamano, setCambiar_tamano] = useState(false);
  

  const [intencion, setIntencion] = useState<string | null>(null);


  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#000000" }}>
      <View style={{ backgroundColor: colores.color_2 }}>
        <Header_pailapp 
          cantidad_notificaciones={cantidad_notificaciones}
        />
      </View>

      <View style={{ backgroundColor: colores.color_2, alignItems: "center" }}>
        <ChatbotUsageBar
            progress={0.7}
            remainingInteractions={15}
        />
      </View>

      <View style={{ backgroundColor: colores.color_2 }}>
        <Robot 
          cambiar_tamano={cambiar_tamano} 
          intencion={intencion} 
        />
      </View>

      <KeyboardAwareScrollView
        style={{ flex: 1, backgroundColor: '#000000' }}
        contentContainerStyle={{ flexGrow: 1, justifyContent: 'flex-end' }}
        keyboardShouldPersistTaps="handled"
        enableOnAndroid={true}
        scrollEnabled={false}  
        extraScrollHeight={80}
      >
        <View style={estilos_publicaciones.container}>
          <Prueba_ChatBot 
            setCambiar_tamano={setCambiar_tamano} 
            onIntencion={setIntencion}
          />
        </View>
      </KeyboardAwareScrollView>

      <View style={{ backgroundColor: colores.color_2 }}>
        <Navbar navigation={navigation} />
      </View>

    </SafeAreaView>
  );
}