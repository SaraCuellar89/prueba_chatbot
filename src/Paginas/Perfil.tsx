import React, { useCallback, useContext, useEffect, useState } from "react";
import { Image, ScrollView, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { colores } from "../estilos_global";
import Header from "../Componentes/Header";
import estilos_publicaciones from "./css/publicaciones_css";
import Header_Perfil from "../Componentes/Header_Perfil";
import Platos_Perfil from "../Componentes/Platos_Perfil";
import { AuthContext } from "../utils/Auth_Context";
import { Usuario_Sesion } from "../utils/Usuario_Sesion";
import { useFocusEffect } from "@react-navigation/native";
import { Mensaje_Toast } from "../utils/Mensaje_Toast";
import Texto from "../Componentes/Texto";
import Notificacion from "../Componentes/Notificacion";
import ModalConfirmacion from "../Componentes/ModalConfirmacion";

export interface Plato {
    id_publicacion: number;
    titulo: string;
    archivo: string;
    descripcion: string;
    ingredientes: string;
    preparacion: string;
    tiempo_preparacion: number;
    tipo_tiempo: string;
    dificultad: string;
    total_reacciones: number;
    total_comentarios: number;
    fecha_creacion: string;
    usuario_ya_reacciono: number;
    usuario_ya_guardo: number;
}

const Perfil = ({ navigation, route }: any) => {

    // ================= Datos del usuario por un contexto difinido =================
    const authContext = useContext(AuthContext);
    if (!authContext) throw new Error("AuthContext no está disponible");
    const { usuario } = authContext;


    // ================= Estados para ver la notificacion o el modal de confirmacion =================
    const {plato_editado} = route.params ?? {};

    const [modal_visible, setModal_visible] = useState(false);

    const [notificacion_exito, setNotificacion_exito] = useState(false);
    const [mensaje_notificacion, setMensaje_notificacion] = useState("");

    useEffect(() => {
        if (plato_editado) {
          Mostrar_Notificacion("¡Plato Editado!");
        }
      }, [plato_editado]);
    
    const Mostrar_Notificacion = (mensaje: string) => {
        setMensaje_notificacion(mensaje);
        setNotificacion_exito(true);
    }


    // ================= Funciones y estados para obtener todas los platos que ha subido el usuario =================
    const [mis_platos, setMis_platos] = useState<Plato[]>([]);

    useFocusEffect(
        useCallback(() => {
            const Obtener_Todos_Mis_Platos = async () => {
            const res = await fetch('http://35.174.135.238/publicaciones/todas_usuario', {
                method: 'GET',
                headers: {
                'Authorization': `Bearer ${usuario.token}`
                }
            });

            const data = await res.json();

            if(!data.success) return Mensaje_Toast.info(data.message);

            setMis_platos(data.data);
            };

            Obtener_Todos_Mis_Platos();
        }, [usuario.token])
    );


    // ================= Funciones y estados para eliminar una publicacion =================
    const [id_publicacion, setId_publicacion] = useState<number | null>(null);

    const Eliminar_Publicacion = async (id:number) => {
        const res = await fetch(`http://35.174.135.238/publicaciones/eliminar/${id}`, {
        method: "DELETE",
        headers: {
            'Authorization': `Bearer ${usuario.token}`
        }
        });

        const data = await res.json();
        
        if(!data.success) return Mensaje_Toast.info(data.message);

        setMis_platos(prev => prev.filter(p => p.id_publicacion !== id));

        Mostrar_Notificacion("Publicación eliminada");
    }


    return(
        <SafeAreaView style={{ flex: 1, backgroundColor: '#000000' }}>

        <View style={{backgroundColor: colores.color_2}}>
            <Header 
                title="Perfil" 
                onBack={() => navigation.goBack()} 
                icono={require('../Img/icono-configuracion.png')}
                navegar={() => navigation.navigate("Configuracion")} 
            /> 
        </View>

        {/* Renderizado de notificacion de plato subido */}
        {notificacion_exito && ( 
            <Notificacion
                mensaje={mensaje_notificacion}
                onFinish={() => setNotificacion_exito(false)}
                icono={require('../Img/icono-correcto.png')}
            />
        )}

       
        <ScrollView
            style={{ flex: 1, backgroundColor: '#000000' }}
            contentContainerStyle={{ flexGrow: 1 }}
            showsVerticalScrollIndicator={true}
            keyboardShouldPersistTaps="handled"
        >

        <View style={estilos_publicaciones.container}>

            <Header_Perfil
                nombre_usuario={usuario.nombre ?? "dato incompleto"}
                edad={usuario.edad ?? "dato incompleto "}
                sexo={usuario.sexo ?? "dato incompleto "}
                altura={usuario.altura ?? "dato incompleto "}
                peso={usuario.peso ?? "dato incompleto "}
                avatar={usuario.avatar ?? "dato incompleto"}
            />

            {mis_platos.length === 0 ? 
            (
                <View style={estilos_publicaciones.caja_vacio}>
                    <Texto>¡Sube un plato!</Texto>
                    <TouchableOpacity onPress={() => navigation.navigate('SubirReceta')}>
                        <Image 
                            source={require('../Img/icono-mas.png')} 
                            style={estilos_publicaciones.img_vacio}
                        />
                    </TouchableOpacity>
                </View>
            ) : 
            (
                <Platos_Perfil
                    platos={mis_platos}
                    navigation={navigation}
                    Mostrar_Notificacion={Mostrar_Notificacion}
                    Eliminar_Publicacion={(id: number) => {
                        setId_publicacion(id);
                        setModal_visible(true);
                    }}
                />
            )}
        </View>

        </ScrollView>

        <ModalConfirmacion
            texto={"¿Quieres eliminar esta publicación?"}
            visible={modal_visible}
            confirmar={() => {
                if (id_publicacion !== null) Eliminar_Publicacion(id_publicacion);
                setModal_visible(false);
            }}
            cancelar={() => setModal_visible(false)}
        />

        </SafeAreaView>
    )
}

export default Usuario_Sesion(Perfil);