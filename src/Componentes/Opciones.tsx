import React, { useState } from "react";
import { Image, TouchableOpacity, View } from "react-native";
import Texto from "./Texto";
import { estilos_opciones } from "./css/opciones_css";

const Opciones = ({editar, setEditar, Ir_Editar, eliminar, setElimianr}: any) => {

    return(
        <View style={estilos_opciones.contenedor}>

            {/* --- Boton para editar --- */}
            <TouchableOpacity style={estilos_opciones.caja_opcion} onPress={Ir_Editar ? Ir_Editar : () => setEditar(!editar)} >
                <Image
                    source={require("../Img/icono-editar.png")}
                    style={estilos_opciones.iconos}
                    resizeMode="contain"
                />
                <Texto style={estilos_opciones.texto}>Editar</Texto>
            </TouchableOpacity>

            {/* --- Boton para eliminar --- */}
            <TouchableOpacity style={estilos_opciones.caja_opcion} onPress={() => setElimianr(!eliminar)}>
                <Image
                    source={require("../Img/icono-basura.png")}
                    style={estilos_opciones.iconos}
                    resizeMode="contain"
                />
                <Texto style={estilos_opciones.texto}>Eliminar</Texto>
            </TouchableOpacity>
        </View>
    )
}

export default Opciones;