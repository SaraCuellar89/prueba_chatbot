import React, { useCallback, useContext, useEffect, useState } from "react";
import { View, ScrollView, KeyboardAvoidingView, Platform, Keyboard } from "react-native";
import Header_Publicacion from "../Componentes/Header_Publicacion";
import Notificacion from "../Componentes/Notificacion";
import { colores } from "../estilos_global";
import { SafeAreaView } from "react-native-safe-area-context";
import PublicacionCard from "../Componentes/PublicacionCard";
import Comentarios from "../Componentes/Comentarios";
import Formu_Comentario from "../Componentes/Formu_Comentario";
import estilos_publicaciones from "./css/publicaciones_css";
import ModalConfirmacion from "../Componentes/ModalConfirmacion";
import { AuthContext } from "../utils/Auth_Context";
import { Mensaje_Toast } from "../utils/Mensaje_Toast";
import Texto from "../Componentes/Texto";

// Interfaz de los platos
interface Plato {
  publicacion_id: number;
  autor_post_nombre: string;
  autor_post_avatar: any;
  publicacion_titulo: string;
  publicacion_archivo: string;
  publicacion_descripcion: string;
  publicacion_ingredientes: string;
  publicacion_preparacion: string;
  publicacion_tiempo_preparacion: number;
  publicacion_tipo_tiempo: string;
  publicacion_dificultad: string;
  publicacion_fecha: string;
  ya_reacciono: number;
  ya_guardo: number;
}

