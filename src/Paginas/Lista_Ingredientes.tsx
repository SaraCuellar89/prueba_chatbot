import React, { useContext, useEffect, useState } from "react";
import { KeyboardAvoidingView, Platform, ScrollView, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Header from "../Componentes/Header";
import { colores } from "../estilos_global";
import estilos_publicaciones from "./css/publicaciones_css";
import Texto from "../Componentes/Texto";
import estilos_lista_ingredientes from "./css/lista_ingredientes";
import Formu_Lista_Ingredientes from "../Componentes/Formu_Lista_Ingredientes";
import { Mensaje_Toast } from "../utils/Mensaje_Toast";
import { AuthContext } from "../utils/Auth_Context";

const Lista_Ingredientes = ({ route, navigation }: any) => {

    // ================= Datos del usuario por un contexto difinido =================
    const authContext = useContext(AuthContext);
    if (!authContext) throw new Error("AuthContext no está disponible");
    const { usuario } = authContext;


    // ================= Funciones y Estados para obtener los ingredientes de la publicacion =================
    const [ingredientes, setIngredientes] = useState([]);

    const {id_publicacion, nombre_publicacion} = route.params;

    useEffect(() => {
        const Obtener_Ingredientes  = async () => {
            const res = await fetch(`http://35.174.135.238/ingredientes/todos/${id_publicacion}`, {
              method: 'GET',
              headers: {
                'Authorization': `Bearer ${usuario.token}`
              }
            });
        
            const data = await res.json();
            if(!data.success) return Mensaje_Toast.info(data.message);

            setIngredientes(data.data);
          };

          Obtener_Ingredientes()
    }, [])

    return(
        <SafeAreaView style={{ flex: 1, backgroundColor: colores.color_4 }}>
        
            <View style={{backgroundColor: colores.color_2}}>
                <Header 
                    title="Lista" 
                    onBack={() => navigation.goBack()} 
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

                        <Texto style={estilos_lista_ingredientes.texto}>Lo que necesitas para hacer "{nombre_publicacion}"</Texto>

                        <Formu_Lista_Ingredientes
                            id_publicacion={id_publicacion}
                            ingredientes_iniciales={ingredientes}
                        />

                    </View>

                </ScrollView>

            </KeyboardAvoidingView>

        </SafeAreaView>
    )
}

export default Lista_Ingredientes;