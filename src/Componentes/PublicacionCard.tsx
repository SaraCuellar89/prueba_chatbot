import React, { useState } from "react";
import { RichEditor } from 'react-native-pell-rich-editor';
import { View, Image, TouchableOpacity, useWindowDimensions } from "react-native";
import Texto from "./Texto";
import estilos_publicacion_card from "./css/publicacion_card_css";
import { useReaccionar } from "../Hooks/useReaccionar";
import { useGuardar } from "../Hooks/useGuardar";


export default function PublicacionCard({navigation, id_publicacion, titulo, archivo, descripcion, ingredientes, preparacion, tiempo_preparacion, tipo_tiempo, dificultad, total_reacciones, total_comentarios, fecha_creacion, corazon_inicial, SetNotificacion_reaccion, guardado_inicial, Setnotificacion_guardado, antes_desguardar}: any) {

  // ================= Estados para boton de ver más =================
  const [ver_mas, setVer_mas] = useState(false);



  // ================= Reaccionar a una publicacion =================
  const { corazon, total_reacciones_local, Reaccionar } = useReaccionar({
    corazon_inicial,
    total_reacciones,
    SetNotificacion_reaccion
  });



  // ================= Guardar una publicacion =================
  const { Guardar, guardado } = useGuardar({
    guardado_inicial,
    antes_desguardar, 
    Setnotificacion_guardado
  });



  // ================= Funciones para formatear los datos =================
  const Formatear_Fecha = (fecha: string) => {
    return new Date(fecha).toLocaleString("es-CO");
  }

  const Formatear_Ingredientes = (ingredientes: string) => {
    try {
      let parsed = ingredientes;
    
      while (typeof parsed === 'string') {
        parsed = JSON.parse(parsed);
      }
      
      return (parsed as string[]).join('\n');
    } catch {
      return ingredientes;
    }
  }


  return (
    <View style={estilos_publicacion_card.contenedor}>

      {/* --- Titulo --- */}
      <Texto style={estilos_publicacion_card.titulo}>{titulo}</Texto>

      {/* --- Datos del plato --- */}
      <View style={ver_mas ? estilos_publicacion_card.caja_ampliada : estilos_publicacion_card.caja_reducida}>

        {/* Descripcion */}
        
        <RichEditor
          initialContentHTML={descripcion}
          disabled={true}
          scrollEnabled={false}
          editorStyle={{
            backgroundColor: 'transparent',
            caretColor: 'transparent',
            cssText: 'font-size: 13px !important;',
            initialCSSText: `
              * { font-size: 13px; padding: 0px !important; }
              ol, ul { padding-left: 5px !important; }
              li { margin-bottom: 4px; }
            `,
          }}
        />

        {/* Ingredientes */}
        <View>
          <Texto style={estilos_publicacion_card.texto_mediano}>{Formatear_Ingredientes(ingredientes)}</Texto>
        </View>

        {/* Pasos de preparacion */}
        <View>
          <RichEditor
            initialContentHTML={preparacion}
            disabled={true}
            scrollEnabled={false}
            editorStyle={{
              backgroundColor: 'transparent',
              caretColor: 'transparent',
              cssText: 'font-size: 13px !important;',
              initialCSSText: `
                * { font-size: 13px !important; }
                ol, ul { padding-left: 5px !important; }
                li { margin-bottom: 4px; }
              `,
            }}
          />
        </View>
        
      </View>

      <TouchableOpacity style={estilos_publicacion_card.btn_ver_mas} onPress={() => setVer_mas(!ver_mas)}>
        <Texto style={estilos_publicacion_card.texto_ver_mas}>{ver_mas ? 'Ver Menos' : 'Ver Más'}</Texto>
      </TouchableOpacity>

      {/* --- Imagen de portada --- */}
      {archivo && 
        <Image
          source={{uri: archivo}}
          style={estilos_publicacion_card.img_publicacion}
        />
      }

      {/* --- Dificultad y tiempo --- */}
      <View style={estilos_publicacion_card.contenedor_especificaciones}>
        <View style={estilos_publicacion_card.dificultad}>
          <Texto style={estilos_publicacion_card.texto_pequeno}>{dificultad}</Texto>
        </View>

        <View style={estilos_publicacion_card.tiempo}>
          <Image
            source={require("../Img/icono-tiempo.png")}
            style={estilos_publicacion_card.icono_tiempo}
            resizeMode="contain"
          />

          <Texto style={estilos_publicacion_card.texto_pequeno}>{tiempo_preparacion} {tipo_tiempo}</Texto>
        </View>
      </View>

      <View style={estilos_publicacion_card.contenedor_interacciones}>
        <View style={estilos_publicacion_card.caja_interacciones}>
          <View style={estilos_publicacion_card.interacciones}>

            {/* --- Boton de like (corazon) --- */}
            <TouchableOpacity onPressIn={() => Reaccionar(id_publicacion)}>
              {corazon === 1 ? 
              (
                <Image
                  source={require("../Img/icono-corazon-relleno.png")}
                  
                  style={estilos_publicacion_card.iconos}
                  resizeMode="contain"
                />
              ) :
              (
                <Image
                  source={require("../Img/icono-corazon.png")}
                  style={estilos_publicacion_card.iconos}
                  resizeMode="contain"
                />
              )}
            </TouchableOpacity>

            <Texto style={estilos_publicacion_card.texto_interacciones}>{total_reacciones_local}</Texto>
          </View>

          <View style={estilos_publicacion_card.interacciones}>
            <TouchableOpacity onPress={() => navigation.navigate('DetallePublicacion', {id_publicacion: id_publicacion})}>
              <Image
                source={require("../Img/icono-comentarios.png")}
                style={estilos_publicacion_card.iconos}
                resizeMode="contain"
              />
            </TouchableOpacity>

            <Texto style={estilos_publicacion_card.texto_interacciones}>{total_comentarios}</Texto>
          </View>
        </View>

        {/* --- Boton de guardar --- */}
        <TouchableOpacity onPressIn={() => Guardar(id_publicacion)}>
          {guardado === 1 ?
          (
            <Image
              source={require("../Img/icono-guardar-relleno.png")}
              style={estilos_publicacion_card.iconos}
              resizeMode="contain"
            />
          ) : 
          (
            <Image
              source={require("../Img/icono-guardar.png")}
              style={estilos_publicacion_card.iconos}
              resizeMode="contain"
            />
          )}
        </TouchableOpacity>
      </View>

      <Texto style={estilos_publicacion_card.fecha}>{Formatear_Fecha(fecha_creacion)}</Texto>
    </View>
  );
}