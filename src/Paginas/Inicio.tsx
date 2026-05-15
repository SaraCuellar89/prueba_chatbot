import React, { useState } from "react";
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { SafeAreaView } from "react-native-safe-area-context";
import Texto from "../Componentes/Texto";
import estilos_pantalla_inicio from "./css/inicio_css";
import Carrusel_Fondo from "../Componentes/Carrusel_Fondo";
import estilos_global from "../estilos_global";
import Notificacion from "../Componentes/Notificacion";


const Inicio = ({ navigation, route }: any) => {

    // ================= Estados para mostrar la notificacion de sesion cerrada =================
    const [mensaje_cerrar_sesion, setMensaje_cerrar_sesion] = useState(
        route.params?.cerro_sesion ?? false
    );

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: '#000000' }}>
            {/* Renderizado de notificacion de sesion cerrada */}
            {mensaje_cerrar_sesion && ( 
                <Notificacion
                    mensaje="Saliste de tu cuenta"
                    onFinish={() => setMensaje_cerrar_sesion(false)}
                    icono={require('../Img/icono-correcto.png')}
                />
            )}
            <View style={[estilos_pantalla_inicio.contenedor, estilos_global.fondo_2]}>

                <Carrusel_Fondo/>

                <View style={estilos_pantalla_inicio.caja_titulo}>
                    <Texto style={estilos_pantalla_inicio.titulo}>¡Bienvenido a PailApp!</Texto>
                </View>

                <TouchableOpacity style={estilos_pantalla_inicio.btn} onPress={() => navigation.navigate('Login')}>
                    <Texto style={estilos_pantalla_inicio.btn_texto}>Iniciar sesión</Texto>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => navigation.navigate("Registro")}  style={estilos_pantalla_inicio.btn}>
                    <Texto style={estilos_pantalla_inicio.btn_texto}>Registrarse</Texto>
                </TouchableOpacity>

            </View>
        </SafeAreaView>
    );
}

export default Inicio;