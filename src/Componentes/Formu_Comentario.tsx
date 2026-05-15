import React, { useContext, useState } from "react";
import { Image, TextInput, TouchableOpacity, View } from "react-native";
import { estilos_formu_comentario } from "./css/formu_comentario_css";

const Formu_Comentario = ({contenido, setcontenido, onSubmit}:any) => {

    return(
        <View style={estilos_formu_comentario.contenedor}>

            {/* --- Input para escribir un comentario --- */}
            <TextInput 
                style={estilos_formu_comentario.input}
                placeholder="Escribe tu opinion"
                placeholderTextColor={"gray"}
                value={contenido}
                onChangeText={setcontenido}
            />

            {/* --- Boton para subir el comentario --- */}
            <TouchableOpacity onPress={onSubmit}>
                <Image
                    source={require("../Img/icono-enviado.png")}
                    style={estilos_formu_comentario.icono}
                    resizeMode="contain"
                />
            </TouchableOpacity>
        </View>
    )
}

export default Formu_Comentario;