export default function DetallePublicacion({ route, navigation }: any) {

  // ================= Datos del usuario por un contexto difinido =================
  const authContext = useContext(AuthContext);
  if (!authContext) throw new Error("AuthContext no está disponible");
  const { usuario, setUsuario } = authContext;



  // ================= Estados para ver la notificacion o el modal de confirmacion =================
  const [modalVisible, setModalVisible] = useState(false);
  const [tipo_eliminacion, setTipo_eliminacion] = useState<'comentario' | 'respuesta' | null>(null);



  // ================= Funciones y Estados para mostrar la notificaciones de exito =================
  const [notificacion_exito, setNotificacion_exito] = useState(false);
  const [mensaje_notificacion, setMensaje_notificacion] = useState("");
  
  const Mostrar_Notificacion = (mensaje: string) => {
    setMensaje_notificacion(mensaje);
    setNotificacion_exito(true);
  }



  // ================= Funciones y estados para obtener la informacion de un solo plato =================
  // Estados para guardar la informacion del plato
  const [plato, setPlato] = useState<Plato | null>(null);
  const [total_reacciones, setTotal_reacciones] = useState(0);
  const [comentarios, setComentarios] = useState<any[]>([]);
  const [total_comentarios, setTotal_comentarios] = useState(0);

  // Id publicacion proveniente de los parametros
  const id_publicacion = route.params.id_publicacion;

  // Funcion para la informacion del plato
  const Obtener_Info_Plato = async () => {
    const res = await fetch(`http://35.174.135.238/publicaciones/una/${id_publicacion}`, {
      method: 'GET',
      headers: { 'Authorization': `Bearer ${usuario.token}` }
    });

    const data = await res.json();

    console.log(data)

    if(!data.success) return Mensaje_Toast.info(data.message);

    setPlato(data.data.publicacion);
    setTotal_reacciones(data.data.total_reacciones);
    setComentarios(data.data.comentarios);
    setTotal_comentarios(data.data.total_comentarios);
  };

  // Llamar la funcion y recargar la informacion
  const [refetch, setRefetch] = useState(0);
  useEffect(() => {
    Obtener_Info_Plato();
  }, [refetch]);




  // =============================================================================================================
  // =============================================================================================================
  // =============================================================================================================


  // ================= Funciones y estados para subir un comentario =================
  // Estado del formulario 
  const [contenido, setcontenido] = useState("");

  // Funcion para enviar los datos a la bbdd
  const Comentar = async () => {

    // Validaciones
    if(!contenido.trim()) return Mensaje_Toast.error("El comentario no puede estar vacio");

    const ahora = new Date();
    const fecha_creacion = ahora.toISOString().slice(0, 19).replace("T", " ");
    
    const res = await fetch(`http://35.174.135.238/comentarios/subir/${id_publicacion}`, {
      method: "POST",
      headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${usuario.token}`
      },
      body: JSON.stringify({contenido, fecha_creacion})
    });

    const data = await res.json();

    if(!data.success) return Mensaje_Toast.info(data.message);

    Keyboard.dismiss();
    setcontenido("");
    Mostrar_Notificacion("¡Comentario hecho!");

    setRefetch(prev => prev + 1);
  }


  // ================= Funciones y estados para editar un comentario =================
  const Editar_Comentario = async (id_comentario: number, nuevo_comentario: string) => {

    // Validaciones
    if(!nuevo_comentario.trim()) return Mensaje_Toast.error("El comentario no puede estar vacio");

    const res = await fetch(`http://35.174.135.238/comentarios/editar/${id_comentario}`, {
      method: "PUT",
      headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${usuario.token}`
      },
      body: JSON.stringify({contenido: nuevo_comentario})
    });

    const data = await res.json();

    if(!data.success) return Mensaje_Toast.info(data.message);

    Keyboard.dismiss();
    setcontenido("");
    Mostrar_Notificacion("¡Comentario editado!");

    setRefetch(prev => prev + 1);
  }


  // ================= Funciones para eliminar un comentario =================
  const [id_comentario, setId_comentario] = useState<number | null>(null);

  const Eliminar_Comentario = async () => {
    const res = await fetch(`http://35.174.135.238/comentarios/eliminar/${id_comentario}`, {
      method: "DELETE",
      headers: {
          'Authorization': `Bearer ${usuario.token}`
      }
    });

    const data = await res.json();

    if(!data.success) return Mensaje_Toast.info(data.message);

    Mostrar_Notificacion("Comentario eliminado");

    setRefetch(prev => prev + 1);
  }



  // =============================================================================================================
  // =============================================================================================================
  // =============================================================================================================


  // ================= Funciones y estados para responder a un comentario =================
  // Estado del formulario 
  const [contenido_respuesta, setcontenido_respuesta] = useState("");

  // Funcion para enviar los datos a la bbdd
  const Responder = async (id_comentario: number) => {

    // Validaciones
    if(!contenido_respuesta.trim()) return Mensaje_Toast.error("La respuesta no puede estar vacia");

    const ahora = new Date();
    const fecha_creacion = ahora.toISOString().slice(0, 19).replace("T", " ");
    
    const res = await fetch(`http://35.174.135.238/respuestas/contestar/${id_comentario}`, {
      method: "POST",
      headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${usuario.token}`
      },
      body: JSON.stringify({contenido: contenido_respuesta, fecha_creacion})
    });

    const data = await res.json();

    if(!data.success) return Mensaje_Toast.info(data.message);

    Keyboard.dismiss();
    setcontenido_respuesta("");
    Mostrar_Notificacion("¡Respuesta hecha!");

    setRefetch(prev => prev + 1);
  }


  // ================= Funciones y estados para editar una respuesta =================
  const Editar_Respuesta = async (id_respuesta: number, nueva_respuesta: string) => {

    // Validaciones
    if(!nueva_respuesta.trim()) return Mensaje_Toast.error("La respuesta no puede estar vacia");

    const res = await fetch(`http://35.174.135.238/respuestas/editar/${id_respuesta}`, {
      method: "PUT",
      headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${usuario.token}`
      },
      body: JSON.stringify({contenido: nueva_respuesta})
    });

    const data = await res.json();
    
    if(!data.success) return Mensaje_Toast.info(data.message);
    
    Keyboard.dismiss();
    Mostrar_Notificacion("¡Respuesta editada!");
    
    setRefetch(prev => prev + 1);
  }


  // ================= Funciones y estados para eliminar una respuesta =================
  const [id_respuesta, setId_respuesta] = useState<number | null>(null);

  const Eliminar_Respuesta = async () => {
    const res = await fetch(`http://35.174.135.238/respuestas/eliminar/${id_respuesta}`, {
      method: "DELETE",
      headers: {
          'Authorization': `Bearer ${usuario.token}`
      }
    });

    const data = await res.json();

    if(!data.success) return Mensaje_Toast.info(data.message);

    Mostrar_Notificacion("Respuesta eliminada");

    setRefetch(prev => prev + 1);
  }



  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#000000' }}>

      <View style={{backgroundColor: colores.color_2}}>
        <Header_Publicacion 
          title={plato?.autor_post_nombre} 
          onBack={() => navigation.goBack()} 
          icono={{ uri: plato?.autor_post_avatar }}
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
          contentContainerStyle={{ flexGrow: 1 }}
          showsVerticalScrollIndicator={true}
          keyboardShouldPersistTaps="handled"
        >

          <View style={estilos_publicaciones.container}>

            {plato && (
              <PublicacionCard
                key={plato.publicacion_id}
                id_publicacion={plato.publicacion_id}
                titulo={plato.publicacion_titulo}
                archivo={plato.publicacion_archivo}
                descripcion={plato.publicacion_descripcion}
                ingredientes={plato.publicacion_ingredientes}
                preparacion={plato.publicacion_preparacion}
                tiempo_preparacion={plato.publicacion_tiempo_preparacion}
                tipo_tiempo={plato.publicacion_tipo_tiempo}
                dificultad={plato.publicacion_dificultad}
                total_reacciones={total_reacciones}
                total_comentarios={total_comentarios}
                fecha_creacion={plato.publicacion_fecha}
                corazon_inicial={plato.ya_reacciono}
                SetNotificacion_reaccion={() => Mostrar_Notificacion("¡Reacción agregada!")}
                guardado_inicial={plato.ya_guardo}
                Setnotificacion_guardado={() => Mostrar_Notificacion("¡Receta guardada!")}
              />
            )}

            {total_comentarios === 0 ? 
            ( <Texto style={estilos_publicaciones.texto_vacio}>Se la primera persona en comentar</Texto>)
            :
            (
              <>
                {comentarios.map((c) => (
                  <Comentarios
                    key={c.comentario_id}
                    id_usuario_comentario={c.autor_comentario_id}
                    id_comentario={c.comentario_id}
                    Editar_Comentario={(nuevo_comentario: string) => Editar_Comentario(c.comentario_id, nuevo_comentario)}
                    setEliminar_comentario={(id: number) => {
                      setId_comentario(id);
                      setTipo_eliminacion('comentario');
                      setModalVisible(true);             
                    }}
                    avatar={c.autor_comentario_avatar}
                    nombre_usuario={c.autor_comentario_nombre}
                    fecha={c.comentario_fecha}
                    contenido={c.comentario_contenido}

                    // Respuestas
                    contenido_respuesta={contenido_respuesta}
                    setcontenido_respuesta={setcontenido_respuesta}
                    Responder={() => Responder(c.comentario_id)}
                    total_respuestas={c.respuestas.length}
                    respuestas={c.respuestas}
                    setEliminar_respuesta={(id: number) => {
                      setId_respuesta(id);
                      setTipo_eliminacion('respuesta');
                      setModalVisible(true);             
                    }}
                    Editar_Respuesta={Editar_Respuesta}
                  />
                ))}
              </>
            )}

          </View>

        </ScrollView>

      <View style={[{backgroundColor: colores.color_2}, estilos_publicaciones.caja_formu_comentario]}>
        {plato && (
          <Formu_Comentario
            contenido={contenido}
            setcontenido={setcontenido}
            onSubmit={Comentar}
          />
        )}
      </View> 

    </KeyboardAvoidingView>

    <ModalConfirmacion
      texto={tipo_eliminacion === 'comentario' 
        ? "¿Quieres eliminar este comentario?" 
        : "¿Quieres eliminar esta respuesta?"
      }
      visible={modalVisible}
      confirmar={() => {
        setModalVisible(false);
        if(tipo_eliminacion === 'comentario') {
          Eliminar_Comentario();
        } else {
          Eliminar_Respuesta();
        }
      }}
      cancelar={() => {
        setModalVisible(false);
        setTipo_eliminacion(null);
      }}
    />

    </SafeAreaView>
  );
}
