import React, { useContext, useState } from "react";
import { KeyboardAvoidingView, Platform, ScrollView, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { colores } from "../estilos_global";
import Header from "../Componentes/Header";
import estilos_publicaciones from "./css/publicaciones_css";
import Formu_Datos_Adicionales from "../Componentes/Formu_Datos_Adicionales";
import { AuthContext } from "../utils/Auth_Context";
import { Mensaje_Toast } from "../utils/Mensaje_Toast";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Datos_Adicionales = ({ navigation }: any) => {

    // ================= Datos del usuario por un contexto difinido =================
    const authContext = useContext(AuthContext);
    if (!authContext) throw new Error("AuthContext no está disponible");
    const { usuario, setUsuario } = authContext;



    // ================= Funciones y estados para el inicio de sesion =================
    // Estado del formulario 
    const [form, setForm] = useState({
        sexo: "",
        edad: "",
        peso: "",
        altura: "",
    });


    // Estados para el dropdown de sexo
    const [abrir_sexo, setAbrir_sexo] = useState(false);
    const [sexo_value, setSexo_value] = useState(null);

    const [sexo, setSexo] = useState([
        { label: 'Masculino', value: 'Masculino' },
        { label: 'Femenino', value: 'Femenino' },
        { label: 'Prefiero no decirlo', value: 'Prefiero no decirlo' }
    ]);


    // Handle Change genérico 
    const handleChange = (campo: string, valor: string) => {
        setForm(prev => ({ ...prev, [campo]: valor }));
    };

    
    // Envio de los datos
    const Registrar_Adicionales = async () => {

        // Validaciones
        const { edad, peso, altura } = form;

        const edadNum = Number(edad);
        const pesoNum = Number(peso);
        const alturaNum = Number(altura);

        if (!edad || !peso || !altura) return Mensaje_Toast.error("Todos los campos son obligatorios");
        if (isNaN(edadNum) || isNaN(pesoNum) || isNaN(alturaNum)) return Mensaje_Toast.error("Solo se permiten valores numéricos");
        if (edadNum < 10 || edadNum > 120) return Mensaje_Toast.error("Edad fuera de rango válida (10-120)");
        if (pesoNum < 20 || pesoNum > 300) return Mensaje_Toast.error("Peso fuera de rango válido (20-300 kg)");
        if (alturaNum < 0.5 || alturaNum > 2.5) return Mensaje_Toast.error("Altura fuera de rango válida (0.50 - 2.50 m)");
        

        const res = await fetch('http://35.174.135.238/usuarios/registrar_datos_adicionales', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${usuario.token}`
            },
            body: JSON.stringify(form)
        });

        const data = await res.json();

        if(data.success === false) return Mensaje_Toast.info(data.message);


        // Actualizar contexto con los nuevos datos
        const usuario_actualizado = { ...usuario, edad: form.edad, peso: form.peso, altura: form.altura, sexo: form.sexo };
        setUsuario(usuario_actualizado);                             
        await AsyncStorage.setItem("usuario", JSON.stringify(usuario_actualizado));

        navigation.reset({
            index: 0,
            routes: [{ name: "Chatbot" }],
        });
    }



    return(
        <SafeAreaView style={{ flex: 1, backgroundColor: '#000000' }}>

            <View style={{backgroundColor: colores.color_2}}>
                <Header 
                    title="Datos Adicionales" 
                /> 
            </View> 

            <KeyboardAvoidingView
                style={{ flex: 1 }}
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            >

                <ScrollView
                    style={{ flex: 1, backgroundColor: colores.color_4 }}
                    contentContainerStyle={{ flexGrow: 1 }}
                    showsVerticalScrollIndicator={true}
                    keyboardShouldPersistTaps="handled"
                >

                    <View style={estilos_publicaciones.container}>

                        <Formu_Datos_Adicionales
                            abrir_sexo={abrir_sexo}
                            setAbrir_sexo={setAbrir_sexo}
                            sexo_value={sexo_value}
                            setSexo_value={setSexo_value}
                            sexo={sexo}
                            setSexo={setSexo}
                            handleChange={handleChange}
                            form={form} 
                            Registrar_Adicionales={Registrar_Adicionales}
                        />

                    </View>

                </ScrollView>

            </KeyboardAvoidingView>

        </SafeAreaView>
    )
}

export default Datos_Adicionales;