import React, { useContext, useEffect, useState } from "react";
import { View, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Header from "../Componentes/Header";
import Formu_Inicio from "../Componentes/Formu_Inicio";
import { colores } from "../estilos_global";
import Notificacion from "../Componentes/Notificacion";
import estilos_publicaciones from "./css/publicaciones_css";
import { AuthContext } from "../utils/Auth_Context";
import { Mensaje_Toast } from "../utils/Mensaje_Toast";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { obtener_token_fcm } from '../utils/Notificaciones';

GoogleSignin.configure({
  webClientId: '354612197459-c5q1pro6hi6nicq41lelu9ishds5a8qj.apps.googleusercontent.com',
});

export default function Login({ navigation, route }: any) {

  // ================= Datos del usuario por un contexto difinido =================
  const authContext = useContext(AuthContext);
  if (!authContext) throw new Error("AuthContext no está disponible");
  const { setUsuario } = authContext;



  // ================= Estados para mostrar registro exitoso =================
  const [mensaje_cerrar_sesion, setMensaje_cerrar_sesion] = useState(
      route.params?.registro_exitoso ?? false
  );



  // ================= Estados para ver y ocultar contraseña =================
  const [mostrar_contrasena, setMostrar_contrasena] = useState(false);



  // ================= Funciones y estados para iniciar sesion de manera local =================
  // Estado del formulario 
  const [form, setForm] = useState({
      correo: "",
      contrasena: "",
  });


  // Handle Change genérico 
  const handleChange = (campo: string, valor: string) => {
      setForm(prev => ({ ...prev, [campo]: valor }));
  };


  // Envio de los datos
  const Iniciar_Sesion = async () => {

    // Validaciones
    const { correo, contrasena } = form;
    if (!correo || !contrasena) return Mensaje_Toast.error("Todos los campos son obligatorios");

    const res = await fetch('http://35.174.135.238/usuarios/iniciar_sesion', {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(form)
    });

    const data = await res.json();

    if(data.success === false) return Mensaje_Toast.info(data.message);

    // Guardar la informacion del usuario
    await AsyncStorage.setItem("usuario", JSON.stringify(data.data));
    setUsuario(data.data);

    const token_fcm = await obtener_token_fcm();

    if (token_fcm) {
      await fetch('http://35.174.135.238/tokenFCM/guardar', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${data.data.token}`
        },
        body: JSON.stringify({ fcm_token: token_fcm })
      });
    }

    if (data.data.altura == null || data.data.peso == null || data.data.edad == null) navigation.navigate("Datos_Adicionales");
    else {
      // Evita que el usuario se devuelva
      navigation.reset({
        index: 0,
        routes: [{ name: "Chatbot" }],
      });
    } 
  }



  // ================= Funciones y estados para iniciar sesion con google =================
  const Iniciar_Sesion_Google = async () => {
    await GoogleSignin.hasPlayServices();
    await GoogleSignin.signOut(); 

    const userInfo = await GoogleSignin.signIn();
    const idToken = userInfo.data?.idToken;

    if (!idToken) return Mensaje_Toast.info('Error al obtener token de Google');

    const res = await fetch('http://35.174.135.238/usuarios/iniciar_sesion_google', {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ token: idToken })
    });

    const data = await res.json();

    if(data.success === false) return Mensaje_Toast.info(data.message);

    // Guardar la informacion del usuario
    await AsyncStorage.setItem("usuario", JSON.stringify(data.data));
    setUsuario(data.data);

    const token_fcm = await obtener_token_fcm();

    if (token_fcm) {
      await fetch('http://35.174.135.238/tokenFCM/guardar', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${data.data.token}`
        },
        body: JSON.stringify({ fcm_token: token_fcm })
      });
    }

    if (data.data.altura == null || data.data.peso == null || data.data.edad == null) navigation.navigate("Datos_Adicionales");
    else {
      // Evita que el usuario se devuelva
      navigation.reset({
        index: 0,
        routes: [{ name: "Chatbot" }],
      });
    }  
  }



  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#000000' }}>
  
      <View style={{backgroundColor: colores.color_2}}>
        <Header 
          title="Iniciar Sesión" 
          onBack={() => navigation.goBack()} 
        /> 
      </View> 

      {/* Renderizado de notificacion de registro exitoso */}
      {mensaje_cerrar_sesion && ( 
          <Notificacion
              mensaje="Registro exitoso"
              onFinish={() => setMensaje_cerrar_sesion(false)}
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

          <Formu_Inicio
            navigation={navigation}
            form={form} 
            handleChange={handleChange} 
            mostrar_contrasena={mostrar_contrasena} 
            setMostrar_contrasena={setMostrar_contrasena}
            Iniciar_Sesion={Iniciar_Sesion}
            Iniciar_Sesion_Google={Iniciar_Sesion_Google}
          />

        </View>

      </ScrollView>

    </SafeAreaView>
  );
}
