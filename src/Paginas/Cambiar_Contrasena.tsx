import React, { useContext, useState } from "react";
import { View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Header from "../Componentes/Header";
import estilos_global, { colores } from "../estilos_global";
import Formu_Cambiar_Contrasena from "../Componentes/Formu_Cambiar_Contrasena";
import estilos_publicaciones from "./css/publicaciones_css";
import { AuthContext } from "../utils/Auth_Context";
import { Mensaje_Toast } from "../utils/Mensaje_Toast";

const Cambiar_Contrasena = ({navigation}: any) => {

    // ================= Datos del usuario por un contexto difinido =================
    const authContext = useContext(AuthContext);
    if (!authContext) throw new Error("AuthContext no está disponible");
    const { usuario, setUsuario } = authContext;
    


    // ================= Estados para ver y ocultar contraseñas =================
    const [mostrar_contrasena, setMostrar_contrasena] = useState(false);
    const [mostrar_confirmar_contrasena, setMostrar_confirmar_contrasena] = useState(false);



    // ================= Funciones y estados para solicitar la un codigo de recuperacion de contrasena =================
    // Estado del formulario 
    const [form, setForm] = useState({
        token: "", 
        contrasena: "", 
        confirmacion_contrasena: ""
    });


    // Handle Change genérico 
    const handleChange = (campo: string, valor: string) => {
        setForm(prev => ({ ...prev, [campo]: valor }));
    };


    // Envio de los datos
    const Restablecer_Contrasena = async () => {

        // Validaciones
        const { contrasena, confirmacion_contrasena } = form;

        if (!contrasena || !confirmacion_contrasena) return Mensaje_Toast.error("Todos los campos son obligatorios");
        if (contrasena.length < 5) return Mensaje_Toast.error("La contraseña debe tener minimo 5 caracteres");
        if (contrasena !== confirmacion_contrasena) return Mensaje_Toast.error("Las contraseñas no coinciden");

        const res = await fetch('http://35.174.135.238/usuarios/restablecer_contrasena', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(form)
        });
        
        const data = await res.json();

        if(!data.success) return Mensaje_Toast.info(data.message);

        navigation.reset({
            index: 0,
            routes: [{ name: "Login" }],
        });
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
                    <Formu_Cambiar_Contrasena
                        form={form}
                        handleChange={handleChange}
                        mostrar_contrasena={mostrar_contrasena}
                        setMostrar_contrasena={setMostrar_contrasena}
                        mostrar_confirmar_contrasena={mostrar_confirmar_contrasena}
                        setMostrar_confirmar_contrasena={setMostrar_confirmar_contrasena} 
                        Restablecer_Contrasena={Restablecer_Contrasena}
                    />
                </View>

            </View>
        </SafeAreaView>
    )
}

export default Cambiar_Contrasena;