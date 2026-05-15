import React, { useEffect, useState } from "react";
import { Image, TextInput, TouchableOpacity, View } from "react-native";
import Texto from "./Texto";
import { estilos_comentarios } from "./css/comentarios_css";
import Formu_Comentario from "./Formu_Comentario";
import Respuestas from "./Respuestas";
import Opciones from "./Opciones";
import estilos_global from "../estilos_global";
import { useContext } from "react";
import { AuthContext } from "../utils/Auth_Context";


const Comentarios = ({Editar_Comentario, eliminar_comentario, setEliminar_comentario, id_comentario, avatar, nombre_usuario, fecha, contenido, contenido_respuesta, setcontenido_respuesta, Responder, total_respuestas, respuestas, id_usuario_comentario, setEliminar_respuesta, Editar_Respuesta}: any) => {

    // ================= Datos del usuario por un contexto difinido =================
    const authContext = useContext(AuthContext);
    if (!authContext) throw new Error("AuthContext no está disponible");
    const { usuario, setUsuario } = authContext;


    
    // ================= Variable para mostrar caja de oopciones dependiendo de si el usuario realizo el comentario =================
    const es_autor = usuario.id === id_usuario_comentario;



    // ================= Estados para abrir el input de responder y para abrir las respuestas del comentario =================
    const [formu_respuesta, setFormu_respuesta] = useState(false);
    const [caja_respuestas, setCaja_respuestas] = useState(false);



    // ================= Estados y funciones para abrir la caja de editar/eliminar y para abrir el input de editar comentario =================
    const [caja_opciones, setCaja_opciones] = useState(false);
    const [editar, setEditar] = useState(false);

    useEffect(() => {
        if (editar) {
            setCaja_opciones(false);
        }
    }, [editar]);



    // ================= Estados para editar un comentario =================
    const [comentario_editado, setComentario_editado] = useState(contenido);
    

    
    return(
        <View style={estilos_comentarios.contenedor}>

            {/* --- Informacion del usuario y la fecha --- */}
            <View style={estilos_comentarios.contenedor_info}>
                <View style={estilos_comentarios.caja_info}>
                    <Image
                        source={{uri: avatar}}
                        style={estilos_comentarios.foto_usuario}
                        resizeMode="contain"
                    />
                    <Texto style={estilos_comentarios.nombre_usuario}>{nombre_usuario}</Texto>
                    <Texto style={estilos_comentarios.texto}>{new Date(fecha).toLocaleDateString("es-CO")}</Texto>
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

            {/* --- Opciones para editar o eliminar el comentario --- */}
            {caja_opciones === false ? 
            (null): 
            (
                <View style={estilos_comentarios.caja_opciones}>
                    <Opciones
                        editar={editar}
                        setEditar={setEditar}
                        eliminar={eliminar_comentario}
                        setElimianr={() => setEliminar_comentario(id_comentario)}
                    />
                </View>
            )}

            {/* --- Input para editar el comentario --- */}
            {editar === false ?
            (
                <Texto style={estilos_comentarios.texto}>
                    {contenido}
                </Texto>
            ) : 
            (
                <View>
                    <TextInput
                        style={estilos_comentarios.input_editar}
                        multiline={true}
                        numberOfLines={4}        
                        textAlignVertical="top"
                        value={comentario_editado}
                        onChangeText={setComentario_editado}
                    />
                    
                    <View style={estilos_comentarios.caja_btn_editar}>
                        <TouchableOpacity style={estilos_global.btn_1} onPress={() => {Editar_Comentario(comentario_editado); setEditar(!editar)}}>
                            <Texto style={estilos_global.texto_btn_1}>Guardar</Texto>
                        </TouchableOpacity>
                        <TouchableOpacity style={estilos_global.btn_1} onPress={() => setEditar(!editar)}>
                            <Texto style={estilos_global.texto_btn_1}>Cancelar</Texto>
                        </TouchableOpacity>
                    </View>
                </View>
            )}

            {/* --- Opciones para responder un comentario o para ver todas las respuestas --- */}
            <View style={estilos_comentarios.contenedor_respuestas}>
                <TouchableOpacity onPress={() => setFormu_respuesta(!formu_respuesta)}>
                    <Texto style={estilos_comentarios.nombre_usuario}>Responder</Texto>
                </TouchableOpacity>
                
                <TouchableOpacity style={estilos_comentarios.caja_respuestas} onPress={() => setCaja_respuestas(!caja_respuestas)}>
                    <Texto style={estilos_comentarios.texto}>{total_respuestas}</Texto>
                    <Image
                        source={require("../Img/icono-respuesta.png")}
                        style={estilos_comentarios.icono_respuesta}
                        resizeMode="contain"
                    />
                </TouchableOpacity>
            </View>

            {formu_respuesta === true ? 
            (
                <Formu_Comentario
                    contenido={contenido_respuesta}
                    setcontenido={setcontenido_respuesta}
                    onSubmit={Responder}
                />
            ) : 
            (null)}

            {caja_respuestas === true ? 
            (
                <>
                    {respuestas.length === 0 ? 
                    (
                        <Texto style={{textAlign: "center", marginVertical: 10, fontSize: 12}}>No hay respuestas</Texto>
                    ) : 
                    (
                        respuestas.map((r: any) => (
                            <Respuestas
                                key={r.respuesta_id}
                                id_respuesta={r.respuesta_id}
                                id_usuario_respuesta={r.autor_respuesta_id}
                                avatar_respuesta={r.autor_respuesta_avatar}
                                usuario_respuesta={r.autor_respuesta_nombre}
                                fecha_respuesta={r.respuesta_fecha}
                                texto_respuesta={r.respuesta_contenido}
                                setEliminar_respuesta={() => setEliminar_respuesta(r.respuesta_id)}
                                Editar_Respuesta={Editar_Respuesta}
                            />
                        ))
                    )}
                </>
            ) : 
            (null)}
           
        </View>
    )
}

export default Comentarios;