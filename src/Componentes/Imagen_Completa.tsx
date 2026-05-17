import React from "react";
import { View, Image, TouchableOpacity } from "react-native";
import estilos_imagen_completa from "./css/imagen_completa";
import Texto from "./Texto";

const Imagen_Completa = ({imagen, Cerrar_Imagen}: any) => {

    return (
    <View style={estilos_imagen_completa.contenedor}>
        <Image
            source={{ uri: imagen }}
            style={estilos_imagen_completa.imagen}
            resizeMode="contain"
        />
        <TouchableOpacity 
            style={estilos_imagen_completa.btn_cerrar}
            // onPress={onCerrar}
        >
            <Texto style={estilos_imagen_completa.x} onPress={Cerrar_Imagen}>✕</Texto>
        </TouchableOpacity>
    </View>
  );
}

export default Imagen_Completa;