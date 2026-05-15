/**
 * Pantalla contenedora para crear una nueva receta o publicacion desde el formulario dedicado.
 */

import React from "react";
import { View, StyleSheet, KeyboardAvoidingView, Platform, ScrollView } from "react-native";
import FormSubirReceta from "../Componentes/FormSubirReceta";
import Header from "../Componentes/Header";
import { SafeAreaView } from "react-native-safe-area-context";
import { colores } from "../estilos_global";
import estilos_publicaciones from "./css/publicaciones_css";

export default function SubirReceta({ navigation, route }: any) {

  const plato = route.params?.plato; 
  const es_edicion = !!plato;

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#000000' }}>

      <View style={{backgroundColor: colores.color_2}}>
        <Header 
          title={es_edicion ? "Edita tu plato" : "¡Sube un plato!"} 
          onBack={es_edicion ? undefined : () => navigation.goBack()}
        /> 
      </View>

      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
      
        <ScrollView
          style={{ flex: 1, backgroundColor: '#000000' }}
          contentContainerStyle={{ flexGrow: 1 }}
          showsVerticalScrollIndicator={true}
          keyboardShouldPersistTaps="handled"
        >

        <View style={estilos_publicaciones.container}>

          <FormSubirReceta 
            navigation={navigation}
            plato={plato}
          />

        </View>

        </ScrollView>

      </KeyboardAvoidingView>

    </SafeAreaView>
  );
}
