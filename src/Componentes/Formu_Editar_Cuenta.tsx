import React from "react";
import { View, TouchableOpacity, TextInput, Image } from "react-native";
import Texto from "./Texto";
import estilo_formu_inicio_sesion_css from "./css/formu_inicio_sesion_css"
import estilos_global from "../estilos_global";
import DropDownPicker from "react-native-dropdown-picker";

const Formu_Editar_Cuenta = ({avatar, onAbrirAvatares, form, handleChange, abrir_sexo, setAbrir_sexo, sexo_value, setSexo_value, sexo, setSexo, Editar_Cuenta}: any) => {

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
          
          <TouchableOpacity onPress={onAbrirAvatares}>
            <Image
              source={
                avatar?.uri
                  ? { uri: avatar.uri }          
                  : form.avatar
                  ? { uri: form.avatar } 
                  : require('../Img/icono-usuario.png')  
              }
              style={{ width: 80, height: 80, borderRadius: 40 }}
              resizeMode="contain"
            />
          </TouchableOpacity>

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

        {/* --- Input del sexo --- */}
        <View style={estilo_formu_inicio_sesion_css.contenedor_input}>
            <Texto style={estilo_formu_inicio_sesion_css.texto_label}>Sexo</Texto>
            <DropDownPicker
                open={abrir_sexo}
                value={sexo_value}
                items={sexo}
                setOpen={setAbrir_sexo}
                setValue={setSexo_value}
                setItems={setSexo}
                placeholder="Ej: Femenino"
                placeholderStyle={{ color: 'grey' }}
                listMode="SCROLLVIEW"
                onChangeValue={(valor) => handleChange("sexo", valor ?? "")}
            />
        </View>

        {/* --- Input de la edad --- */}
        <View style={estilo_formu_inicio_sesion_css.contenedor_input}>
            <Texto style={estilo_formu_inicio_sesion_css.texto_label}>Edad</Texto>
            <TextInput 
                placeholder="Ej: 22" 
                placeholderTextColor={"grey"} 
                style={[estilos_global.caja_input]}
                value={form.edad}
                onChangeText={(valor) => handleChange("edad", valor)}
            />
        </View>

        {/* --- Input de la altura --- */}
        <View style={estilo_formu_inicio_sesion_css.contenedor_input}>
            <Texto style={estilo_formu_inicio_sesion_css.texto_label}>Altura</Texto>
            <TextInput 
                placeholder="Ej: 170" 
                placeholderTextColor={"grey"} 
                style={[estilos_global.caja_input]}
                value={form.altura}
                onChangeText={(valor) => handleChange("altura", valor)}
            />
        </View>

        {/* --- Input del peso --- */}
        <View style={estilo_formu_inicio_sesion_css.contenedor_input}>
            <Texto style={estilo_formu_inicio_sesion_css.texto_label}>Peso</Texto>
            <TextInput 
                placeholder="Ej: 60" 
                placeholderTextColor={"grey"} 
                style={[estilos_global.caja_input]}
                value={form.peso}
                onChangeText={(valor) => handleChange("peso", valor)}
            />
        </View>

        {/* --- Boton para enviar el Formulario --- */}

        <TouchableOpacity style={estilos_global.btn_1} onPress={Editar_Cuenta}>
         <Texto style={estilos_global.texto_btn_1}>Guardar</Texto> 
        </TouchableOpacity>

      </View>

    </View>
  );
}

export default Formu_Editar_Cuenta;