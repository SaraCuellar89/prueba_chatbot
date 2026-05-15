import React from "react";
import { Image, View } from "react-native";
import Texto from "./Texto";
import estilos_header_perfil from "./css/header_perfil_css";

const Header_Perfil = ({nombre_usuario, edad, sexo, altura, peso, avatar}: any) => {
    
    return(
        <View style={estilos_header_perfil.contenedor}>

            {/* --- Foto de perfil y nombre del usuario --- */}
            <View style={estilos_header_perfil.caja_perfil}>
                <Image
                    source={{uri: avatar}}
                    style={estilos_header_perfil.foto_perfil}
                    resizeMode="contain"
                />

                <Texto style={estilos_header_perfil.nombre_usuario}>{nombre_usuario}</Texto>
            </View>

            {/* --- Informacion adicional del usuario --- */}
            <View style={estilos_header_perfil.caja_info_extra}>
                <View style={estilos_header_perfil.info_extra}>
                    <Texto style={estilos_header_perfil.texto_info_extra}>Tu edad: {edad}</Texto>
                </View>

                <View style={estilos_header_perfil.info_extra}>
                    <Texto style={estilos_header_perfil.texto_info_extra}>Tu sexo: {sexo}</Texto>
                </View>

                <View style={estilos_header_perfil.info_extra}>
                    <Texto style={estilos_header_perfil.texto_info_extra}>Tu Altura: {altura}cm</Texto>
                </View>

                <View style={estilos_header_perfil.info_extra}>
                    <Texto style={estilos_header_perfil.texto_info_extra}>Tu peso: {peso}kg</Texto>
                </View>
            </View>
        </View>
    )
}

export default Header_Perfil;