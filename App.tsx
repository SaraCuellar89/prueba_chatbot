import React, { useEffect } from 'react';
/**
 * Punto de entrada principal de la aplicacion.
 * Aqui se cargan las fuentes, se montan los providers globales
 * y se declara el stack de navegacion completo.
 */

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useFonts, JetBrainsMono_400Regular, JetBrainsMono_700Bold } from '@expo-google-fonts/jetbrains-mono';
import { ActivityIndicator, View } from 'react-native';
import Toast from 'react-native-toast-message';
import { AuthProvider } from "./src/utils/Auth_Context";


import Carga from './src/Paginas/Carga';
import Inicio from './src/Paginas/Inicio';
import Login from './src/Paginas/Login';
import Correo_Recuperacion from './src/Paginas/Correo_Recuperacion';
import Registro from './src/Paginas/Registro';
import Chatbot from './src/Paginas/Chatbot/Chatbot';
// import ChatbotVoz from './src/Paginas/Chatbot/Chatbot_Voz';
import Foro from './src/Paginas/Foro';
import SubirReceta from './src/Paginas/SubirReceta';
import DetallePublicacion from './src/Paginas/Publicaciones';
import MisPlatoss from './src/Paginas/MisPlatoss';
import Perfil, { Plato } from './src/Paginas/Perfil';
import Configuracion from './src/Paginas/Configuracion';
import Descripcion from './src/Paginas/Descripcion';
import Datos_Adicionales from './src/Paginas/Datos_Adicionales';
import Cambiar_Contrasena from './src/Paginas/Cambiar_Contrasena';
import Notificaciones from './src/Paginas/Notificaciones';
import { Configuracion_Toast } from './src/utils/Configuracion_Toast';
import Lista_Ingredientes from './src/Paginas/Lista_Ingredientes';
import Editar_Cuenta from './src/Paginas/Editar_Cuenta';
import Editar_Contrasena from './src/Paginas/Edtiar_Contrasena';
import { escuchar_notificaciones, obtener_token_fcm } from './src/utils/Notificaciones';


export type RootStackParamList = {
  Carga: undefined;
  Inicio: { cerro_sesion?: boolean };
  Login: {registro_exitoso?: boolean };
  Registro: undefined;
  Correo_Recuperacion: undefined;
  Cambiar_Contrasena: undefined;
  Datos_Adicionales: undefined;
  Chatbot: undefined;
  Notificaciones: undefined;
  Foro: { plato_subido?: boolean };
  SubirReceta: { plato?: Plato } | undefined;
  Descripcion: {
    titulo: string;
    archivo: string;
    public_id: string;
    ingredientes: string;
    tiempo_preparacion: string;
    tipo_tiempo: string;
    dificultad: string;
    plato?: Plato;
  };
  DetallePublicacion: {id_publicacion: number};
  MisPlatos: undefined;
  Lista_Ingredientes: {
    id_publicacion: number;
    nombre_publicacion: string;
  };
  Perfil: { plato_editado?: boolean };
  Configuracion: {
    cuenta_editada?: boolean;
    contrasena_editada?: boolean;
  };
  Editar_Cuenta: undefined;
  Editar_Contrasena: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>(); 

// Funcion para cargar la tipografia de la aplicacion
export default function App() {
  const [fuentes_cargadas] = useFonts({
    JetBrainsMono_400Regular,
    JetBrainsMono_700Bold,
  });


  // Recibir notificaciones
  useEffect(() => {
    const unsubscribe = escuchar_notificaciones();
    return () => unsubscribe();
  }, []);


  // La app espera a que la tipografia este lista para evitar saltos visuales.
  if (!fuentes_cargadas) return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <ActivityIndicator size="large" />
    </View>
  );

  return (
    <AuthProvider>
      <NavigationContainer>
        <Stack.Navigator id="main" screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Carga" component={Carga} />
          <Stack.Screen name="Inicio" component={Inicio} />
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="Correo_Recuperacion" component={Correo_Recuperacion} />
          <Stack.Screen name="Cambiar_Contrasena" component={Cambiar_Contrasena} />
          <Stack.Screen name="Registro" component={Registro} />
          <Stack.Screen name="Datos_Adicionales" component={Datos_Adicionales} />
          <Stack.Screen name="Chatbot" component={Chatbot} />
          <Stack.Screen name="Notificaciones" component={Notificaciones} />
          {/* <Stack.Screen name="ChatbotVoz" component={ChatbotVoz} /> */}
          <Stack.Screen name="Foro" component={Foro} />
          <Stack.Screen name="SubirReceta" component={SubirReceta} />
          <Stack.Screen name="Descripcion" component={Descripcion} />
          <Stack.Screen name="DetallePublicacion" component={DetallePublicacion} options={{ headerShown: false}} />
          <Stack.Screen name="MisPlatos" component={MisPlatoss} options={{ headerShown: false }} />
          <Stack.Screen name="Lista_Ingredientes" component={Lista_Ingredientes} options={{ headerShown: false }} />
          <Stack.Screen name="Perfil" component={Perfil} />
          <Stack.Screen name="Configuracion" component={Configuracion} />
          <Stack.Screen name="Editar_Cuenta" component={Editar_Cuenta} />
          <Stack.Screen name="Editar_Contrasena" component={Editar_Contrasena} />
        </Stack.Navigator>

        <Toast config={Configuracion_Toast}/>
      </NavigationContainer>
    </AuthProvider>
  );
}
