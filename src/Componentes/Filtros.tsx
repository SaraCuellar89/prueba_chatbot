/**
 * Control visual para cambiar el criterio de orden del contenido del foro.
 */

import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { estilos_filtros } from "./css/filtros_css";


export default function Filtros({ filtro, setFiltro }: any) {
  return (
    <View style={estilos_filtros.container}>
      
      {/* --- Boton para filtrar publicaciones por populares --- */}
      <TouchableOpacity
        style={[
          estilos_filtros.boton,
          filtro === "populares" && estilos_filtros.botonActivo,
        ]}
        onPress={() => setFiltro("populares")}
      >
        <Text
          style={[
            estilos_filtros.texto,
            filtro === "populares" && estilos_filtros.texto,
          ]}
        >
          Populares
        </Text>
      </TouchableOpacity>


      {/* --- Boton para filtrar publicaciones por antiguas --- */}
      <TouchableOpacity
        style={[
          estilos_filtros.boton,
          filtro === "antiguas" && estilos_filtros.botonActivo,
        ]}
        onPress={() => setFiltro("antiguas")}
      >
        <Text
          style={[
            estilos_filtros.texto,
            filtro === "antiguas" && estilos_filtros.texto,
          ]}
        >
          Antiguas
        </Text>
      </TouchableOpacity>


      {/* --- Boton para filtrar publicaciones por recientes --- */}
      <TouchableOpacity
        style={[
          estilos_filtros.boton,
          filtro === "recientes" && estilos_filtros.botonActivo,
        ]}
        onPress={() => setFiltro("recientes")}
      >
        <Text
          style={[
            estilos_filtros.texto,
            filtro === "recientes" && estilos_filtros.texto,
          ]}
        >
          Recientes
        </Text>
      </TouchableOpacity>

    </View>
  );
}

