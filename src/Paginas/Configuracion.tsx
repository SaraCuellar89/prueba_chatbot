import { useContext, useEffect, useState } from "react";
import { ScrollView, View } from "react-native";
import ConfiguracionOpciones from "../Componentes/ConfiguracionOpciones";
import { SafeAreaView } from "react-native-safe-area-context";
import Header from "../Componentes/Header";
import { colores } from "../estilos_global";
import estilos_publicaciones from "./css/publicaciones_css";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AuthContext } from "../utils/Auth_Context";
import { Mensaje_Toast } from "../utils/Mensaje_Toast";
import ModalConfirmacion from "../Componentes/ModalConfirmacion";
import Notificacion from "../Componentes/Notificacion";

export default function Configuracion({navigation, route}: any) {

  // ================= Datos del usuario por un contexto difinido =================
  const authContext = useContext(AuthContext);
  if (!authContext) throw new Error("AuthContext no está disponible");
  const { usuario, setUsuario } = authContext;



  // ================= Funciones y Estados para mostrar la notificaciones de exito =================
  const {cuenta_editada} = route.params ?? {};
  const {contrasena_editada} = route.params ?? {};

  const [notificacion_exito, setNotificacion_exito] = useState(false);
  const [mensaje_notificacion, setMensaje_notificacion] = useState("");

  useEffect(() => {
    if (cuenta_editada) Mostrar_Notificacion("¡Cuenta editada!");
    else if (contrasena_editada) Mostrar_Notificacion("¡Contraseña editada!");
  }, [cuenta_editada]);
  
  const Mostrar_Notificacion = (mensaje: string) => {
    setMensaje_notificacion(mensaje);
    setNotificacion_exito(true);
  }



  // ================= Estados para ver la notificacion o el modal de confirmacion =================
  const [modal_Visible, setModal_Visible] = useState(false);
  const [tipo_modal, setTipo_Modal] = useState<'cerrar_sesion' | 'eliminar_cuenta' | null>(null);


  // ================= Funciones y estados para cerrar sesion =================
  const Cerrar_Sesion = async () => {
    try {    
        await AsyncStorage.removeItem("usuario");
        
        setUsuario(null); // limpia el contexto

        navigation.navigate("Inicio", { cerro_sesion: true });
    } catch (error) {
        console.log("Error:", error);
        Mensaje_Toast.error("No se pudo cerrar sesión");
    }
  }


  // ================= Funciones y estados para eliminar la cuenta =================
  const Eliminar_Cuenta = async () => {
    const res = await fetch(`http://35.174.135.238/usuarios/eliminar_cuenta`, {
      method: "DELETE",
      headers: {
          'Authorization': `Bearer ${usuario.token}`
      }
    });

    const data = await res.json();

    if(!data.success) return Mensaje_Toast.info(data.message);

    navigation.navigate("Inicio") 
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#000000' }}>

      <View style={{backgroundColor: colores.color_2}}>
          <Header 
          title="Configuración" 
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

      <ScrollView
          style={{ flex: 1, backgroundColor: '#000000' }}
          contentContainerStyle={{ flexGrow: 1 }}
          showsVerticalScrollIndicator={true}
          keyboardShouldPersistTaps="handled"
      >

        <View style={estilos_publicaciones.container}>
          <ConfiguracionOpciones 
            Cerrar_Sesion={() => { setTipo_Modal('cerrar_sesion'); setModal_Visible(true); }}
            Eliminar_Cuenta={() => { setTipo_Modal('eliminar_cuenta'); setModal_Visible(true); }}
          />
        </View>

      </ScrollView>

      {/* Renderizado de modal de confirmacion */}
      <ModalConfirmacion
        texto={tipo_modal === 'cerrar_sesion' ? ("¿Quieres salir de tu cuenta?") : ("¿Quiere eliminar tu cuenta?")}
        visible={modal_Visible}
        confirmar={() => {
          setModal_Visible(false);
          if (tipo_modal === 'cerrar_sesion') Cerrar_Sesion();
          if (tipo_modal === 'eliminar_cuenta') Eliminar_Cuenta();
        }}
        cancelar={() => [setModal_Visible(false)]}
      />

    </SafeAreaView>
  );

}