import React, { useEffect, useState } from "react";
import { Image, TextInput, TouchableOpacity, View } from "react-native";
import { estilos_comentarios } from "./css/comentarios_css";
import Texto from "./Texto";
import Opciones from "./Opciones";
import estilos_global from "../estilos_global";
import { useContext } from "react";
import { AuthContext } from "../utils/Auth_Context";
import { Mensaje_Toast } from "../utils/Mensaje_Toast";

const Respuestas = ({id_respuesta, avatar_respuesta, usuario_respuesta, fecha_respuesta, texto_respuesta, id_usuario_respuesta, eliminar_respuesta, setEliminar_respuesta, Editar_Respuesta}: any) => {

    // ================= Datos del usuario por un contexto difinido =================
    const authContext = useContext(AuthContext);
    if (!authContext) throw new Error("AuthContext no está disponible");
    const { usuario, setUsuario } = authContext;



    // ================= Variable para mostrar caja de oopciones dependiendo de si el usuario realiza la respuesta =================
    const es_autor = usuario.id === id_usuario_respuesta;



    // ================= Estados y funciones para editar una respuesta =================
    const [caja_opciones, setCaja_opciones] = useState(false);
    const [editar, setEditar] = useState(false);

    useEffect(() => {
        if (editar) {
            setCaja_opciones(false);
        }
    }, [editar]);



    // ================= Funciones y estados para editar una respuesta =================
    const [respuesta_editada, setRespuesta_editada] = useState(texto_respuesta);


    
    return(
        <View style={[estilos_comentarios.contenedor_componente_respuestas, estilos_comentarios.contenedor]}>
            <View style={estilos_comentarios.contenedor_info}>
                <View style={estilos_comentarios.caja_info}>
                    <Image
                        source={{uri: avatar_respuesta}}
                        style={estilos_comentarios.foto_usuario}
                        resizeMode="contain"
                    />
                    <Texto style={estilos_comentarios.nombre_usuario}>{usuario_respuesta}</Texto>
                    <Texto style={estilos_comentarios.texto}>{new Date(fecha_respuesta).toLocaleDateString("es-CO")}</Texto>
                </View>
                
                {es_autor && (
                    <TouchableOpacity onPress={() => setCaja_opciones(!caja_opciones)}>
                        <Image
                            source={require("../Img/icono-puntos.png")}
                            style={estilos_comentarios.icono_puntos}
                            resizeMode="contain"
                        />
                    </TouchableOpacity>
                )}
            </View> 

            {caja_opciones === false ? 
            (
                null
            ): 
            (
                <View style={estilos_comentarios.caja_opciones}>
                    <Opciones
                        editar={editar}
                        setEditar={setEditar}
                        eliminar={eliminar_respuesta}
                        setElimianr={setEliminar_respuesta}
                    />
                </View>
            )}

            {editar === false ?
            (
                <Texto style={estilos_comentarios.texto}>
                    {texto_respuesta}
                </Texto>
            ) : 
            (
                <View>
                    <TextInput
                        style={estilos_comentarios.input_editar}
                        multiline={true}
                        numberOfLines={4}        
                        textAlignVertical="top"
                        value={respuesta_editada}
                        onChangeText={setRespuesta_editada}
                    />
                    
                    <View style={estilos_comentarios.caja_btn_editar}>
                        <TouchableOpacity style={estilos_global.btn_1} onPress={() => {Editar_Respuesta(id_respuesta, respuesta_editada); setEditar(!editar)}}>
                            <Texto style={estilos_global.texto_btn_1}>Guardar</Texto>
                        </TouchableOpacity>
                        <TouchableOpacity style={estilos_global.btn_1} onPress={() => setEditar(!editar)}>
                            <Texto style={estilos_global.texto_btn_1}>Cancelar</Texto>
                        </TouchableOpacity>
                    </View>
                </View>
            )}
           
        </View>
    )
}

export default Respuestas;