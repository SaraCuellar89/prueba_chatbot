import React, { useCallback, useContext, useState } from "react";
/**
 * Pantalla que muestra las publicaciones guardadas por el usuario y permite quitarlas de favoritos.
 */

import { View, ScrollView, TouchableOpacity } from "react-native";
import ModalConfirmacion from "../Componentes/ModalConfirmacion";
import Notificacion from "../Componentes/Notificacion"; 
import Header from "../Componentes/Header";
import { SafeAreaView } from "react-native-safe-area-context";
import { colores } from "../estilos_global";
import PublicacionCard from "../Componentes/PublicacionCard";
import estilos_publicaciones from "./css/publicaciones_css";
import Texto from "../Componentes/Texto";
import { AuthContext } from "../utils/Auth_Context";
import { useFocusEffect } from "@react-navigation/native";
import { Mensaje_Toast } from "../utils/Mensaje_Toast";

// Intefaz de los platos
interface Plato {
  id_publicacion: number;
  titulo: string;
  archivo: string;
  descripcion: string;
  ingredientes: string;
  preparacion: string;
  tiempo_preparacion: number;
  tipo_tiempo: string;
  dificultad: string;
  total_reacciones: number;
  total_comentarios: number;
  fecha_creacion: string;
  usuario_ya_reacciono: number;
  usuario_ya_guardo: number;
}

export default function MisPlatoss({ navigation }: any) {

  // ================= Datos del usuario por un contexto difinido =================
  const authContext = useContext(AuthContext);
  if (!authContext) throw new Error("AuthContext no está disponible");
  const { usuario } = authContext;


  // ================= Funciones y Estados para mostrar la notificaciones de exito =================
  const [notificacion_exito, setNotificacion_exito] = useState(false);
  const [mensaje_notificacion, setMensaje_notificacion] = useState("");
  
  const Mostrar_Notificacion = (mensaje: string) => {
    setMensaje_notificacion(mensaje);
    setNotificacion_exito(true);
  }

  // Estado para el modal y la acción pendiente
  const [modalVisible, setModalVisible] = useState(false);
  const [accion_pendiente, setAccion_pendiente] = useState<(() => void) | null>(null);

  const Interceptar_Desguardado = (confirmar_fn: () => void) => {
    setAccion_pendiente(() => confirmar_fn); 
    setModalVisible(true);
  };


  // ================= Funciones y estados para obtener las publicaciones guardadas del usuario =================
  const [platos, setPlatos] = useState<Plato[]>([]);
  
  const Obtener_Todos_Platos = async () => {
    const res = await fetch(`http://35.174.135.238/guardados/listar`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${usuario.token}`
      }
    });

    const data = await res.json();
    if(!data.success) return Mensaje_Toast.info(data.message);

    setPlatos(data.data.platos_guardados);
  };

  useFocusEffect(
    useCallback(() => {
      Obtener_Todos_Platos();
    }, [usuario.token])
  );

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#000000' }}>

      <View style={{backgroundColor: colores.color_2}}>
        <Header 
          title="Mis Platos" 
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
          {platos.length > 0  ? 
            (
              <>
                {platos.map((p) => (
                  <React.Fragment key={p.id_publicacion}>
                    <PublicacionCard
                      key={p.id_publicacion}
                      id_publicacion={p.id_publicacion}
                      guardar_ejemplo={false}
                      setGuardar_Ejemplo={() => {}}
                      titulo={p.titulo}
                      archivo={p.archivo}
                      descripcion={p.descripcion}
                      ingredientes={p.ingredientes}
                      preparacion={p.preparacion}
                      tiempo_preparacion={p.tiempo_preparacion}
                      tipo_tiempo={p.tipo_tiempo}
                      dificultad={p.dificultad}
                      total_reacciones={p.total_reacciones}
                      total_comentarios={p.total_comentarios}
                      fecha_creacion={p.fecha_creacion}
                      corazon_inicial={p.usuario_ya_reacciono}
                      SetNotificacion_reaccion={() => Mostrar_Notificacion("¡Reacción agregada!")}
                      antes_desguardar={Interceptar_Desguardado}  
                      guardado_inicial={p.usuario_ya_guardo}
                    />

                    <TouchableOpacity style={estilos_publicaciones.btn_ingredientes}onPress={() => navigation.navigate('Lista_Ingredientes', { id_publicacion: p.id_publicacion, nombre_publicacion: p.titulo })}>
                      <Texto>Lista de Ingredientes</Texto>
                    </TouchableOpacity>
                  </React.Fragment>
                ))}
              </>
            ) : 
            (
              <Texto style={estilos_publicaciones.texto_vacio}>No hay platos guardados</Texto>
            )}
        </View>

      </ScrollView>

      {/* Renderizado de modal de confirmacion */}
      <ModalConfirmacion
        texto={"¿Quieres quitar este plato de tus guardados? (Perderas tu lista de ingredientes)"}
        visible={modalVisible}
        confirmar={() => {
          accion_pendiente?.();     
          setTimeout(() => Obtener_Todos_Platos(), 500);
          setModalVisible(false);
          setAccion_pendiente(null);
        }}
        cancelar={() => {
          setModalVisible(false);
          setAccion_pendiente(null);
        }}
      />
    </SafeAreaView>
  );
}