import React from "react";
import { TouchableOpacity, View, TextInput } from "react-native";
import estilo_formu_inicio_sesion_css from "./css/formu_inicio_sesion_css";
import estilos_global from "../estilos_global";
import Texto from "./Texto";
import DropDownPicker from 'react-native-dropdown-picker';

const Formu_Datos_Adicionales = ({abrir_sexo, setAbrir_sexo, sexo_value, setSexo_value, sexo, setSexo, handleChange, form, Registrar_Adicionales}: any) => {

    return(
        <View style={estilo_formu_inicio_sesion_css.content}>

            <View style={[estilo_formu_inicio_sesion_css.card, estilos_global.fondo_1]}>

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
                        placeholder="Ej: 1.70" 
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

                {/* --- Boton para enviar el formulario --- */}
                <TouchableOpacity style={estilos_global.btn_1} onPress={Registrar_Adicionales}>
                    <Texto style={estilos_global.texto_btn_1}>Aceptar</Texto> 
                </TouchableOpacity>

            </View>           
        </View>
    )
}

export default Formu_Datos_Adicionales;