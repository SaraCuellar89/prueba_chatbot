/**
 * Lista visual de opciones de configuracion y accesos a acciones del perfil.
 */

import { View, Text, TouchableOpacity } from "react-native";
import styles from "../Estilos/ConfiguracionOpciones";
import { useNavigation } from "@react-navigation/native";
import estilos_configuracion_opciones from "./css/configuracion_opciones";
import Texto from "./Texto";
import { Mensaje_Toast } from "../utils/Mensaje_Toast";


export default function ConfiguracionOpciones({Cerrar_Sesion, Eliminar_Cuenta}: any) {

  const navigation = useNavigation<any>();

  return (
    <View>

      {/* --- Cambiar el tema de la aplicacion (oscuro/claro) --- */}
      <View style={estilos_configuracion_opciones.card}>
        <Texto style={estilos_configuracion_opciones.titulo}>Tema</Texto>

        <TouchableOpacity style={estilos_configuracion_opciones.botonTema} onPress={() => Mensaje_Toast.info("Función próximamente...")}>
          <Texto>Día</Texto>
        </TouchableOpacity>
      </View>

      {/* --- Boton para editar toda la informacion del usuario --- */}
      <TouchableOpacity style={estilos_configuracion_opciones.card} onPress={() => navigation.navigate('Editar_Cuenta')}>
        <Texto style={estilos_configuracion_opciones.titulo}>Editar Cuenta</Texto>
        <Texto style={estilos_configuracion_opciones.descripcion}>
          Puedes editar toda la información de tu perfil y cuenta
        </Texto>
      </TouchableOpacity>

      {/* --- Boton para editar solo la contraseña del cuenta --- */}
      <TouchableOpacity style={estilos_configuracion_opciones.card} onPress={() => navigation.navigate('Editar_Contrasena')}>
        <Texto style={estilos_configuracion_opciones.titulo}>Cambiar Contraseña</Texto>
        <Texto style={estilos_configuracion_opciones.descripcion}>
          Cambia tu contraseña aquí
        </Texto>
      </TouchableOpacity>

      {/* --- Boton para cerrar sesion --- */}
      <TouchableOpacity style={estilos_configuracion_opciones.card} onPress={Cerrar_Sesion}>
        <Texto style={estilos_configuracion_opciones.titulo}>Cerrar Sesión</Texto>
        <Texto style={estilos_configuracion_opciones.descripcion}>
          Recuerda que siempre puedes volver
        </Texto>
      </TouchableOpacity>

  
      {/* --- Boton para eliminar la cuenta de manera permanente --- */}
      <TouchableOpacity style={estilos_configuracion_opciones.card} onPress={Eliminar_Cuenta}>
        <Texto style={estilos_configuracion_opciones.titulo}>Eliminar Cuenta</Texto>
        <Texto style={estilos_configuracion_opciones.descripcion}>
          Esta acción es permanente e irreversible
        </Texto>
      </TouchableOpacity>

    </View>
  );
}