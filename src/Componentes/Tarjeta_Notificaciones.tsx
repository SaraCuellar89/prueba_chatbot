import React, { useRef } from "react";
import { Image, View, TouchableOpacity, Animated } from "react-native";
import Texto from "./Texto";
import estilos_tarjeta_notificaciones from "./css/tarjeta_notificaciones_css";

const Tarjeta_Notificaciones = ({id_notificacion, tipo, usuario_emisor, Eliminar_Notificacion} : any) => {

    // ================= Mensajes segun el tipo de notificacion =================
    const Obtener_Mensaje = (tipo: string, nombre: string) => {
        switch(tipo) {
            case 'like':      return `${nombre} le ha dado like a tu publicación`;
            case 'comentario': return `${nombre} ha comentado en tu publicación`;
            case 'guardado':  return `${nombre} ha guardado tu publicación`;
            default:          return `${nombre} interactuó con tu publicación`;
        }
    }

    // ================= Animacion al eliminar notificacion =================
    const opacidad = useRef(new Animated.Value(1)).current;
    const traslacion = useRef(new Animated.Value(0)).current;

    const Animar_Y_Eliminar = () => {
        Animated.parallel([
            Animated.timing(opacidad, {
                toValue: 0,
                duration: 400,
                useNativeDriver: true
            }),
            Animated.timing(traslacion, {
                toValue: 500,   
                duration: 400,
                useNativeDriver: true
            })
        ]).start(() => {
            Eliminar_Notificacion(id_notificacion);
        });
    }

    return(
        <Animated.View style={[       
            estilos_tarjeta_notificaciones.contenedor, 
            { 
                opacity: opacidad,
                transform: [{ translateX: traslacion }]
            }
        ]}>
           <View style={estilos_tarjeta_notificaciones.caja}>
                <Texto style={estilos_tarjeta_notificaciones.texto}>
                    {Obtener_Mensaje(tipo, usuario_emisor)}
                </Texto>
                <TouchableOpacity style={estilos_tarjeta_notificaciones.caja_icono} onPress={Animar_Y_Eliminar}>
                    <Image
                        source={require('../Img/icono-basura.png')}
                        style={estilos_tarjeta_notificaciones.icono}
                        resizeMode="contain"
                    />
                </TouchableOpacity>
            </View>

            <Texto style={estilos_tarjeta_notificaciones.fecha}>01/09/2026</Texto> 
        </Animated.View>
    )
}

export default Tarjeta_Notificaciones;