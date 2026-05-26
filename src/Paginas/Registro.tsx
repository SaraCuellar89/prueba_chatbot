import React, { useContext, useEffect, useState } from "react";
import { View, ScrollView, KeyboardAvoidingView, Platform, ImageURISource, ImageSourcePropType } from "react-native";
/**
 * Pantalla de registro que integra el formulario y el selector modal de avatar.
 */
import { SafeAreaView } from "react-native-safe-area-context";
import Header from "../Componentes/Header";
import Formu_Registro from "../Componentes/Formu_Registro";
import { colores } from "../estilos_global";
import Seleccionar_Avatar from "../Componentes/Seleccionar_Avatar";
import estilos_publicaciones from "./css/publicaciones_css";
import { Mensaje_Toast } from "../utils/Mensaje_Toast";
import { GoogleSignin } from "@react-native-google-signin/google-signin";
import { obtener_token_fcm } from "../utils/Notificaciones";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AuthContext } from "../utils/Auth_Context";

GoogleSignin.configure({
  webClientId: '354612197459-c5q1pro6hi6nicq41lelu9ishds5a8qj.apps.googleusercontent.com',
});

export default function Registro({ navigation }: any) {

  // ================= Datos del usuario por un contexto difinido =================
    const authContext = useContext(AuthContext);
    if (!authContext) throw new Error("AuthContext no está disponible");
    const { setUsuario } = authContext;



  // ================= Estados para mostrar el avatar despues de seleccionarlo =================
  const [avatar, setAvatar] = useState<ImageSourcePropType>({
    uri: "https://raw.githubusercontent.com/SaraCuellar89/PailApp_Front/main/src/Img/avatar_1.png"
  });
  const [mostrarAvatares, setMostrarAvatares] = useState(false);



  // ================= Estados para ver y ocultar contraseñas =================
  const [mostrar_contrasena, setMostrar_contrasena] = useState(false);
  const [mostrar_confirmar_contrasena, setMostrar_confirmar_contrasena] = useState(false);



  // ================= Funciones y estados para el registro de usuarios =================
  // Estado del formulario 
  const [form, setForm] = useState({
      nombre_usuario: "",
      correo: "",
      contrasena: "",
      confirmacion_contrasena: "",
      avatar: null,
  });


  // Handle Change genérico 
  const handleChange = (campo: string, valor: string) => {
      setForm(prev => ({ ...prev, [campo]: valor }));
  };


  // Obtener la url del avatar
  useEffect(() => {
    const uri = (avatar as ImageURISource).uri;
    if (uri) handleChange("avatar", uri);
  }, [avatar]);


  // Funcion para enviar los datos a la bbdd
  const Registrar_Usuario = async () => {
    try {
      // Validaciones
      const { nombre_usuario, correo, contrasena, confirmacion_contrasena, avatar } = form;
      const emailRegex = /^[^@\s]+@[^@\s]+\.(com)$/;

      if (!nombre_usuario || !correo || !contrasena || !confirmacion_contrasena || !avatar) return Mensaje_Toast.error("Todos los campos son obligatorios");
      if (nombre_usuario.length < 5) return Mensaje_Toast.error("El nombre de usuario debe tener minimo 5 caracteres"); 
      if (!emailRegex.test(correo)) return Mensaje_Toast.error("Correo invalido");
      if (contrasena.length < 5) return Mensaje_Toast.error("La contraseña debe tener minimo 5 caracteres");
      if (contrasena !== confirmacion_contrasena) return Mensaje_Toast.error("Las contraseñas no coinciden");

      // Envio de los datos
      const res = await fetch('http://35.174.135.238/usuarios/registrar', {
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(form)
      });

      const data = await res.json();

      if(data.success === false) return Mensaje_Toast.info(data.message);

      navigation.navigate("Login", { registro_exitoso: true });
    } catch (error) {
      console.error('Error registrando al usuario:', error);
      Mensaje_Toast.error('No se pudo completar el registro');
    }
  }



  // ================= Funciones y estados para iniciar sesion con google =================
  const Registrar_Google = async () => {
    try {
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
        await AsyncStorage.setItem('fcm_token', token_fcm); 
        
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
    } catch (error: any) {
      console.error('Codigo de error:', error.code);
      console.error('Mensaje:', error.message);
      console.error('Error completo:', JSON.stringify(error));
      Mensaje_Toast.error('No se pudo iniciar sesion con google');
    }
  }



  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#000000' }}>

      <View style={{backgroundColor: colores.color_2}}>
        <Header 
          title="Crear Cuenta" 
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

          <View style={estilos_publicaciones.container}>    
            <Formu_Registro 
              avatar={avatar} 
              onAbrirAvatares={() => setMostrarAvatares(true)} 
              form={form}
              handleChange={handleChange}
              mostrar_contrasena={mostrar_contrasena}
              setMostrar_contrasena={setMostrar_contrasena}
              mostrar_confirmar_contrasena={mostrar_confirmar_contrasena}
              setMostrar_confirmar_contrasena={setMostrar_confirmar_contrasena}
              Registrar_Usuario={Registrar_Usuario}
              Registrar_Google={Registrar_Google}
            />
          </View>

        </ScrollView>

        {/* Modal de avatares */}
        <View style={{backgroundColor: colores.color_2}}>

          {mostrarAvatares === true ? 
          (
            <Seleccionar_Avatar onChange={(av: ImageSourcePropType) => { 
              setAvatar(av); 
              setMostrarAvatares(false); 
            }}/>
          ) :
          (
            null
          )}

        </View>
      </KeyboardAvoidingView>

    </SafeAreaView>
  );
}
