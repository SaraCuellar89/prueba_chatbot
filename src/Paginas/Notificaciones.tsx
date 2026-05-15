import React, { useContext, useEffect, useState } from "react";
import { ScrollView, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Header from "../Componentes/Header";
import { colores } from "../estilos_global";
import estilos_publicaciones from "./css/publicaciones_css";
import Tarjeta_Notificaciones from "../Componentes/Tarjeta_Notificaciones";
import { AuthContext } from "../utils/Auth_Context";
import { Mensaje_Toast } from "../utils/Mensaje_Toast";
import Texto from "../Componentes/Texto";

// Interfaz de las notificaciones
interface Notificacion {
    id_notificacion: number;
    tipo: string;
    nombre_emisor: string;
}

const Notificaciones = ({navigation}: any) => {

    // ================= Datos del usuario por un contexto difinido =================
    const authContext = useContext(AuthContext);
    if (!authContext) throw new Error("AuthContext no está disponible");
    const { usuario } = authContext;


    // ================= Funciones y estados para obtener todas las notificaciones del usuario =================
    const [notificaciones, setNotificaciones] = useState<Notificacion[]>([]);

    const Obtener_Notificaciones = async () => {
        const res = await fetch(`http://35.174.135.238/notificaciones/todas`, {
            method: 'GET',
            headers: { 'Authorization': `Bearer ${usuario.token}` }
        });

        const data = await res.json();

        if(data.data?.info_notificaciones) {
            setNotificaciones(data.data.info_notificaciones);
        } else {
            setNotificaciones([]);
        }
    }

    useEffect(() => {
        Obtener_Notificaciones()
    }, [])


    // ================= Funciones y estados para eliminar una notificacion =================
    const Eliminar_Notificacion = async (id_notificacion: number) => {
        const res = await fetch(`http://35.174.135.238/notificaciones/eliminar_una/${id_notificacion}`, {
            method: "DELETE",
            headers: {
                'Authorization': `Bearer ${usuario.token}`
            }
        });

        const data = await res.json();
        
        if(!data.success) return Mensaje_Toast.info(data.message);

        Obtener_Notificaciones();
    }

    return(
        <SafeAreaView style={{ flex: 1, backgroundColor: colores.color_4 }}>
        
            <View style={{backgroundColor: colores.color_2}}>
                <Header 
                    title="Notificaciones" 
                    onBack={() => navigation.goBack()} 
                /> 
            </View>

            
            <ScrollView
                style={{ flex: 1, backgroundColor: colores.color_4 }}
                contentContainerStyle={{ flexGrow: 1 }}
                showsVerticalScrollIndicator={true}
                keyboardShouldPersistTaps="handled"
            >

                <View style={estilos_publicaciones.container}>

                    {notificaciones.length === 0 ? 
                    (
                        <Texto style={estilos_publicaciones.texto_vacio}>No tienes notificaciones</Texto>
                    ) : 
                    (
                        <>
                            {notificaciones.map((n) => (
                                <Tarjeta_Notificaciones
                                    key={n.id_notificacion}
                                    id_notificacion={n.id_notificacion}
                                    tipo={n.tipo}
                                    usuario_emisor={n.nombre_emisor}
                                    Eliminar_Notificacion={Eliminar_Notificacion}
                                />
                            ))}
                        </>
                    )}

                </View>

            </ScrollView>

        </SafeAreaView>
    )
}

export default Notificaciones;