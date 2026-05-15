/**
 * Toast animado que muestra mensajes breves de confirmacion al usuario.
 */

import React, { useEffect, useRef } from "react";
import { View, Text, Animated, Image } from "react-native";
import estilos_notificacion from "./css/notificacion_css";

export default function Notificacion({ mensaje, onFinish, icono }: any) {
  const progreso = useRef(new Animated.Value(1)).current;
  const translateX = useRef(new Animated.Value(300)).current;

  useEffect(() => {
    Animated.spring(translateX, {
      toValue: 0,
      useNativeDriver: true,
      tension: 80,
      friction: 10,
    }).start();

    Animated.timing(progreso, {
      toValue: 0,
      duration: 4000,
      useNativeDriver: false,
    }).start(() => {
      Animated.timing(translateX, {
        toValue: 300,
        duration: 300,
        useNativeDriver: true,
      }).start(() => onFinish());
    });
  }, []);

  const width = progreso.interpolate({
    inputRange: [0, 1],
    outputRange: ["0%", "100%"],
  });

  return (
    <Animated.View style={[estilos_notificacion.container, { transform: [{ translateX }] }]}>
      <View style={estilos_notificacion.contenido}>
        <View style={estilos_notificacion.iconoContainer}>
          <Image
            source={icono}
            style={estilos_notificacion.icono}
            resizeMode="contain"
          />
        </View>
        <Text style={estilos_notificacion.texto}>{mensaje}</Text>
      </View>
      <View>
        <Animated.View style={[estilos_notificacion.barra, { width }]} />
      </View>
    </Animated.View>
  );
}
