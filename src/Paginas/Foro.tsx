import React, { useState, useEffect, useContext, useCallback } from "react";
import { View, ScrollView } from "react-native";
import Filtros from "../Componentes/Filtros";
import BotonAgregar from "../Componentes/BotonAgregar";
import Notificacion from "../Componentes/Notificacion";
import Header from "../Componentes/Header";
import { SafeAreaView } from "react-native-safe-area-context";
import { colores } from "../estilos_global";
import PublicacionCard from "../Componentes/PublicacionCard";
import estilos_foro from "./css/foro_css";
import { AuthContext } from "../utils/Auth_Context";
import { Mensaje_Toast } from "../utils/Mensaje_Toast";
import Texto from "../Componentes/Texto";
import { useFocusEffect } from "@react-navigation/native";

// Interfaz de los platos
interface Plato {
  publicacion_id: number,
  publicacion_titulo: string;
  publicacion_archivo: string;
  publicacion_descripcion: string;
  publicacion_ingredientes: string;
  publicacion_preparacion: string;
  publicacion_tiempo_preparacion: number;
  publicacion_tipo_tiempo: string;
  publicacion_dificultad: string;
  total_reacciones: number;
  total_comentarios: number;
  publicacion_fecha: string;
  usuario_ya_reacciono: number;
  usuario_ya_guardo: number;
}

export default function Foro({ navigation, route }: any) {

  // ================= Datos del usuario por un contexto difinido =================
  const authContext = useContext(AuthContext);
  if (!authContext) throw new Error("AuthContext no está disponible");
  const { usuario } = authContext;



  // ================= Funciones y Estados para mostrar la notificaciones de exito =================
  const { plato_subido} = route.params ?? {};

  const [notificacion_exito, setNotificacion_exito] = useState(false);
  const [mensaje_notificacion, setMensaje_notificacion] = useState("");

  useEffect(() => {
    if (plato_subido) {
      Mostrar_Notificacion("¡Plato Subido!");
    }
  }, [plato_subido]);
  
  const Mostrar_Notificacion = (mensaje: string) => {
    setMensaje_notificacion(mensaje);
    setNotificacion_exito(true);
  }



  // ================= Estados para los filtros =================
  const [filtro, setFiltro] = useState<"recientes" | "antiguas" | "populares">("recientes");



  // ================= Funciones y estados para obtener todas los platos =================
  // Estado para guardar los platos
  const [platos, setPlatos] = useState<Plato[]>([]);

  // Funcion para cargar todos los datos y actualizarlos cuando se reaccione o se guarde
  useFocusEffect(
    useCallback(() => {
      const Obtener_Todos_Platos = async () => {
        const res = await fetch(`http://35.174.135.238/filtros/${filtro}`, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${usuario.token}`
          }
        });

        const data = await res.json();
        if(!data.success) return Mensaje_Toast.info(data.message);

        setPlatos(data.data);
      };

      Obtener_Todos_Platos();
    }, [usuario.token, filtro])
  );
  
  

  return (

    <SafeAreaView style={{ flex: 1, backgroundColor: '#000000' }}>
    
      <View style={{backgroundColor: colores.color_2}}>
        <Header 
          title="Foro" 
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
        <View style={estilos_foro.contenedor}>

          <View style={estilos_foro.contenedor_filtros}>
            <Filtros filtro={filtro} setFiltro={setFiltro} />
          </View>

          <View style={estilos_foro.contenedor_publicaciones}>
            {platos ? 
            (
              <>
                {platos.map((p) => (
                  <PublicacionCard
                    navigation={navigation}
                    key={p.publicacion_id}
                    id_publicacion={p.publicacion_id}
                    guardar_ejemplo={false}
                    setGuardar_Ejemplo={() => {}}
                    titulo={p.publicacion_titulo}
                    archivo={p.publicacion_archivo}
                    descripcion={p.publicacion_descripcion}
                    ingredientes={p.publicacion_ingredientes}
                    preparacion={p.publicacion_preparacion}
                    tiempo_preparacion={p.publicacion_tiempo_preparacion}
                    tipo_tiempo={p.publicacion_tipo_tiempo}
                    dificultad={p.publicacion_dificultad}
                    total_reacciones={p.total_reacciones}
                    total_comentarios={p.total_comentarios}
                    fecha_creacion={p.publicacion_fecha}
                    corazon_inicial={p.usuario_ya_reacciono}
                    SetNotificacion_reaccion={() => Mostrar_Notificacion("¡Reacción agregada!")}
                    guardado_inicial={p.usuario_ya_guardo}
                    Setnotificacion_guardado={() => Mostrar_Notificacion("¡Receta guardada!")}
                  />
                ))}
              </>
            ) : 
            (
              <Texto>No hay platos subidos</Texto>
            )}
          </View>

        </View>

    </ScrollView>

    <View style={{backgroundColor: colores.color_2}}>
      <BotonAgregar onPress={() => navigation.navigate("SubirReceta")} />
    </View> 

    </SafeAreaView>
  );
}