import React, { useState, useMemo } from "react";
import { View, KeyboardAvoidingView, Platform, ScrollView, PanResponder, useWindowDimensions } from "react-native";
import Header_pailapp from "../../Componentes/Header_pailapp";
import Navbar from "../../Componentes/Navbar";
import { SafeAreaView } from "react-native-safe-area-context";
import estilos_global, { colores } from "../../estilos_global";
import estilos_publicaciones from "../css/publicaciones_css";
import Robot from "../../Componentes/Robot";
import Prueba_ChatBot from "../../Componentes/Prueba_ChatBot";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';


export default function Chatbot({navigation}: any) {

  const { height } = useWindowDimensions();


  const [cambiar_tamano, setCambiar_tamano] = useState(false);
  

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#000000" }}>
      <View style={{ backgroundColor: colores.color_2 }}>
        <Header_pailapp />
      </View>

      <KeyboardAwareScrollView
          style={{ flex: 1, backgroundColor: '#000000' }}
          contentContainerStyle={{ flexGrow: 1 }}
          keyboardShouldPersistTaps="handled"
          enableOnAndroid={true}
          extraScrollHeight={height * 0.1}
          extraHeight={height * 0.1}
      >
        <View style={estilos_publicaciones.container}>
          <Robot 
            cambiar_tamano={cambiar_tamano} 
          />
          <Prueba_ChatBot 
            setCambiar_tamano={setCambiar_tamano} 
          />
        </View>
      </KeyboardAwareScrollView>

      <View style={{ backgroundColor: colores.color_2 }}>
        <Navbar navigation={navigation} />
      </View>

    </SafeAreaView>
  );
}