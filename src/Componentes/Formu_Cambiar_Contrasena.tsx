import React from "react";
import { Image, TextInput, TouchableOpacity, View } from "react-native";
import estilo_formu_inicio_sesion_css from "./css/formu_inicio_sesion_css";
import estilos_global from "../estilos_global";
import Texto from "./Texto";

const Formu_Cambiar_Contrasena = ({form, handleChange, mostrar_contrasena, setMostrar_contrasena, mostrar_confirmar_contrasena, setMostrar_confirmar_contrasena, Restablecer_Contrasena}: any) => {

    return(
        <View style={estilo_formu_inicio_sesion_css.content}>

            <View style={[estilo_formu_inicio_sesion_css.card, estilos_global.fondo_1]}>

                <Texto>Te hemos enviado un codigo de 5 digitos al correo.</Texto>

                <View style={estilo_formu_inicio_sesion_css.contenedor_input}>
                    <Texto style={estilo_formu_inicio_sesion_css.texto_label}>Codigo</Texto>
                    <TextInput 
                        placeholder="00000" 
                        placeholderTextColor={"grey"} 
                        style={[estilos_global.caja_input]}
                        value={form.token}
                        onChangeText={(valor) => handleChange("token", valor)}
                    />
                </View>

                {/* --- Input de Contraseña --- */}

                <View style={estilo_formu_inicio_sesion_css.contenedor_input}>
                    <Texto style={estilo_formu_inicio_sesion_css.texto_label}>Contraseña</Texto>
                    
                    <View style={estilo_formu_inicio_sesion_css.caja_contrasena}>
                        <TextInput 
                            secureTextEntry={!mostrar_contrasena}
                            placeholder="••••••••" 
                            placeholderTextColor={"grey"} 
                            style={estilo_formu_inicio_sesion_css.caja_input_contrasena}
                            value={form.contrasena}
                            onChangeText={(valor) => handleChange("contrasena", valor)}
                        />
                        <TouchableOpacity onPress={() => setMostrar_contrasena(!mostrar_contrasena)}>
                        <Image
                            source={require("../Img/oculto.png")}
                            style={mostrar_contrasena ? estilo_formu_inicio_sesion_css.no_ver_contrasena : estilo_formu_inicio_sesion_css.ver_contrasena}
                            resizeMode="contain"
                        />
                        </TouchableOpacity>
                    </View>
                </View>

                {/* --- Input de Confirmar Contraseña --- */}

                <View style={estilo_formu_inicio_sesion_css.contenedor_input}>
                    <Texto style={estilo_formu_inicio_sesion_css.texto_label}>Confirmar Contraseña</Texto>
                    
                    <View style={estilo_formu_inicio_sesion_css.caja_contrasena}>
                        <TextInput 
                            secureTextEntry={!mostrar_confirmar_contrasena}
                            placeholder="••••••••" 
                            placeholderTextColor={"grey"} 
                            style={estilo_formu_inicio_sesion_css.caja_input_contrasena}
                            value={form.confirmacion_contrasena}
                            onChangeText={(valor) => handleChange("confirmacion_contrasena", valor)}
                        />
                        <TouchableOpacity onPress={() => setMostrar_confirmar_contrasena(!mostrar_confirmar_contrasena)}>
                        <Image
                            source={require("../Img/oculto.png")}
                            style={mostrar_confirmar_contrasena ? estilo_formu_inicio_sesion_css.no_ver_contrasena : estilo_formu_inicio_sesion_css.ver_contrasena}
                            resizeMode="contain"
                        />
                        </TouchableOpacity>
                    </View>
                </View>

                

                {/* --- Boton para enviar el Formulario --- */}

                <TouchableOpacity style={estilos_global.btn_1} onPress={Restablecer_Contrasena}>
                    <Texto style={estilos_global.texto_btn_1}>Aceptar</Texto> 
                </TouchableOpacity>

            </View>
        </View>
    )
}

export default Formu_Cambiar_Contrasena;