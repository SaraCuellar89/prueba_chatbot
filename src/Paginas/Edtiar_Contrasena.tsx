import React, { useContext, useState } from "react";
import { View, ScrollView, KeyboardAvoidingView, Platform, ImageSourcePropType } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Header from "../Componentes/Header";
import { colores } from "../estilos_global";
import estilos_publicaciones from "./css/publicaciones_css";
import Formu_Editar_Contrasena from "../Componentes/Formu_Editar_Contrasena";
import { AuthContext } from "../utils/Auth_Context";
import { Mensaje_Toast } from "../utils/Mensaje_Toast";

export default function Editar_Contrasena({ navigation }: any) {

  // ================= Datos del usuario por un contexto difinido =================
  const authContext = useContext(AuthContext);
  if (!authContext) throw new Error("AuthContext no está disponible");
  const { usuario, setUsuario } = authContext;



  // ================= Estados para ver y ocultar contraseñas =================
  const [mostrar_contrasena_actual, setMostrar_contrasena_actual] = useState(false);
  const [mostrar_contrasena_nueva, setMostrar_contrasena_nueva] = useState(false);
  const [mostrar_confirmar_contrasena, setMostrar_confirmar_contrasena] = useState(false);



  // ================= Funciones y estados para el inicio de sesion =================
  // Estado del formulario 
  const [form, setForm] = useState({
      contrasena_actual: "", 
      contrasena_nueva: "", 
      confirmacion_contrasena:""
  });


  // Handle Change genérico 
  const handleChange = (campo: string, valor: string) => {
      setForm(prev => ({ ...prev, [campo]: valor }));
  };


  // Envio de los datos
  const Editar_Contrasena = async () => {

    // Validaciones
    const { contrasena_actual, contrasena_nueva, confirmacion_contrasena} = form;
    if (!contrasena_actual || !contrasena_nueva || !confirmacion_contrasena) return Mensaje_Toast.error("Todos los campos son obligatorios");
    if(contrasena_nueva.trim().length < 5){
        return Mensaje_Toast.error("La contraseña debe tener al menos 5 caracteres");
    }

    const res = await fetch('http://35.174.135.238/usuarios/editar_contrasena', {
    method: "PUT",
    headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${usuario.token}`
    },
    body: JSON.stringify(form)
    });

    const data = await res.json();

    if(data.success === false) return Mensaje_Toast.info(data.message);

    navigation.reset({
      index: 1,
      routes: [
        { name: "Chatbot" },
        { name: "Configuracion", params: { contrasena_editada: true } },
      ],
    });
  }



  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#000000' }}>

      <View style={{backgroundColor: colores.color_2}}>
        <Header 
          title="Cambiar Contraseña" 
          onBack={() => navigation.goBack()} 
        /> 
      </View> 

      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        
        <ScrollView
            style={{ flex: 1, backgroundColor: '#000000' }}
            showsVerticalScrollIndicator={true}
            keyboardShouldPersistTaps="handled"
        >
            <View style={[estilos_publicaciones.container, { minHeight: '100%' }]}>    
                <Formu_Editar_Contrasena
                  mostrar_contrasena_actual={mostrar_contrasena_actual}
                  setMostrar_contrasena_actual={setMostrar_contrasena_actual}
                  mostrar_contrasena_nueva={mostrar_contrasena_nueva}
                  setMostrar_contrasena_nueva={setMostrar_contrasena_nueva}
                  mostrar_confirmar_contrasena={mostrar_confirmar_contrasena}
                  setMostrar_confirmar_contrasena={setMostrar_confirmar_contrasena}
                  form={form}
                  handleChange={handleChange}
                  Editar_Contrasena={Editar_Contrasena}
                />
            </View>
        </ScrollView>

      </KeyboardAvoidingView>

    </SafeAreaView>
  );
}
