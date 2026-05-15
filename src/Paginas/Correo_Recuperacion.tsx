import React, { useContext, useState } from "react";
import { View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import estilos_global, { colores } from "../estilos_global";
import Header from "../Componentes/Header";
import Formu_Correo from "../Componentes/Formu_Correo";
import estilos_publicaciones from "./css/publicaciones_css";
import { AuthContext } from "../utils/Auth_Context";
import { Mensaje_Toast } from "../utils/Mensaje_Toast";

const Correo_Recuperacion = ({navigation}: any) => {

    // ================= Datos del usuario por un contexto difinido =================
    const authContext = useContext(AuthContext);
    if (!authContext) throw new Error("AuthContext no está disponible");
    const { usuario, setUsuario } = authContext;



    // ================= Funciones y estados para solicitar la un codigo de recuperacion de contrasena =================
    const [correo, setCorreo] = useState("");


    // Envio de los datos
    const Solicitar_Recuperacion = async () => {

        // Validaciones
        const emailRegex = /^[^@\s]+@[^@\s]+\.(com)$/;

        if (!correo) return Mensaje_Toast.error("Llene el campo solicitado");
        if (!emailRegex.test(correo)) return Mensaje_Toast.error("Correo invalido");

        const res = await fetch('http://35.174.135.238/usuarios/contrasena_olvidada', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ correo })
        });
        
        const data = await res.json();

        if(!data.success) return Mensaje_Toast.info(data.message);

        navigation.navigate("Cambiar_Contrasena");
    }


    
    return(
        <SafeAreaView style={{ flex: 1, backgroundColor: '#000000' }}>
            <View style={[estilos_global.fondo_2, { flex: 1 }]}>
                
                <View style={{backgroundColor: colores.color_2}}>
                <Header 
                    title="Recuperar" 
                    onBack={() => navigation.goBack()} 
                /> 
                </View> 

                <View style={estilos_publicaciones.container}>
                    <Formu_Correo
                        correo={correo}
                        setCorreo={setCorreo}
                        Solicitar_Recuperacion={Solicitar_Recuperacion}
                    />
                </View>

            </View>
        </SafeAreaView>
    )
}

export default Correo_Recuperacion;