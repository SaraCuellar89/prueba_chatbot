import React from "react";
import { View, TouchableOpacity, TextInput, Image } from "react-native";
import { useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import Texto from "./Texto";
import estilo_formu_inicio_sesion_css from "./css/formu_inicio_sesion_css"
import estilos_global from "../estilos_global";

const Formu_Registro = ({avatar, onAbrirAvatares, form, handleChange, mostrar_contrasena, setMostrar_contrasena, mostrar_confirmar_contrasena, setMostrar_confirmar_contrasena, Registrar_Usuario, Registrar_Google}: any) => {

  return (
    <View style={estilo_formu_inicio_sesion_css.content}>

      <View style={[estilo_formu_inicio_sesion_css.card, estilos_global.fondo_1]}>

        {/* --- Input de Nombre de usuario --- */}

        <View style={estilo_formu_inicio_sesion_css.contenedor_input}>
          <Texto style={estilo_formu_inicio_sesion_css.texto_label}>Nombre de Usuario</Texto>
          <TextInput 
            placeholder="Pepe Perez" 
            placeholderTextColor={"grey"} 
            style={[estilos_global.caja_input]}
            value={form.nombre_usuario}
            onChangeText={(valor) => handleChange("nombre_usuario", valor)}
          />
        </View>

        {/* --- Seleccionar avatar --- */}
        <View style={estilo_formu_inicio_sesion_css.contenedor_input}>
          <Texto style={estilo_formu_inicio_sesion_css.texto_label}>Avatar</Texto>
          
          {avatar ?
          (
            <TouchableOpacity onPress={onAbrirAvatares}>
              <Image
                source={avatar}
                style={{ width: 80, height: 80, borderRadius: 40 }}
                resizeMode="contain"
              />
            </TouchableOpacity>
          ) : 
          (
            <TouchableOpacity onPress={onAbrirAvatares}>
              <Image
                source={require('../Img/icono-usuario.png')}
                style={{ width: 80, height: 80, borderRadius: 40 }}
                resizeMode="contain"
              />
            </TouchableOpacity>
          )}

        </View>

        {/* --- Input de Correo electronico --- */}

        <View style={estilo_formu_inicio_sesion_css.contenedor_input}>
          <Texto style={estilo_formu_inicio_sesion_css.texto_label}>Correo Electronico</Texto>
          <TextInput 
            placeholder="ejemplo@gmail.com" 
            placeholderTextColor={"grey"} 
            style={[estilos_global.caja_input]}
            value={form.correo}
            onChangeText={(valor) => handleChange("correo", valor)}
            keyboardType="email-address"
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

        <TouchableOpacity style={estilos_global.btn_1} onPress={Registrar_Usuario}>
         <Texto style={estilos_global.texto_btn_1}>Registrar</Texto> 
        </TouchableOpacity>

      </View>

      {/* --- Boton para Iniciar Sesion con Google --- */}
      <TouchableOpacity style={estilo_formu_inicio_sesion_css.googleBtn} onPress={Registrar_Google}>
        <Texto style={estilo_formu_inicio_sesion_css.texto_googleBtn}>Continuar con Google</Texto>
      </TouchableOpacity>

    </View>
  );
}

export default Formu_Registro;
