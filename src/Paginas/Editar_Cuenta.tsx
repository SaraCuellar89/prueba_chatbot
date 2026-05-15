import React, { useContext, useEffect, useState } from "react";
import { View, ScrollView, KeyboardAvoidingView, Platform, ImageURISource, ImageSourcePropType } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Header from "../Componentes/Header";
import Formu_Editar_Cuenta from "../Componentes/Formu_Editar_Cuenta";
import { colores } from "../estilos_global";
import Seleccionar_Avatar from "../Componentes/Seleccionar_Avatar";
import estilos_publicaciones from "./css/publicaciones_css";
import { AuthContext } from "../utils/Auth_Context";
import Notificacion from "../Componentes/Notificacion";
import { Mensaje_Toast } from "../utils/Mensaje_Toast";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function Editar_Cuenta({ navigation }: any) {

  // ================= Datos del usuario por un contexto difinido =================
  const authContext = useContext(AuthContext);
  if (!authContext) throw new Error("AuthContext no está disponible");
  const { usuario, setUsuario } = authContext;

  console.log(usuario)

  // ================= Funciones y Estados para mostrar la notificaciones de exito =================
  const [notificacion_exito, setNotificacion_exito] = useState(false);
  const [mensaje_notificacion, setMensaje_notificacion] = useState("");
  
  const Mostrar_Notificacion = (mensaje: string) => {
    setMensaje_notificacion(mensaje);
    setNotificacion_exito(true);
  }



  // ================= Estados para mostrar el avatar despues de seleccionarlo =================
  const [avatar, setAvatar] = useState<ImageSourcePropType>({
    uri: usuario?.avatar ?? "https://raw.githubusercontent.com/SaraCuellar89/PailApp_Front/main/src/Img/avatar_4.png"
  });
  const [mostrarAvatares, setMostrarAvatares] = useState(false);
  


  // ================= Funciones y estados para editar la cuenta =================
  // Estados para el dropdown de sexo
  const [abrir_sexo, setAbrir_sexo] = useState(false);
  const [sexo_value, setSexo_value] = useState(usuario?.sexo ?? null);


  const [sexo, setSexo] = useState([
    { label: 'Masculino', value: 'Masculino' },
    { label: 'Femenino', value: 'Femenino' },
    { label: 'Prefiero no decirlo', value: 'Prefiero no decirlo' }
  ]);


  // Estado del formulario 
  const [form, setForm] = useState({
    nombre_usuario: usuario?.nombre ?? "",
    correo: usuario?.correo ?? "",
    avatar: usuario?.avatar ?? "",
    sexo: usuario?.sexo ?? "",
    edad: usuario?.edad ? String(usuario.edad) : "",  
    peso: usuario?.peso ? String(usuario.peso) : "",  
    altura: usuario?.altura ? String(usuario.altura) : "", 
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


  // Funcion de editar datos
  const Editar_Cuenta = async () => {

    // Validaciones
    const { nombre_usuario, correo, avatar, edad, peso, altura } = form;
    const emailRegex = /^[^@\s]+@[^@\s]+\.(com)$/;

    if (!nombre_usuario || !correo || !avatar || !edad || !peso || !altura) return Mensaje_Toast.error("Todos los campos son obligatorios");
    if (nombre_usuario.length < 5) return Mensaje_Toast.error("El nombre de usuario debe tener minimo 5 caracteres"); 
    if (!emailRegex.test(correo)) return Mensaje_Toast.error("Correo invalido");

    const edadNum = Number(edad);
    const pesoNum = Number(peso);
    const alturaNum = Number(altura);

    if (!edad || !peso || !altura) return Mensaje_Toast.error("Todos los campos son obligatorios");
    if (isNaN(edadNum) || isNaN(pesoNum) || isNaN(alturaNum)) return Mensaje_Toast.error("Solo se permiten valores numéricos");
    if (edadNum < 10 || edadNum > 120) return Mensaje_Toast.error("Edad fuera de rango válida (10-120)");
    if (pesoNum < 20 || pesoNum > 300) return Mensaje_Toast.error("Peso fuera de rango válido (20-300 kg)");
    if (alturaNum < 0.5 || alturaNum > 2.5) return Mensaje_Toast.error("Altura fuera de rango válida (0.50 - 2.50 m)");

    // Envio de los datos
    const res = await fetch('http://35.174.135.238/usuarios/editar_cuenta', {
      method: "PUT",
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${usuario.token}`
      },
      body: JSON.stringify(form)
    });

    const data = await res.json();

    if (!data.success) return Mensaje_Toast.info(data.message);

    // Actualizar contexto con los nuevos datos
    const usuario_actualizado = { 
      ...usuario, 
      nombre: form.nombre_usuario, 
      correo: form.correo,
      avatar: form.avatar,
      sexo: form.sexo,
      edad: form.edad,
      peso: form.peso,
      altura: form.altura
    };
    setUsuario(usuario_actualizado);                             
    await AsyncStorage.setItem("usuario", JSON.stringify(usuario_actualizado));

    navigation.reset({
      index: 1,
      routes: [
        { name: "Chatbot" },
        { name: "Configuracion", params: { cuenta_editada: true } },
      ],
    });
  }



  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#000000' }}>

      <View style={{backgroundColor: colores.color_2}}>
        <Header 
          title="Editar Cuenta" 
          onBack={() => navigation.goBack()} 
        /> 
      </View> 

      {/* Renderizado de notificacion de plato subido */}
      {notificacion_exito && ( 
          <Notificacion
              mensaje={mensaje_notificacion}
              onFinish={() => setNotificacion_exito(false)}
              icono={require('../Img/icono-correcto.png')}
          />
      )}

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
            <Formu_Editar_Cuenta 
              avatar={avatar} 
              onAbrirAvatares={() => setMostrarAvatares(true)} 
              form={form}
              handleChange={handleChange}
              abrir_sexo={abrir_sexo}
              setAbrir_sexo={setAbrir_sexo}
              sexo_value={sexo_value}
              setSexo_value={setSexo_value}
              sexo={sexo}
              setSexo={setSexo}
              Editar_Cuenta={Editar_Cuenta}
            />
          </View>

        </ScrollView>


        {/* Modal de avatares */}
        <View style={{backgroundColor: colores.color_2}}>

          {mostrarAvatares === true ? 
          (
            <Seleccionar_Avatar onChange={(av : any) => { 
              setAvatar(av); 
              setMostrarAvatares(false); 
            }} />
          ) :
          (
            null
          )}

        </View>
      </KeyboardAvoidingView>

    </SafeAreaView>
  );
}
