import React, { useContext, useState } from "react";
import { TextInput, TouchableOpacity, View } from "react-native";
import estilo_formu_inicio_sesion_css from "./css/formu_inicio_sesion_css";
import estilos_global from "../estilos_global";
import Texto from "./Texto";
import { AuthContext } from "../utils/Auth_Context";
import { Mensaje_Toast } from "../utils/Mensaje_Toast";

const Formu_Correo = ({correo, setCorreo, Solicitar_Recuperacion}: any) => {

    return(
        <View style={estilo_formu_inicio_sesion_css.content}>

            <View style={[estilo_formu_inicio_sesion_css.card, estilos_global.fondo_1]}>

                {/* --- Input de Correo electronico --- */}

                <View style={estilo_formu_inicio_sesion_css.contenedor_input}>
                <Texto style={estilo_formu_inicio_sesion_css.texto_label}>Correo Electronico</Texto>
                <TextInput 
                    placeholder="ejemplo@gmail.com" 
                    placeholderTextColor={"grey"} 
                    style={[estilos_global.caja_input]}
                    value={correo}
                    onChangeText={setCorreo}
                />
                </View>

                {/* --- Boton para enviar el Formulario --- */}

                <TouchableOpacity style={estilos_global.btn_1} onPress={Solicitar_Recuperacion}>
                    <Texto style={estilos_global.texto_btn_1}>Siguiente</Texto> 
                </TouchableOpacity>

            </View>
    
        </View>
    )
}

export default Formu_Correo;