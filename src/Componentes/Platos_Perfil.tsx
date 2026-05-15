import React, { useState } from "react";
import estilos_platos_perfil from "./css/platos_perfil_css";
import Texto from "./Texto";
import { Image, TouchableOpacity, View } from "react-native";
import PublicacionCard from "./PublicacionCard";
import Opciones from "./Opciones";


const Platos_Perfil = ({navigation, platos, Mostrar_Notificacion, Eliminar_Publicacion}: any) => {

    // ================= Estados abrir la caja de opciones (editar/eliminar) =================
    const [plato_opciones, setPlato_opciones] = useState<number | null>(null);

    return(
        <View>
            <Texto style={estilos_platos_perfil.texto}>Platos que has subido</Texto>

            {platos.map((p: any) => (
                <View key={p.id_publicacion} style={estilos_platos_perfil.contendor_platos}>

                    {/* --- Caja de opciones --- */}
                    <TouchableOpacity style={estilos_platos_perfil.caja_publicacion} onPress={() => setPlato_opciones(plato_opciones === p.id_publicacion ? null : p.id_publicacion)}>
                        <Image
                            source={require("../Img/icono-puntos.png")}
                            style={estilos_platos_perfil.icono_puntos}
                            resizeMode="contain"
                        />
                    </TouchableOpacity>
                    <View>
                        <PublicacionCard
                            navigation={navigation}
                            id_publicacion={p.id_publicacion}
                            mi_plato_guardar_ejemplo={false}
                            mi_plato_setGuardar_Ejemplo={() => {}}
                            titulo={p.titulo}
                            archivo={p.archivo}
                            descripcion={p.descripcion}
                            ingredientes={p.ingredientes}
                            preparacion={p.preparacion}
                            tiempo_preparacion={p.tiempo_preparacion}
                            tipo_tiempo={p.tipo_tiempo}
                            dificultad={p.dificultad}
                            total_reacciones={p.total_reacciones}
                            total_comentarios={p.total_comentarios}
                            fecha_creacion={p.fecha_creacion}
                            corazon_inicial={p.usuario_ya_reacciono}
                            SetNotificacion_reaccion={() => Mostrar_Notificacion("¡Reacción agregada!")}
                            guardado_inicial={p.usuario_ya_guardo}
                            Setnotificacion_guardado={() => Mostrar_Notificacion("¡Receta guardada!")}
                        />
                    </View>

                    {plato_opciones === p.id_publicacion && (
                        <View style={estilos_platos_perfil.caja_opciones}>
                            <Opciones
                                editar={plato_opciones === p.id_publicacion}
                                setEditar={() => setPlato_opciones(null)}
                                Ir_Editar={() => navigation.navigate("SubirReceta", {plato: p})}
                                setElimianr={() => {
                                    Eliminar_Publicacion(p.id_publicacion);
                                    setPlato_opciones(null);      
                                }}
                            />
                        </View>
                    )}
                </View>
            ))}
            
        </View>
    )
}

export default Platos_Perfil;