import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colores } from '../estilos_global';

export const Configuracion_Toast = {
  success: ({ text1 }: any) => (
    <View style={estilos_toast.contenedor_exito}>
      <Text style={estilos_toast.texto}>{text1}</Text>
    </View>
  ),
  error: ({ text1 }: any) => (
    <View style={estilos_toast.contenedor_error}>
      <Text style={estilos_toast.texto}>{text1}</Text>
    </View>
  ),
  info: ({ text1 }: any) => (
    <View style={estilos_toast.contenedor_info}>
      <Text style={estilos_toast.texto}>{text1}</Text>
    </View>
  ),
};

const estilos_toast = StyleSheet.create({
  contenedor_exito: {
    backgroundColor: '#a7f091',
    borderWidth: 1,
    borderLeftWidth: 1,
    borderColor: colores.color_4,
    padding: 20,
    borderRadius: 10,
    width: '80%'
  },
  contenedor_error: {
    backgroundColor: '#f09191',
    borderWidth: 1,
    borderLeftWidth: 1,
    borderColor: colores.color_4,
    padding: 20,
    borderRadius: 10,
    width: '80%'
  },
  contenedor_info: {
    backgroundColor: '#f0df91',
    borderWidth: 1,
    borderLeftWidth: 1,
    borderColor: colores.color_4,
    padding: 20,
    borderRadius: 10,
    width: '80%'
  },
  texto: {
    color: colores.color_4,
    fontSize: 14,
    fontFamily: 'JetBrainsMono_400Regular',
    textAlign: "center"
  }
});